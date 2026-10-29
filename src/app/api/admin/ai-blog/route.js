import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { currentAdmin } from "@/lib/auth";
import { sameOrigin } from "@/lib/security";
import { connectDB } from "@/lib/db";
import { Post, GenerationRun } from "@/models";
import { produceDraft, makeCoverImage } from "@/lib/ai-blog";

export const runtime = "nodejs";
export const maxDuration = 120;
function fail(error, status = 400) { return NextResponse.json({ error }, { status }); }

export async function GET() {
  if (!await currentAdmin()) return fail("Unauthorized", 401);
  await connectDB();
  const [posts, runs] = await Promise.all([
    Post.find({ deleted: { $ne: true } }).sort({ updatedAt: -1 }).limit(150).select("title slug coverImage published reviewStatus aiGenerated aiTopic aiGeneratedAt aiImageError reviewNotes createdAt updatedAt").lean(),
    GenerationRun.find().sort({ createdAt: -1 }).limit(15).lean(),
  ]);
  return NextResponse.json({ posts, runs });
}

export async function POST(req) {
  if (!sameOrigin(req)) return fail("Origin not allowed", 403);
  if (!await currentAdmin()) return fail("Unauthorized", 401);
  try {
    const body = await req.json();
    if (body.action === "generate") {
      const topic = String(body.topic || "").trim();
      if (topic.length < 12 || topic.length > 200) return fail("Please enter a legal topic between 12 and 200 characters.");
      const result = await produceDraft({ topic, createImage: body.createImage === true });
      return NextResponse.json(result, { status: 201 });
    }
    if (!mongoose.isValidObjectId(body.id)) return fail("Invalid article ID");
    await connectDB();
    const post = await Post.findOne({ _id: body.id, deleted: { $ne: true } });
    if (!post) return fail("Article not found", 404);
    if (body.action === "generate-image") {
      const url = await makeCoverImage({ title: post.title, summary: post.excerpt });
      post.coverImage = url; post.aiImageError = ""; await post.save();
      return NextResponse.json({ ok: true, url });
    }
    if (body.action === "save-image") {
      const url = String(body.url || "").trim();
      if (url && (!/^https:\/\//.test(url) || url.length > 1000)) return fail("Use a valid HTTPS image URL.");
      post.coverImage = url; await post.save();
      return NextResponse.json({ ok: true });
    }
    if (body.action === "request-review") {
      post.reviewStatus = "pending_review"; post.published = false;
    } else if (body.action === "approve") {
      if (!post.title || !post.content || post.content.length < 600) return fail("Complete the article before approval.");
      post.reviewStatus = "approved"; post.published = false;
    } else if (body.action === "publish") {
      if (post.reviewStatus !== "approved" && post.reviewStatus !== "published" && !(post.published && !post.reviewStatus))
        return fail("Review and approve the article before publishing.");
      if (!post.content || post.content.length < 600) return fail("Article content is too short.");
      post.published = true; post.reviewStatus = "published"; post.publishedAt = new Date();
    } else if (body.action === "draft") {
      post.reviewStatus = "draft"; post.published = false;
    } else return fail("Unknown action");
    if (typeof body.notes === "string") post.reviewNotes = body.notes.slice(0, 2500);
    await post.save();
    return NextResponse.json({ ok: true, status: post.reviewStatus });
  } catch (e) {
    console.error("Blog studio:", e.message);
    return fail(e.message || "Operation failed", 500);
  }
}
