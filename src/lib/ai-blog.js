import "server-only";
import { connectDB } from "@/lib/db";
import { Post, GenerationRun } from "@/models";
import { generateGemini } from "@/lib/gemini";
import { slugify } from "@/lib/utils";
import { createHash } from "node:crypto";

const evergreen = [
  "Documents to prepare before seeking a mutual consent divorce in Delhi",
  "What an NRI should check before granting a property power of attorney in India",
  "Common steps in a commercial invoice recovery dispute in India",
  "Understanding bail procedure under the Bharatiya Nagarik Suraksha Sanhita",
  "How to prepare questions for a child custody consultation",
  "Practical checklist for inherited property verification in Delhi",
  "Steps after receiving a legal notice in a contractual dispute",
  "Documents commonly needed in a cheque dishonour consultation",
  "How mediation works in matrimonial disputes in India",
  "Consumer complaint documentation for disputed services",
  "What to discuss with counsel after an online financial fraud",
  "Landlord tenant disputes: organising agreements and payment records",
  "Basic considerations for drafting a will in India",
  "Preparing for a civil injunction consultation",
  "Protecting records in a domestic violence related matter",
  "Important considerations for foreign divorce decree recognition in India",
  "Company-to-company outstanding payment recovery: evidence checklist",
  "Understanding arbitration clauses before a commercial dispute",
  "Questions NRIs should ask about succession certificates",
  "Property partition disputes: what ownership documents to collect",
  "What to do when a court notice is received",
  "Legal considerations in guardianship matters involving minors",
  "A practical guide to maintaining evidence in cyber crime cases",
  "How to prepare a timeline for a matrimonial legal consultation",
];

function safe(str, max = 10000) { return String(str || "").trim().slice(0, max); }
export function utcDay() { return new Date().toISOString().slice(0, 10); }
export async function chooseDailyTopic() {
  await connectDB();
  const last = await Post.find({ aiGenerated: true }).sort({ createdAt: -1 }).limit(60).select("aiTopic title").lean();
  const used = new Set(last.map(x => (x.aiTopic || x.title || "").toLowerCase()));
  const start = Math.floor(Date.now() / 86400000) % evergreen.length;
  for (let i = 0; i < evergreen.length; i++) {
    const value = evergreen[(start + i) % evergreen.length];
    if (!used.has(value.toLowerCase())) return value;
  }
  return `${evergreen[start]} — updated editorial checklist ${utcDay()}`;
}

async function freshSlug(title) {
  const base = slugify(title).slice(0, 95) || "legal-article";
  // Random suffix avoids races between manual and scheduled generation; unique index remains final guard.
  const suffix = createHash("sha256").update(`${title}-${Date.now()}-${Math.random()}`).digest("hex").slice(0, 9);
  return `${base}-${suffix}`;
}

const systemRules = `You are a careful English-language legal educational writer for an Indian advocate website. Output ONE JSON object ONLY, keys: title, category, excerpt, content, seoTitle, seoDescription, imageAlt. Write original, practical, human-sounding 800-1200-word Markdown content with useful H2s, steps, limitations, and 4 short FAQs. Do NOT copy other sites. Do NOT invent court judgments, quotations, case numbers, current amendments, law firm successes, rankings, specializations, client results or guarantees. If a legal section number or time limit is uncertain, say verification with current primary law is required rather than inventing it. Do not claim today's legal status without verification. No personal legal advice. Include a section 'Editorial fact-check checklist' for admin to verify statutes, jurisdiction, procedure and current developments. Avoid political advocacy and unverifiable claims. Finish with an educational disclaimer. The title must be specific, readable, and not misleading.`;

export async function produceDraft({ topic, createImage = false, trigger = "admin", dateKey = null }) {
  await connectDB();
  const subject = safe(topic, 200);
  if (subject.length < 12) throw new Error("Enter a legal blog topic with at least 12 characters.");
  if (!process.env.GEMINI_API_KEY) throw new Error("Configure GEMINI_API_KEY before generating AI articles.");
  let run;
  if (dateKey) {
    try { run = await GenerationRun.create({ dateKey, status: "running" }); }
    catch (e) {
      if (e.code === 11000) return { skipped: true, reason: "A draft run already exists for this date." };
      throw e;
    }
  }
  try {
    const result = await generateGemini(`${systemRules}\n\nArticle topic: ${subject}`);
    if (!result || typeof result !== "object" || Array.isArray(result)) throw new Error("Unexpected AI response.");
    const title = safe(result.title, 180) || subject;
    const content = safe(result.content, 85000);
    if (content.length < 1400 || content.split(/\s+/).length < 300) throw new Error("Generated article was too short; please regenerate.");
    const post = await Post.create({
      title, slug: await freshSlug(title), category: safe(result.category, 90) || "Legal Education",
      excerpt: safe(result.excerpt, 380), content,
      seoTitle: safe(result.seoTitle, 75) || title, seoDescription: safe(result.seoDescription, 165),
      imageAlt: safe(result.imageAlt, 200), aiTopic: subject,
      aiGenerated: true, aiGeneratedAt: new Date(),
      aiModel: process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash",
      published: false, featured: false, reviewStatus: "pending_review",
      author: "Editorial team (AI-assisted draft)",
    });
    if (run) await GenerationRun.findByIdAndUpdate(run._id, { status: "complete", postId: post._id });
    let imageError = "";
    if (createImage) {
      try {
        const image = await makeCoverImage({ title, summary: post.excerpt });
        await Post.updateOne({ _id: post._id }, { $set: { coverImage: image } });
      } catch (e) {
        imageError = safe(e.message, 260);
        await Post.updateOne({ _id: post._id }, { $set: { aiImageError: imageError } });
      }
    }
    return { postId: String(post._id), title, imageError, reviewStatus: "pending_review", trigger };
  } catch (e) {
    if (run) await GenerationRun.findByIdAndUpdate(run._id, { status: "failed", error: safe(e.message, 260) });
    throw e;
  }
}

export async function makeCoverImage({ title, summary }) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) throw new Error("Optional image skipped: configure Cloudinary credentials first.");
  const result = await generateGemini(`Create a professional editorial cover illustration (16:9) for an Indian law firm's educational article titled: ${safe(title, 150)}. Context: ${safe(summary, 240)}. Elegant premium realistic office/document/legal architectural visual, balanced natural tones, no logos, no text, no watermarks added by prompt, no known people, no identifiable client, no false official seals.`, { image: true });
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(result.mimeType)) throw new Error('Unsupported image type');
  const bytes = Buffer.from(result.base64, "base64");
  if (bytes.byteLength > 7 * 1024 * 1024) throw new Error("Generated image exceeds 7 MB");
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "advocate-vishnu-sharma/ai-blog";
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");
  const form = new FormData();
  form.append("file", new Blob([bytes], { type: result.mimeType }), "ai-blog-cover.png");
  form.append("folder", folder); form.append("timestamp", String(timestamp));
  form.append("api_key", key); form.append("signature", signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/image/upload`, { method: "POST", body: form });
  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.secure_url) throw new Error(json.error?.message || "Cover upload failed");
  return json.secure_url;
}
