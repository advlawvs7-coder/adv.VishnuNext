"use client";
import { useState } from "react";
import Link from "next/link";
export default function BlogExplorer({ blogs }) {
  const [q, setQ] = useState("");
  const list = blogs.filter((b) =>
    `${b.title} ${b.category} ${b.description}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  return (
    <>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search legal articles…"
        className="w-full max-w-md bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm outline-none focus:border-amber-500"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-9">
        {list.map((blog) => (
          <article
            key={blog._id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 flex flex-col flex-1">
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
                {blog.category}
              </p>
              <h2 className="text-xl font-black text-slate-900 mt-3">
                {blog.title}
              </h2>
              <p className="text-sm text-slate-500 mt-3 line-clamp-3">
                {blog.description}
              </p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="mt-6 pt-4 border-t text-sm font-bold text-amber-700"
              >
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>
      {!list.length && (
        <p className="bg-white rounded-xl p-10 mt-8 text-center text-slate-500">
          No articles found.
        </p>
      )}
    </>
  );
}
