import { NextResponse } from "next/server";

async function expectedSignature(secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const bytes = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode("advocate-vishnu-admin"),
  );
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith("/admin") || pathname === "/admin/login")
    return NextResponse.next();
  const secret = process.env.ADMIN_SESSION_SECRET;
  const session = request.cookies.get("advocate_admin_session")?.value;
  if (secret && session === (await expectedSignature(secret)))
    return NextResponse.next();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = { matcher: ["/admin/:path*"] };
