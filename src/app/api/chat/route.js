import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/security";
import { validateQuestion, limitChat, answerLegalQuestion } from "@/lib/legal-chat";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  try {
    if (Number(req.headers.get("content-length") || 0) > 3500) return NextResponse.json({ error: "Question is too long." }, { status: 413 });
    const body = await req.json();
    const issue = validateQuestion(body.question);
    if (issue) return NextResponse.json({ error: issue }, { status: 400 });
    if (!await limitChat(req)) return NextResponse.json({ error: "Chat limit reached. Please try again later or use the contact form." }, { status: 429 });
    const result = await answerLegalQuestion(body.question);
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("Legal chat failed:", e.message);
    return NextResponse.json({ error: "The assistant is temporarily unavailable. Please use our contact page." }, { status: 503 });
  }
}
