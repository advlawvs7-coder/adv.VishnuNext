import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = await scrypt(String(password), salt, 64);
  return { passwordHash: Buffer.from(derived).toString("hex"), passwordSalt: salt };
}

export async function verifyPassword(password, passwordHash, passwordSalt) {
  const derived = Buffer.from(await scrypt(String(password), passwordSalt, 64));
  const stored = Buffer.from(passwordHash, "hex");
  return stored.length === derived.length && crypto.timingSafeEqual(stored, derived);
}
