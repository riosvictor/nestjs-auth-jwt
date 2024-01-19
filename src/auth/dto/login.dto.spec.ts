import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './login.dto';

describe('LoginDto', () => {
  it('should pass validation when email is valid and password is non-empty', () => {
    const loginDto = new LoginDto();
    loginDto.email = 'test@example.com';
    loginDto.password = 'password123';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(0);
  });

  // Invalid email should fail validation with appropriate error message
  it('should fail validation with appropriate error message when email is invalid', () => {
    const loginDto = new LoginDto();
    loginDto.email = 'invalidemail';
    loginDto.password = 'password123';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });

  // Empty password should fail validation with appropriate error message
  it('should fail validation with appropriate error message when password is empty', () => {
    const loginDto = new LoginDto();
    loginDto.email = 'test@example.com';
    loginDto.password = '';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty(
      'isNotEmpty',
      'password should not be empty',
    );
  });

  // Email with invalid format should fail validation with appropriate error message
  it('should fail validation with appropriate error message when email format is invalid', () => {
    const loginDto = new LoginDto();
    loginDto.email = 'testexample.com';
    loginDto.password = 'password123';

    const errors = validateSync(loginDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });

  // Password with only whitespace characters should fail validation with appropriate error message
  it('should fail validation with appropriate error message when password contains only whitespace characters', () => {
    const transformedLoginDto = plainToInstance(LoginDto, {
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

  // Email with length greater than maximum allowed should fail validation with appropriate error message
  it('should fail validation with appropriate error message when email length is greater than maximum allowed', () => {
    const loginDto = new LoginDto();
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
