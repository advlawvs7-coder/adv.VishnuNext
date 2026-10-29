"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { resourceMenu } from "./adminConfig";
import {
  LayoutDashboard,
  Scale,
  Newspaper,
  Images,
  PanelsTopLeft,
  Menu,
  Files,
  Users,
  Video,
  CircleHelp,
  MessageSquare,
  Inbox,
  ImageIcon,
  Settings,
  LockKeyhole,
  ExternalLink,
  LogOut,
  X,
  PanelLeft,
  Globe,
  Palette,
} from "lucide-react";
const icons = {
  "layout-dashboard": LayoutDashboard,
  scale: Scale,
  newspaper: Newspaper,
  images: Images,
  "panels-top-left": PanelsTopLeft,
  menu: Menu,
  files: Files,
  users: Users,
  video: Video,
  "circle-help": CircleHelp,
  "message-square": MessageSquare,
  inbox: Inbox,
  image: ImageIcon,
  settings: Settings,
  palette: Palette,
  "lock-keyhole": LockKeyhole,
};
export default function AdminShell({ children, admin }) {
  const path = usePathname(),
    router = useRouter(),
    [open, setOpen] = useState(false);
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }
  return (
    <div className="v8-admin-shell min-h-screen  text-ink" >
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r border-[var(--theme-border)] bg-white text-[var(--theme-ink)] transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between border-b border-[var(--theme-border)] px-5">
          <Link href="/admin" className="flex items-center gap-3">
            <Scale className="text-gold" size={29} />
            <div className="text-[13px] font-bold tracking-wide">
              VISHNU SHARMA{" "}
              <span className="block text-xs font-normal text-gold">
                CONTENT MANAGER
              </span>
            </div>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {resourceMenu.map(([name, href, iconName]) => {
            const Icon = icons[iconName] || Scale;
            const active = path === href;
            return (
              <Link
                onClick={() => setOpen(false)}
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] transition ${active ? "v8-admin-active" : "text-[var(--theme-ink)] hover:text-[var(--theme-primary)]"}`}
              >
                <Icon size={17} />
                {name}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 border-t border-[var(--theme-border)] px-5 py-5 text-xs text-slate-400">
          Single Next.js project
          <br />
          MongoDB + Tailwind CSS By Sandeep Kumar
        </div>
      </aside>
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/25 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-themeBorder bg-gray px-5 md:px-9">
          <div className="flex items-center gap-4">
            <button
              aria-label="Open menu"
              className="rounded p-2 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <PanelLeft />
            </button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-gold">
                Website CMS
              </p>
              <p className="font-serif text-xl font-bold">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1 text-xs font-bold text-[var(--theme-muted)] hover:text-gold sm:flex"
            >
              <Globe size={16} /> View Website <ExternalLink size={13} />
            </a>
            <span className="hidden text-xs text-slate-400 md:block">
              {admin.email}
            </span>
            <button
              onClick={logout}
              className="rounded-lg border p-2 text-[var(--theme-muted)] hover:bg-themeTint"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-[1450px] p-5 pb-16 md:p-9">
          {children}
        </div>
      </div>
    </div>
  );
}
