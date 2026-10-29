import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/lib/auth";
import { sameOrigin } from "@/lib/security";
export const runtime = "nodejs";
const attempts = new Map();
export async function POST(req) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    const record = attempts.get(ip) || { count: 0, until: 0 };
    if (record.until > Date.now() && record.count >= 8)
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429 },
      );
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string")
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    const admin = await authenticate(email, password);
    if (!admin) {
      const count = record.until > Date.now() ? record.count + 1 : 1;
      attempts.set(ip, { count, until: Date.now() + 15 * 60_000 });
      return NextResponse.json(
        { error: "Incorrect email or password" },
        { status: 401 },
      );
    }
    attempts.delete(ip);
    await createSession(admin);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { error: "Login unavailable. Check configuration." },
      { status: 500 },
    );
  }
}
