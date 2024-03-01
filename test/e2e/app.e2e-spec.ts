import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { Role, UserEntity } from '@/domain/entities';
import { UserRepository } from '@/domain/repositories';
import { FindOneUserToAuthUseCase } from '@/application/usecases';
import { HashBcryptoService } from '@/application/services';
import { IHashService } from '@/adapters/interfaces';
import { UsersInMemoryRepository } from '@/infra/db/in-memory/users';

const userLogin = UserEntity.create({
  email: 'john@example.com',
  name: 'John',
  password: 'changeme',
  roles: [Role.ADMIN, Role.USER],
  id: crypto.randomUUID(),
});

describe('Application (e2e)', () => {
  let app: INestApplication;
  let findUserUseCase: FindOneUserToAuthUseCase;
  let hashService: HashBcryptoService;

  const email = userLogin.email;
  const password = userLogin.password;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useClass(UsersInMemoryRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    findUserUseCase = moduleFixture.get<FindOneUserToAuthUseCase>(
      FindOneUserToAuthUseCase,
    );
    hashService = moduleFixture.get<IHashService>(IHashService);
  });

  afterEach(async () => {
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
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'foo@bar.com',
        password: 'password',
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
    const passwordHash = await hashService.encrypt(password);
    findUserUseCase.execute = jest.fn().mockResolvedValueOnce({
      ...userLogin,
      password: passwordHash,
    });

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
    const passwordHash = await hashService.encrypt(password);
    findUserUseCase.execute = jest.fn().mockResolvedValueOnce({
      ...userLogin,
      password: passwordHash,
    });

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
    const expectedObject = { email, sub: userLogin.id };

    expect(profileResponse.body).toMatchObject(expectedObject);
    expect(profileResponse.body).toHaveProperty('iat');
    expect(profileResponse.body).toHaveProperty('exp');
    expect(profileResponse.body).toHaveProperty('sub');
  });

  it('should be successful get all users', async () => {
    const passwordHash = await hashService.encrypt(password);
    findUserUseCase.execute = jest.fn().mockResolvedValueOnce({
      ...userLogin,
      password: passwordHash,
    });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(HttpStatus.OK);

    const { access_token } = loginResponse.body;

    const { body: users } = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(users).toHaveLength(2);
  });

  it('should be successful create a new user', async () => {
    const passwordHash = await hashService.encrypt(password);
    findUserUseCase.execute = jest.fn().mockResolvedValueOnce({
      ...userLogin,
      password: passwordHash,
    });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(HttpStatus.OK);

    const { access_token } = loginResponse.body;
    const newUser = {
      name: 'Paul River',
      email: 'paul.river@example.com',
      password: crypto.getRandomValues(new Uint8Array(10)).join(''),
    };

    const { body: usersBefore } = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
    const { body: newUserResponse } = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${access_token}`)
      .send(newUser)
      .expect(201);

    const { body: usersAfter } = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(usersBefore).toHaveLength(2);
    expect(usersAfter).toHaveLength(3);
    expect(usersAfter.filter((u) => u.id === newUserResponse.id)).toBeDefined();
  });
});
