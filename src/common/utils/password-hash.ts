import { compare, genSalt, hash } from 'bcrypt';

export async function encrypt(password: string): Promise<string> {
  const salt = await genSalt(10);
  return hash(password, salt);
}

export async function validate(
  password: string,
  hash: string,
): Promise<boolean> {
  return compare(password, hash);
}
