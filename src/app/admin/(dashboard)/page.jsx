import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Service, Post, FAQ, Video, Inquiry, Team } from "@/models";
import {
  ArrowUpRight,
  Inbox,
  FilePenLine,
  Scale,
  Newspaper,
  Video as VideoIcon,
  Users,
  HelpCircle,
  Sparkles,
} from "lucide-react";
export const metadata = {
  title: "Dashboard | Admin",
  robots: { index: false, follow: false },
};
export default async function Dashboard() {
  await connectDB();
  const [services, posts, faqs, videos, inquiries, team, recent] =
    await Promise.all([
      Service.countDocuments(),
      Post.countDocuments(),
      FAQ.countDocuments(),
      Video.countDocuments(),
      Inquiry.countDocuments({ status: "new" }),
      Team.countDocuments(),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);
  const pendingDrafts = await Post.countDocuments({ reviewStatus: "pending_review", published: false, deleted: { $ne: true } });
  const items = [
    [Scale, "Practice Areas", services, "/admin/services"],
    [Newspaper, "Articles", posts, "/admin/posts"],
    [Sparkles, "AI Drafts to Review", pendingDrafts, "/admin/ai-blog"],
    [VideoIcon, "Videos", videos, "/admin/videos"],
    [HelpCircle, "FAQs", faqs, "/admin/faqs"],
    [Users, "Profiles", team, "/admin/team"],
    [Inbox, "New Enquiries", inquiries, "/admin/inquiries"],
  ];
  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="kicker mb-2">Overview</p>
          <h1 className="font-serif text-3xl">Welcome to your CMS</h1>
          <p className="mt-2 text-sm text-[var(--theme-muted)]">
            Manage the whole website without editing code.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="btn-dark text-xs"
        >
          Open Website <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(([Icon, name, count, href]) => (
          <Link
            href={href}
            key={name}
            className="admin-card flex items-center justify-between p-6 transition hover:border-gold"
          >
            <div>
              <p className="text-sm text-[var(--theme-muted)]">{name}</p>
              <p className="mt-3 font-serif text-4xl font-bold">{count}</p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-sand text-gold">
              <Icon size={26} />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-9 grid gap-7 lg:grid-cols-[1.4fr_1fr]">
        <section className="admin-card p-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold">Recent enquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm font-semibold text-gold"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y">
            {recent.length ? (
              recent.map((x) => (
                <div
                  key={String(x._id)}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-semibold">{x.name}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-[var(--theme-muted)]">
                      {x.service || x.message}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-[var(--theme-muted)]">
                    {new Date(x.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-4 text-sm text-slate-400">No enquiries yet.</p>
            )}
          </div>
        </section>
        <section className="admin-card p-7">
          <h2 className="mb-4 font-serif text-2xl font-bold">Quick Actions</h2>
          <div className="space-y-3">
            {[
              ["Add Blog Article", "/admin/posts"],
              ["Edit Homepage Banner", "/admin/slides"],
              ["Update Contact Details", "/admin/settings"],
              ["Edit Main Menu", "/admin/navigation"],
              ["Change Hero Sections", "/admin/sections"],
            ].map(([text, href]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-lg bg-sand px-4 py-3 text-sm font-medium hover:text-gold"
              >
                {text}
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
