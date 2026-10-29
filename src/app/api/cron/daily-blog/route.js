import { NextResponse } from "next/server";
import { chooseDailyTopic, produceDraft, utcDay } from "@/lib/ai-blog";
export const runtime = "nodejs";
export const maxDuration = 120;

/** Vercel cron at 04:30 UTC (10:00 IST). NEVER publishes. */
export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < 16 || request.headers.get("authorization") !== `Bearer ${secret}`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.AUTO_BLOG_ENABLED !== "true")
    return NextResponse.json({ skipped: true, reason: "AUTO_BLOG_ENABLED is off" });
  try {
    const topic = await chooseDailyTopic();
    const result = await produceDraft({
      topic,
      dateKey: utcDay(),
      trigger: "daily-cron",
      createImage: process.env.AUTO_BLOG_IMAGE === "true",
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error("Daily AI blog failed:", e);
    return NextResponse.json({ error: "Draft generation failed; inspect protected server logs." }, { status: 500 });
  }
}
