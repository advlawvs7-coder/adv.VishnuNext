import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { currentAdmin } from "@/lib/auth";
import { sameOrigin } from "@/lib/security";
export const runtime = "nodejs";
export async function POST(req) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  if (!(await currentAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const cloud = process.env.CLOUDINARY_CLOUD_NAME,
    key = process.env.CLOUDINARY_API_KEY,
    secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret)
    return NextResponse.json(
      {
        error:
          "Cloudinary not configured. Add a hosted image URL manually or configure the environment variables.",
      },
      { status: 400 },
    );
  try {
    const form = await req.formData(),
      file = form.get("file");
    if (
      !file ||
      typeof file === "string" ||
      file.size > 5 * 1024 * 1024 ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    )
      return NextResponse.json(
        { error: "Choose a JPG, PNG or WebP under 5 MB." },
        { status: 400 },
      );
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "advocate-vishnu-sharma";
    const signature = createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}${secret}`)
      .digest("hex");
    const upload = new FormData();
    upload.append("file", file);
    upload.append("timestamp", String(timestamp));
    upload.append("folder", folder);
    upload.append("api_key", key);
    upload.append("signature", signature);
    const remote = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/image/upload`,
      { method: "POST", body: upload },
    );
    const result = await remote.json();
    if (!remote.ok) throw new Error(result.error?.message || "Upload failed");
    return NextResponse.json({ url: result.secure_url });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
