import { compare, genSalt, hash } from 'bcrypt';
import { encrypt, validate } from './password-hash';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('encrypt function', () => {
  const mockPassword = 'password123';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should encrypt password successfully', async () => {
    const mockSalt = 'mockedSalt';
    const mockHashedPassword = 'mockedHashedPassword';

    (genSalt as jest.Mock).mockResolvedValue(mockSalt);
    (hash as jest.Mock).mockResolvedValue(mockHashedPassword);

    const result = await encrypt(mockPassword);

    expect(genSalt).toHaveBeenCalledWith(10);
    expect(hash).toHaveBeenCalledWith(mockPassword, mockSalt);
    expect(result).toBe(mockHashedPassword);
  });

  test('should handle encryption error', async () => {
    const mockError = new Error('Mocked error');
    (genSalt as jest.Mock).mockRejectedValue(mockError);

    await expect(encrypt(mockPassword)).rejects.toThrow(mockError);

    expect(genSalt).toHaveBeenCalledWith(10);
    expect(hash).not.toHaveBeenCalled();
  });
});

describe('validate function', () => {
  const mockPassword = 'password123';
  const mockHash = 'mockedHash';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should return true for valid password', async () => {
    (compare as jest.Mock).mockResolvedValue(true);

    const result = await validate(mockPassword, mockHash);

    expect(compare).toHaveBeenCalledWith(mockPassword, mockHash);
    expect(result).toBe(true);
  });

  test('should return false for invalid password', async () => {
    (compare as jest.Mock).mockResolvedValue(false);

    const result = await validate(mockPassword, mockHash);

    expect(compare).toHaveBeenCalledWith(mockPassword, mockHash);
    expect(result).toBe(false);
  });

  test('should handle validation error', async () => {
    const mockError = new Error('Mocked error');
    (compare as jest.Mock).mockRejectedValue(mockError);

    await expect(validate(mockPassword, mockHash)).rejects.toThrow(mockError);

    expect(compare).toHaveBeenCalledWith(mockPassword, mockHash);
  });

  // Add more tests as needed
});
