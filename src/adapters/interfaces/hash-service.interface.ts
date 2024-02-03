export abstract class IHashService {
  abstract encrypt(data: string): Promise<string>;
  abstract validate(value: string, hashValue: string): Promise<boolean>;
}
