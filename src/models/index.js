import mongoose from "mongoose";
const { Schema } = mongoose;
const text = { type: String, default: "" };
const flag = { type: Boolean, default: true };
const number = { type: Number, default: 0 };
const meta = { seoTitle: text, seoDescription: text };
const standard = { timestamps: true, strict: true };

function build(name, fields) {
  return (
    mongoose.models[name] ||
    mongoose.model(
      name,
      new Schema(
        {
          ...fields,
          seedIdentity: { type: String, default: "" },
          deleted: { type: Boolean, default: false },
        },
        standard,
      ),
    )
  );
}
export const Admin = build("Admin", {
  name: { type: String, default: "Administrator" },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String, required: true },
  sessionVersion: { type: Number, default: 0 },
  active: flag,
});
export const Settings = build("Settings", {
  key: { type: String, default: "main", unique: true },
  brandName: text,
  subBrand: text,
  tagline: text,
  siteTitle: text,
  siteDescription: text,
  siteUrl: text,
  themeId: { type: String, default: "sky-blue" },
  phone: text,
  whatsapp: text,
  email: text,
  address: text,
  officeHours: text,
  locationText: text,
  headerCtaText: text,
  headerCtaHref: text,
  footerBlurb: text,
  instagram: text,
  facebook: text,
  linkedin: text,
  youtube: text,
  aboutEyebrow: text,
  aboutTitle: text,
  aboutContent: text,
  aboutImage: text,
  experienceLabel: text,
  consultationTitle: text,
  consultationText: text,
  googleMapsUrl: text,
  disclaimerText: text,
  ...meta,
});
export const Service = build("Service", {
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, default: "Other Legal Services" },
  summary: text,
  content: text,
  icon: { type: String, default: "scale" },
  image: text,
  order: number,
  featured: { type: Boolean, default: false },
  published: flag,
  ...meta,
});
export const Post = build("Post", {
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: text,
  excerpt: text,
  content: text,
  coverImage: text,
  author: { type: String, default: "Dr. Advocate Vishnu Sharma" },
  publishedAt: { type: Date, default: Date.now },
  reviewStatus: { type: String, enum: ["draft", "pending_review", "approved", "published"], default: "draft" },
  aiGenerated: { type: Boolean, default: false },
  aiModel: text,
  aiTopic: text,
  aiGeneratedAt: { type: Date },
  aiImageError: text,
  reviewNotes: text,
  imageAlt: text,
  featured: { type: Boolean, default: false },
  published: flag,
  ...meta,
});
export const GenerationRun = build("GenerationRun", {
  dateKey: { type: String, required: true, unique: true },
  status: { type: String, enum: ["running", "complete", "failed"], default: "running" },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  error: text,
});
export const ChatRate = build("ChatRate", {
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, expires: 0 },
});
export const Team = build("Team", {
  name: { type: String, required: true },
  designation: text,
  description: text,
  image: text,
  order: number,
  published: flag,
});
export const FAQ = build("FAQ", {
  question: { type: String, required: true },
  answer: text,
  category: text,
  order: number,
  published: flag,
});
export const Video = build("Video", {
  title: { type: String, required: true },
  slug: text,
  description: text,
  content: text,
  youtubeUrl: text,
  thumbnail: text,
  sourcePublisher: text,
  relatedHref: text,
  order: number,
  published: flag,
});
export const Slide = build("Slide", {
  eyebrow: text,
  title: { type: String, required: true },
  subtitle: text,
  image: text,
  ctaText: text,
  ctaHref: text,
  order: number,
  enabled: flag,
});
export const Section = build("Section", {
  sectionKey: { type: String, required: true, unique: true },
  eyebrow: text,
  title: text,
  description: text,
  image: text,
  ctaText: text,
  ctaHref: text,
  bullets: text,
  order: number,
  enabled: flag,
});
export const Navigation = build("Navigation", {
  label: { type: String, required: true },
  href: text,
  parent: text,
  group: text,
  order: number,
  enabled: flag,
});
export const Page = build("Page", {
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: text,
  content: text,
  heroImage: text,
  published: flag,
  ...meta,
});
export const Testimonial = build("Testimonial", {
  quote: { type: String, required: true },
  author: text,
  role: text,
  order: number,
  published: { type: Boolean, default: false },
});
export const Inquiry = build("Inquiry", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: text,
  service: text,
  subject: text,
  message: { type: String, required: true },
  source: { type: String, default: "Website" },
  status: {
    type: String,
    enum: ["new", "contacted", "closed"],
    default: "new",
  },
});
export const modelsByResource = {
  services: Service,
  posts: Post,
  team: Team,
  faqs: FAQ,
  videos: Video,
  slides: Slide,
  sections: Section,
  navigation: Navigation,
  pages: Page,
  testimonials: Testimonial,
  inquiries: Inquiry,
};
export const allowedFields = {
  services: [
    "title",
    "slug",
    "category",
    "summary",
    "content",
    "icon",
    "image",
    "order",
    "featured",
    "published",
    "seoTitle",
    "seoDescription",
  ],
  posts: [
    "title",
    "slug",
    "category",
    "excerpt",
    "content",
    "coverImage",
    "author",
    "publishedAt",
    "reviewStatus",
    "reviewNotes",
    "imageAlt",
    "featured",
    "published",
    "seoTitle",
    "seoDescription",
  ],
  team: ["name", "designation", "description", "image", "order", "published"],
  faqs: ["question", "answer", "category", "order", "published"],
  videos: [
    "title",
    "slug",
    "description",
    "content",
    "youtubeUrl",
    "thumbnail",
    "sourcePublisher",
    "relatedHref",
    "order",
    "published",
  ],
  slides: [
    "eyebrow",
    "title",
    "subtitle",
    "image",
    "ctaText",
    "ctaHref",
    "order",
    "enabled",
  ],
  sections: [
    "sectionKey",
    "eyebrow",
    "title",
    "description",
    "image",
    "ctaText",
    "ctaHref",
    "bullets",
    "order",
    "enabled",
  ],
  navigation: ["label", "href", "parent", "group", "order", "enabled"],
  pages: [
    "title",
    "slug",
    "excerpt",
    "content",
    "heroImage",
    "published",
    "seoTitle",
    "seoDescription",
  ],
  testimonials: ["quote", "author", "role", "order", "published"],
  inquiries: ["status"],
};
