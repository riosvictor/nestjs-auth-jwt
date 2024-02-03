import { IHashService } from '@/adapters/interfaces/hash-service.interface';
import { compare, genSalt, hash } from 'bcrypt';

export class HashBcryptoService implements IHashService {
  async encrypt(data: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(data, salt);
  }
  async validate(value: string, hashValue: string): Promise<boolean> {
    return compare(value, hashValue);
  }
}
