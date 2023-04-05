import * as argon from 'argon2';

export function hashPasswordAsync(value: string): Promise<string> {
  return argon.hash(value);
}
