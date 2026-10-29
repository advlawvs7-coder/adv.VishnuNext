import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models";
import bcrypt from "bcryptjs";

const cookieName = "avs_admin_session";
function signingKey() {
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32)
    throw new Error("AUTH_SECRET must contain at least 32 characters");
  return new TextEncoder().encode(process.env.AUTH_SECRET);
}
export async function createSession(admin) {
  const token = await new SignJWT({
    role: "admin",
    sv: Number(admin.sessionVersion || 0),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(admin._id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(signingKey());
  const jar = await cookies();
  jar.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}
export async function deleteSession() {
  (await cookies()).delete(cookieName);
}
export async function currentAdmin() {
  try {
    const token = (await cookies()).get(cookieName)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, signingKey());
    if (payload.role !== "admin" || !payload.sub) return null;
    await connectDB();
    const admin = await Admin.findById(payload.sub).lean();
    if (
      !admin ||
      !admin.active ||
      Number(payload.sv ?? -1) !== Number(admin.sessionVersion || 0)
    )
      return null;
    return { id: String(admin._id), email: admin.email, name: admin.name };
  } catch {
    return null;
  }
}
export async function authenticate(email, password) {
  await connectDB();
  const admin = await Admin.findOne({
    email: String(email).trim().toLowerCase(),
    active: true,
  });
  if (!admin || !(await bcrypt.compare(String(password), admin.passwordHash)))
    return null;
  return admin;
}
