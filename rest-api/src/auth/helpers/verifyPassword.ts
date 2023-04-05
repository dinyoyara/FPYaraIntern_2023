import * as argon from 'argon2';

export function verifyPasswordAsync(
  value: string,
  hash: string,
): Promise<boolean> {
  return argon.verify(hash, value);
}
