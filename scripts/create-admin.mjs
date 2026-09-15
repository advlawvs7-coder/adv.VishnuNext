import crypto from "node:crypto";
import { promisify } from "node:util";
import { readFile } from "node:fs/promises";
import mongoose from "mongoose";

const scrypt = promisify(crypto.scrypt);
const credentialsPath = new URL("../admin-credentials.json", import.meta.url);

async function hashPassword(password) {
  const passwordSalt = crypto.randomBytes(16).toString("hex");
  const derived = await scrypt(String(password), passwordSalt, 64);
  return {
    passwordHash: Buffer.from(derived).toString("hex"),
    passwordSalt,
  };
}

async function main() {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) throw new Error("MONGODB_URI is missing in .env.local");

  const credentials = JSON.parse(await readFile(credentialsPath, "utf8"));
  const email = String(credentials.email || "")
    .trim()
    .toLowerCase();
  const password = String(credentials.password || "");

  if (!email || !email.includes("@"))
    throw new Error("Enter a valid email in admin-credentials.json");
  if (password.length < 12 || password.includes("CHANGE_THIS")) {
    throw new Error(
      "Use a unique password of at least 12 characters in admin-credentials.json",
    );
  }

  const { passwordHash, passwordSalt } = await hashPassword(password);
  await mongoose.connect(mongodbUri, { bufferCommands: false });

  const admins = mongoose.connection.collection("admins");
  const now = new Date();
  await admins.updateOne(
    { email },
    {
      $set: {
        name: String(credentials.name || "Administrator").trim(),
        email,
        passwordHash,
        passwordSalt,
        role: credentials.role === "admin" ? "admin" : "super-admin",
        active: credentials.active !== false,
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now, lastLoginAt: null },
    },
    { upsert: true },
  );

  console.log(`Admin created/updated successfully: ${email}`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(`Admin creation failed: ${error.message}`);
  await mongoose.disconnect().catch(() => {});
  process.exitCode = 1;
});
