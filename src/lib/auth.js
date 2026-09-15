import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "advocate_admin_session";

function signature(secret) {
  return crypto
    .createHmac("sha256", secret)
    .update("advocate-vishnu-admin")
    .digest("hex");
}

export async function isAdmin() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return false;
  const expected = signature(secret);
  if (value.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function createAdminSession() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  (await cookies()).set(SESSION_COOKIE, signature(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroyAdminSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
