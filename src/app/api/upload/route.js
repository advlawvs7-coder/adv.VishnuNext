import crypto from "node:crypto";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    if (!(await isAdmin())) return Response.json({ message: "Your admin session expired. Please login again." }, { status: 401 });

    const cloud = process.env.CLOUDINARY_CLOUD_NAME?.trim();
    const preset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim();
    const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
    if (!cloud || (!preset && (!apiKey || !apiSecret))) {
      return Response.json({ message: "Image upload is not configured. Add Cloudinary settings in Vercel Environment Variables." }, { status: 503 });
    }

    const incoming = await request.formData();
    const file = incoming.get("file");
    if (!file || typeof file === "string") return Response.json({ message: "Select an image." }, { status: 400 });
    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
    if (!allowedTypes.has(file.type) || file.size > 5 * 1024 * 1024) return Response.json({ message: "Use a JPG, PNG or WebP image under 5 MB." }, { status: 400 });

    const body = new FormData();
    body.set("file", file);
    body.set("folder", "advocate-vishnu/blogs");
    if (preset) {
      body.set("upload_preset", preset);
    } else {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = crypto.createHash("sha1").update(`folder=advocate-vishnu/blogs&timestamp=${timestamp}${apiSecret}`).digest("hex");
      body.set("api_key", apiKey);
      body.set("timestamp", timestamp);
      body.set("signature", signature);
    }

    const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/image/upload`, { method: "POST", body });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.secure_url) return Response.json({ message: data.error?.message || "Cloudinary image upload failed." }, { status: 400 });
    return Response.json({ success: true, url: data.secure_url, publicId: data.public_id });
  } catch (error) {
    console.error("IMAGE UPLOAD ERROR:", error);
    return Response.json({ message: "Image could not be uploaded. Please try again." }, { status: 500 });
  }
}
