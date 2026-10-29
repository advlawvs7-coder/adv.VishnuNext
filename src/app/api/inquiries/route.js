import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models";
import { sameOrigin } from "@/lib/security";
export const runtime = "nodejs";
const hits = new Map();
function str(v, max = 100) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
export async function POST(req) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    const r = hits.get(ip) || { start: Date.now(), n: 0 };
    if (Date.now() - r.start > 60 * 60_000) {
      r.start = Date.now();
      r.n = 0;
    }
    if (++r.n > 8)
      return NextResponse.json(
        { error: "Too many enquiries. Please try again later." },
        { status: 429 },
      );
    hits.set(ip, r);
    const body = await req.json();
    if (body.website) return NextResponse.json({ ok: true });
    const doc = {
      name: str(body.name),
      phone: str(body.phone, 30),
      email: str(body.email, 160),
      service: str(body.service, 120),
      subject: str(body.subject, 200),
      message: str(body.message, 3000),
      source: str(body.source, 80) || "Website",
    };
    if (
      doc.name.length < 2 ||
      !/^\S+@\S+\.\S+$/.test(doc.email) ||
      doc.message.length < 10 ||
      doc.phone.length < 7
    )
      return NextResponse.json(
        {
          error:
            "Please enter your name, valid email, phone and at least 10 message characters.",
        },
        { status: 400 },
      );
    if (!process.env.MONGODB_URI)
      return NextResponse.json(
        {
          error:
            "Demo mode: enquiry storage is disabled until MongoDB is connected. Please contact the office by phone or email.",
        },
        { status: 503 },
      );
    await connectDB();
    await Inquiry.create(doc);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Enquiry error:", error);
    return NextResponse.json(
      {
        error:
          "Enquiry could not be saved. Please contact the office directly.",
      },
      { status: 500 },
    );
  }
}
