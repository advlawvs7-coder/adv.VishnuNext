const field = (key, label, type = "text", opts = {}) => ({
  key,
  label,
  type,
  ...opts,
});
const enabled = field("enabled", "Enabled", "boolean");
const published = field("published", "Published", "boolean");
const order = field("order", "Display Order", "number");
const slug = field("slug", "URL Slug", "text", {
  help: "Lowercase words separated by hyphens.",
});
const seo = [
  field("seoTitle", "SEO Meta Title"),
  field("seoDescription", "SEO Meta Description", "textarea"),
];
const image = (key = "image", label = "Image URL") =>
  field(key, label, "image");
export const resourceConfigs = {
  services: {
    title: "Practice Areas",
    singular: "Practice Area",
    description: "Legal services, detail pages, categories and SEO.",
    fields: [
      field("title", "Service Title", "text", { required: true }),
      slug,
      field("category", "Category", "text", {
        help: "E.g. Family & Matrimonial or NRI & Property",
      }),
      field("summary", "Short Summary", "textarea"),
      field("content", "Full Content (Markdown)", "markdown"),
      field("icon", "Icon Name", "select", {
        options: [
          "scale",
          "heart-handshake",
          "users",
          "shield",
          "globe",
          "building-2",
          "scroll-text",
          "shield-check",
          "landmark",
          "file-check-2",
          "hand-coins",
          "briefcase-business",
        ],
      }),
      image(),
      order,
      field("featured", "Featured", "boolean"),
      published,
      ...seo,
    ],
  },
  posts: {
    title: "Blog Articles",
    singular: "Article",
    description: "Edit drafts and published posts. Review AI content in AI Blog Studio before publishing.",
    fields: [
      field("title", "Article Title", "text", { required: true }),
      slug,
      field("category", "Category"),
      field("excerpt", "Excerpt", "textarea"),
      field("content", "Article Body (Markdown)", "markdown"),
      image("coverImage", "Cover Image URL"),
      field("author", "Author"),
      field("publishedAt", "Publication Date", "date"),
      field("reviewStatus", "Editorial Status", "select", { options: ["draft", "pending_review", "approved", "published"] }),
      field("reviewNotes", "Review Notes", "textarea"),
      field("imageAlt", "Image Alt Text"),
      field("featured", "Featured", "boolean"),
      published,
      ...seo,
    ],
  },
  slides: {
    title: "Hero Sliders",
    singular: "Hero Slide",
    description:
      "Edit and rearrange homepage banners and call-to-action links.",
    fields: [
      field("eyebrow", "Small Upper Heading"),
      field("title", "Large Headline", "textarea", { required: true }),
      field("subtitle", "Supporting Text", "textarea"),
      image(),
      field("ctaText", "Button Label"),
      field("ctaHref", "Button URL"),
      order,
      enabled,
    ],
  },
  sections: {
    title: "Homepage Sections",
    singular: "Section",
    description:
      "Show/hide, reorder and rewrite homepage blocks. The section key selects the block layout.",
    fields: [
      field("sectionKey", "Section Key", "text", {
        required: true,
        help: "process, practice, nri, why, videos, team, blog, faqs, consultation or any new key",
      }),
      field("eyebrow", "Small Heading"),
      field("title", "Main Heading"),
      field("description", "Description", "textarea"),
      image(),
      field("ctaText", "Button Label"),
      field("ctaHref", "Button URL"),
      field("bullets", "Bullets / Feature List", "textarea", {
        help: "One per line. For cards use Heading|Description.",
      }),
      order,
      enabled,
    ],
  },
  navigation: {
    title: "Navigation",
    singular: "Menu Item",
    description:
      "Edit top-level menu links or create submenu links using Parent Menu Label.",
    fields: [
      field("label", "Menu Label", "text", { required: true }),
      field("href", "Link URL", "text", {
        help: "e.g. /about, /pages/new-page",
      }),
      field("parent", "Parent Menu Label", "text", {
        help: "Leave blank for main menu. Enter Practice Areas for mega menu links.",
      }),
      field("group", "Menu Column / Group", "text", {
        help: "e.g. NRI & Property, Family & Matrimonial, Immigration & Visa, Courts & Criminal, Additional Areas",
      }),
      order,
      enabled,
    ],
  },
  team: {
    title: "Team & Profiles",
    singular: "Profile",
    description: "Manage advocate profiles and approved team details.",
    fields: [
      field("name", "Name", "text", { required: true }),
      field("designation", "Designation"),
      field("description", "Biography", "textarea"),
      image(),
      order,
      published,
    ],
  },
  videos: {
    title: "Legal Videos",
    singular: "Video",
    description: "Add official YouTube URLs and preview thumbnails.",
    fields: [
      field("title", "Video Title", "text", { required: true }),
      slug,
      field("description", "Description", "textarea"),
      field("content", "Topic Guide (Markdown)", "markdown"),
      field("youtubeUrl", "YouTube URL"),
      field("sourcePublisher", "Video Publisher / Channel", {
        help: "For external videos identify the original publisher. Do not claim them as your own.",
      }),
      field("relatedHref", "Related Page URL", "text", {
        help: "Used when the official video URL is not available",
      }),
      image("thumbnail", "Thumbnail URL"),
      order,
      published,
    ],
  },
  faqs: {
    title: "Frequently Asked Questions",
    singular: "FAQ",
    description: "Manage general FAQs and public answers.",
    fields: [
      field("question", "Question", "text", { required: true }),
      field("answer", "Answer", "textarea"),
      field("category", "Category"),
      order,
      published,
    ],
  },
  pages: {
    title: "Custom Pages",
    singular: "Custom Page",
    description:
      "Standalone CMS pages under /pages/[slug], including disclaimers.",
    fields: [
      field("title", "Page Title", "text", { required: true }),
      slug,
      field("excerpt", "Short Description", "textarea"),
      field("content", "Page Content (Markdown)", "markdown"),
      image("heroImage", "Banner Image URL"),
      published,
      ...seo,
    ],
  },
  testimonials: {
    title: "Testimonials",
    singular: "Testimonial",
    description:
      "DRAFT ONLY by default. Publish only authentic, consented feedback consistent with applicable professional rules.",
    fields: [
      field("quote", "Quote", "textarea", { required: true }),
      field("author", "Author Name"),
      field("role", "Author Role"),
      order,
      published,
    ],
  },
};
export const resourceMenu = [
  ["Overview", "/admin", "layout-dashboard"],
  ["Practice Areas", "/admin/services", "scale"],
  ["Blogs", "/admin/posts", "newspaper"],
  ["AI Blog Studio", "/admin/ai-blog", "newspaper"],
  ["Hero Sliders", "/admin/slides", "images"],
  ["Homepage Sections", "/admin/sections", "panels-top-left"],
  ["Navigation", "/admin/navigation", "menu"],
  ["Custom Pages", "/admin/pages", "files"],
  ["Team", "/admin/team", "users"],
  ["Videos", "/admin/videos", "video"],
  ["FAQs", "/admin/faqs", "circle-help"],
  ["Testimonials", "/admin/testimonials", "message-square"],
  ["Inquiries", "/admin/inquiries", "inbox"],
  ["Media Upload", "/admin/media", "image"],
  ["Website Themes", "/admin/themes", "palette"],
  ["Site Settings", "/admin/settings", "settings"],
  ["Change Password", "/admin/change-password", "lock-keyhole"],
];
