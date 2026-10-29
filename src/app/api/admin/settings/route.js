import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Settings } from "@/models";
import { sameOrigin } from "@/lib/security";
import { THEME_MAP } from "@/lib/themes";
export const runtime = "nodejs";
export async function GET() {
  if (!(await currentAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  return NextResponse.json({
    item: await Settings.findOne({ key: "main" }).lean(),
  });
}
export async function PUT(req) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  if (!(await currentAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const changes = {};
    for (const [key, value] of Object.entries(body)) {
      if (
        key === "themeId" &&
        (typeof value !== "string" ||
          !Object.prototype.hasOwnProperty.call(THEME_MAP, value))
      )
        return NextResponse.json(
          { error: "Unknown theme preset" },
          { status: 400 },
        );
      if (
        key !== "key" &&
        !["_id", "createdAt", "updatedAt", "__v"].includes(key) &&
        Settings.schema.path(key) &&
        typeof value === "string"
      )
        changes[key] = value
          .trim()
          .slice(
            0,
            key === "aboutContent" || key === "disclaimerText" ? 20000 : 5000,
          );
    }
    await connectDB();
    const item = await Settings.findOneAndUpdate(
      { key: "main" },
      { $set: changes },
      { new: true, upsert: true, runValidators: true },
    );
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
