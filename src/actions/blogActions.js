"use server";

import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { slugifyTitle } from "@/lib/slugify";
import sanitizeHtml from "sanitize-html";

const cleanArticleHtml = (html) =>
  sanitizeHtml(String(html || ""), {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "blockquote",
      "pre",
      "code",
      "ol",
      "ul",
      "li",
      "a",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["class", "style"],
      p: ["class", "style"],
      h1: ["class", "style"],
      h2: ["class", "style"],
      h3: ["class", "style"],
      h4: ["class", "style"],
    },
    allowedStyles: {
      "*": {
        color: [/^#[0-9a-f]{3,8}$/i, /^rgb/],
        "background-color": [/^#[0-9a-f]{3,8}$/i, /^rgb/],
        "text-align": [/^(left|right|center|justify)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });

async function uniqueSlug(title, excludedId) {
  const base = slugifyTitle(title);
  let candidate = base;
  let suffix = 2;
  while (
    await Blog.exists({
      slug: candidate,
      ...(excludedId ? { _id: { $ne: excludedId } } : {}),
    })
  )
    candidate = `${base}-${suffix++}`;
  return candidate;
}

function cleanImageUrl(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  try {
    const url = new URL(image);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

/**
 * CREATE BLOG
 */
export async function createBlog(data) {
  try {
    await requireAdmin();
    await connectDB();

    const {
      title,
      description,
      content,
      image,
      category,
      author,
      published = true,
      metaTitle,
      metaKeywords,
    } = data;

    if (!title || !description || !content) {
      return {
        success: false,
        message: "Title, description and content are required.",
      };
    }

    const generatedSlug = await uniqueSlug(title);
    const safeContent = cleanArticleHtml(content);
    if (
      !safeContent
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim()
    )
      return { success: false, message: "Article content is required." };

    const blog = await Blog.create({
      title: title.trim(),
      slug: generatedSlug,
      description: description.trim(),
      content: safeContent,
      image: cleanImageUrl(image),
      category: category || "General",
      author: author || "Admin",
      published,
      publishedAt: published ? new Date() : null,
      metaTitle: metaTitle?.trim() || title.trim(),
      metaKeywords: String(metaKeywords || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });

    revalidatePath("/blogs");

    return {
      success: true,
      message: "Blog created successfully.",
      data: JSON.parse(JSON.stringify(blog)),
    };
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return {
      success: false,
      message: "Failed to create blog.",
    };
  }
}

/**
 * GET ALL BLOGS
 */
export async function getBlogs() {
  try {
    await connectDB();

    const blogs = await Blog.find({
      published: true,
    })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(blogs)),
    };
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    return {
      success: false,
      message: "Failed to fetch blogs.",
      data: [],
    };
  }
}

export async function getAdminBlogs() {
  try {
    await requireAdmin();
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(blogs)) };
  } catch (error) {
    return { success: false, message: "Failed to fetch blogs.", data: [] };
  }
}

export async function getAdminBlog(id) {
  try {
    await requireAdmin();
    await connectDB();
    const blog = await Blog.findById(id).lean();
    return {
      success: !!blog,
      data: blog ? JSON.parse(JSON.stringify(blog)) : null,
    };
  } catch (error) {
    return { success: false, data: null };
  }
}

/**
 * GET SINGLE BLOG BY SLUG
 */
export async function getBlogBySlug(slug) {
  try {
    await connectDB();

    if (!slug) {
      return {
        success: false,
        message: "Slug is required.",
        data: null,
      };
    }

    const normalizedSlug = decodeURIComponent(slug).toLowerCase();
    const blog = await Blog.findOne({
      $or: [{ slug: normalizedSlug }, { previousSlugs: normalizedSlug }],
      published: true,
    }).lean();

    if (!blog) {
      return {
        success: false,
        message: "Blog not found.",
        data: null,
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(blog)),
    };
  } catch (error) {
    console.error("GET BLOG BY SLUG ERROR:", error);

    return {
      success: false,
      message: "Failed to fetch blog.",
      data: null,
    };
  }
}

/**
 * UPDATE BLOG
 */
export async function updateBlog(id, data) {
  try {
    await requireAdmin();
    await connectDB();

    if (!id) {
      return {
        success: false,
        message: "Blog ID is required.",
      };
    }

    const {
      title,
      description,
      content,
      image,
      category,
      author,
      published = true,
      metaTitle,
      metaKeywords,
    } = data;

    if (!title || !description || !content) {
      return {
        success: false,
        message: "Title, description and content are required.",
      };
    }

    const oldBlog = await Blog.findById(id).lean();
    if (!oldBlog) return { success: false, message: "Blog not found." };
    const normalizedSlug = await uniqueSlug(title, id);
    const safeContent = cleanArticleHtml(content);
    if (
      !safeContent
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim()
    )
      return { success: false, message: "Article content is required." };

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        slug: normalizedSlug,
        description: description.trim(),
        content: safeContent,
        image: cleanImageUrl(image),
        category: category || "General",
        author: author || "Admin",
        published,
        publishedAt: published ? oldBlog.publishedAt || new Date() : null,
        previousSlugs:
          normalizedSlug !== oldBlog.slug
            ? [
                ...new Set([...(oldBlog.previousSlugs || []), oldBlog.slug]),
              ].slice(-20)
            : oldBlog.previousSlugs || [],
        metaTitle: metaTitle?.trim() || title.trim(),
        metaKeywords: String(metaKeywords || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!blog) {
      return {
        success: false,
        message: "Blog not found.",
      };
    }

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${oldBlog.slug}`);
    revalidatePath(`/blogs/${blog.slug}`);

    return {
      success: true,
      message: "Blog updated successfully.",
      data: JSON.parse(JSON.stringify(blog)),
    };
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return {
      success: false,
      message: "Failed to update blog.",
    };
  }
}

/**
 * DELETE BLOG
 */
export async function deleteBlog(id) {
  try {
    await requireAdmin();
    await connectDB();

    if (!id) {
      return {
        success: false,
        message: "Blog ID is required.",
      };
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return {
        success: false,
        message: "Blog not found.",
      };
    }

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.slug}`);

    return {
      success: true,
      message: "Blog deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    return {
      success: false,
      message: "Failed to delete blog.",
    };
  }
}

export async function toggleBlogPublished(id, published) {
  try {
    await requireAdmin();
    await connectDB();
    const blog = await Blog.findByIdAndUpdate(
      id,
      { published, publishedAt: published ? new Date() : null },
      { new: true },
    );
    if (!blog) return { success: false, message: "Blog not found." };
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.slug}`);
    return { success: true, message: "Status updated." };
  } catch (error) {
    return { success: false, message: "Failed to update status." };
  }
}
