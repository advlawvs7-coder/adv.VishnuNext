import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { currentAdmin, createSession } from "@/lib/auth";
import { sameOrigin } from "@/lib/security";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models";
export const runtime = "nodejs";
export async function POST(req) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  const current = await currentAdmin();
  if (!current)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { oldPassword, newPassword } = await req.json();
    if (
      typeof newPassword !== "string" ||
      newPassword.length < 12 ||
      newPassword.length > 200
    )
      return NextResponse.json(
        { error: "New password must be 12–200 characters." },
        { status: 400 },
      );
    await connectDB();
    const user = await Admin.findById(current.id);
    if (
      !user ||
      !(await bcrypt.compare(String(oldPassword), user.passwordHash))
    )
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 },
      );
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    user.sessionVersion = Number(user.sessionVersion || 0) + 1;
    await user.save();
    await createSession(user);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Could not update password." },
      { status: 500 },
    );
  }
}
