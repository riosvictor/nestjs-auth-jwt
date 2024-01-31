import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RequestLoginDto } from '@/common/dtos';

describe('LoginDto', () => {
  it('should pass validation when email is valid and password is non-empty', () => {
    const loginDto = new RequestLoginDto();
    loginDto.email = 'test@example.com';
    loginDto.password = 'password123';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with appropriate error message when email is invalid', () => {
    const loginDto = new RequestLoginDto();
    loginDto.email = 'invalidemail';
    loginDto.password = 'password123';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });

  it('should fail validation with appropriate error message when password is empty', () => {
    const loginDto = new RequestLoginDto();
    loginDto.email = 'test@example.com';
    loginDto.password = '';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty(
      'isNotEmpty',
      'password should not be empty',
    );
  });

  it('should fail validation with appropriate error message when email format is invalid', () => {
    const loginDto = new RequestLoginDto();
    loginDto.email = 'testexample.com';
    loginDto.password = 'password123';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });

  it('should fail validation with appropriate error message when password contains only whitespace characters', () => {
    const transformedLoginDto = plainToInstance(RequestLoginDto, {
      email: 'test@example.com',
      password: '     ',
    });
    const errors = validateSync(transformedLoginDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty(
      'isNotEmpty',
      'password should not be empty',
    );
  });

  it('should fail validation with appropriate error message when email length is greater than maximum allowed', () => {
    const loginDto = new RequestLoginDto();
    loginDto.email = 'test@example.com'.repeat(10);
    loginDto.password = 'password123';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });
});
