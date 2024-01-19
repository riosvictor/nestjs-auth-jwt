import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/models/users.model';
import { encrypt } from '../src/common/utils/password-hash';

describe('Application (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;

  const email = 'john@example.com';
  const password = 'changeme';
  const user: User = {
    email,
    name: 'John',
    password,
    id: crypto.randomUUID(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should throw an error when trying to login with invalid body', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({})
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body).toEqual({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['email must be an email', 'password should not be empty'],
      error: 'Bad Request',
    });
  });

  it('should throw an error when trying to login with invalid credentials', async () => {
    usersService.findOne = jest.fn().mockResolvedValueOnce(null);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toEqual({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    });
  });

  it('should throw an error when trying to get profile without token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toEqual({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    });
  });

  it('should be successful login with correct credentials', async () => {
    usersService.findOne = jest.fn().mockResolvedValueOnce(user);
    user.password = await encrypt(password);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(HttpStatus.OK);

    const { access_token } = response.body;

    expect(access_token).toBeDefined();
  });

  it('should be successful get profile with a valid token', async () => {
    usersService.findOne = jest.fn().mockResolvedValueOnce(user);
    user.password = await encrypt(password);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(HttpStatus.OK);

    const { access_token } = loginResponse.body;

    const profileResponse = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
    const expectedObject = { email, sub: user.id };

    expect(profileResponse.body).toMatchObject(expectedObject);
    expect(profileResponse.body).toHaveProperty('iat');
    expect(profileResponse.body).toHaveProperty('exp');
    expect(profileResponse.body).toHaveProperty('sub');
  });
});
