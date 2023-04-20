import * as argon from 'argon2';

export const verifyPasswordAsync = (
  value: string,
  hash: string,
): Promise<boolean> => argon.verify(hash, value);

export const hashPasswordAsync = (value: string): Promise<string> =>
  argon.hash(value);
