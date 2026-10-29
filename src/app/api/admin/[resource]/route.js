import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { currentAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { modelsByResource, allowedFields } from "@/models";
import { slugify } from "@/lib/utils";
import { sameOrigin } from "@/lib/security";
export const runtime = "nodejs";
function response(error, status) {
  return NextResponse.json({ error }, { status });
}
async function getModel(params) {
  const { resource } = await params;
  return { resource, Model: modelsByResource[resource] };
}
function clean(resource, input) {
  const out = {};
  for (const name of allowedFields[resource] || []) {
    if (Object.prototype.hasOwnProperty.call(input, name)) {
      const v = input[name];
      out[name] =
        typeof v === "string"
          ? v
              .trim()
              .slice(
                0,
                name === "content"
                  ? 100000
                  : name === "description" ||
                      name === "summary" ||
                      name === "answer"
                    ? 10000
                    : 5000,
              )
          : v;
    }
  }
  if (
    ["services", "posts", "pages"].includes(resource) &&
    !out.slug &&
    out.title
  )
    out.slug = slugify(out.title);
  if (["services", "posts", "pages"].includes(resource) && out.slug)
    out.slug = slugify(out.slug);
  if (resource === "sections" && out.sectionKey)
    out.sectionKey = slugify(out.sectionKey);
  return out;
}
function dbError(e) {
  return e.code === 11000
    ? response("A record with this slug or unique field already exists.", 409)
    : response(e.message?.slice(0, 200) || "Request failed", 400);
}
export async function GET(req, { params }) {
  if (!(await currentAdmin())) return response("Unauthorized", 401);
  const { resource, Model } = await getModel(params);
  if (!Model) return response("Unknown collection", 404);
  try {
    await connectDB();
    const sort =
      resource === "inquiries"
        ? { createdAt: -1 }
        : { order: 1, createdAt: -1 };
    const entries = await Model.find({ deleted: { $ne: true } })
      .sort(sort)
      .limit(1000)
      .lean();
    return NextResponse.json({ items: JSON.parse(JSON.stringify(entries)) });
  } catch (e) {
    return dbError(e);
  }
}
export async function POST(req, { params }) {
  if (!sameOrigin(req)) return response("Origin not allowed", 403);
  if (!(await currentAdmin())) return response("Unauthorized", 401);
  const { resource, Model } = await getModel(params);
  if (!Model || resource === "inquiries")
    return response("Invalid collection", 404);
  try {
    const input = await req.json();
    const obj = clean(resource, input);
    if (resource === "posts") {
      // Editing a new post is a draft by default, not a silent publication.
      if (obj.published === true && obj.reviewStatus !== "approved") return response("Approve the article before publishing it.", 400);
      if (!obj.reviewStatus) obj.reviewStatus = "draft";
      if (obj.reviewStatus !== "published") obj.published = false;
    }
    await connectDB();
    const doc = await Model.create(obj);
    return NextResponse.json({ item: doc }, { status: 201 });
  } catch (e) {
    return dbError(e);
  }
}
export async function PUT(req, { params }) {
  if (!sameOrigin(req)) return response("Origin not allowed", 403);
  if (!(await currentAdmin())) return response("Unauthorized", 401);
  const { resource, Model } = await getModel(params);
  if (!Model) return response("Unknown collection", 404);
  try {
    const input = await req.json();
    if (!mongoose.isValidObjectId(input._id))
      return response("Invalid record identifier", 400);
    const update = clean(resource, input);
    if (!Object.keys(update).length) return response("No editable fields", 400);
    await connectDB();
    const previous = await Model.findById(input._id).lean();
    if (!previous) return response("Record not found", 404);
    const identity = {
      services: "slug",
      posts: "slug",
      pages: "slug",
      sections: "sectionKey",
      faqs: "question",
      slides: "title",
      videos: "title",
      team: "name",
      navigation: "href",
      testimonials: "quote",
    }[resource];
    if (
      identity &&
      previous[identity] !== update[identity] &&
      update[identity] !== undefined &&
      !previous.seedIdentity
    ) {
      update.seedIdentity =
        resource === "navigation"
          ? `${previous.parent || ""}|${previous.href || ""}|${previous.label || ""}`
          : String(previous[identity] || "");
    }
    if (resource === "posts") {
      const requestedPublish = update.published === true || update.reviewStatus === "published";
      const authorized = update.reviewStatus === "approved" || previous.reviewStatus === "approved" || previous.reviewStatus === "published" || previous.published;
      if (requestedPublish && !authorized) return response("Approve the article in AI Blog Studio before publishing.", 400);
      if (requestedPublish) { update.reviewStatus = "published"; update.published = true; }
      else if (update.reviewStatus && update.reviewStatus !== "published") update.published = false;
    }
    await connectDB();
    const item = await Model.findByIdAndUpdate(
      input._id,
      { $set: update },
      { new: true, runValidators: true },
    );
    if (!item) return response("Record not found", 404);
    return NextResponse.json({ item });
  } catch (e) {
    return dbError(e);
  }
}
export async function DELETE(req, { params }) {
  if (!sameOrigin(req)) return response("Origin not allowed", 403);
  if (!(await currentAdmin())) return response("Unauthorized", 401);
  const { resource, Model } = await getModel(params);
  if (!Model || resource === "inquiries")
    return response("Invalid collection", 404);
  const id = new URL(req.url).searchParams.get("id");
  if (!mongoose.isValidObjectId(id))
    return response("Invalid record identifier", 400);
  try {
    await connectDB();
    await Model.findByIdAndUpdate(id, { $set: { deleted: true } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return dbError(e);
  }
}
