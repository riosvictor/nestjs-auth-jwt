import { HashBcryptoService } from '@/application/services';

describe('encrypt function', () => {
  const service = new HashBcryptoService();
  const testPassword = 'password123';
  const testHash =
    '$2b$10$zSSZSggUrX2KCtpwNGvXk.auKbPx7Q04GYqAAuYMpAA9b.xgFZLUK';

  it('should encrypt password successfully', async () => {
    const result = await service.encrypt(testPassword);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should return true for valid password', async () => {
    const result = await service.validate(testPassword, testHash);

    expect(result).toBe(true);
  });

  it('should return false for invalid password', async () => {
    const result = await service.validate(testPassword, 'invalidHash');

    expect(result).toBe(false);
  });

  it('should handle validation error', async () => {
    await expect(service.validate(undefined, undefined)).rejects.toThrow(Error);
  });
});
