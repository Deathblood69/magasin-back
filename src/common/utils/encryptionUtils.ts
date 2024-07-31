import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

export async function uncrypt(encryptedText: number[]) {
  const decipher = createDecipheriv(
    'aes-256-ctr',
    (await promisify(scrypt)(
      process.env.IMPORT_SECRET_KEY,
      'salt',
      32
    )) as Buffer,
    Buffer.from(process.env.IMPORT_SECRET_VI)
  );
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedText)),
    decipher.final()
  ]);
}

export async function encrypt(text: string, exportFilename: string) {
  const key = (await promisify(scrypt)(
    process.env.IMPORT_SECRET_KEY,
    'salt',
    32
  )) as Buffer;
  const cipher = createCipheriv(
    'aes-256-ctr',
    key,
    Buffer.from(process.env.IMPORT_SECRET_VI)
  );

  return Buffer.concat([cipher.update(Buffer.from(text)), cipher.final()]);
}
