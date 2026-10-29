"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ArrowRight } from "lucide-react";
export default function LoginForm() {
  const [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const router = useRouter();
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.target);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      router.replace("/admin");
      router.refresh();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-xl bg-white p-8 shadow-2xl"
    >
      <div className="flex items-center gap-2 text-gold">
        <LockKeyhole size={19} />
        <span className="text-xs font-bold uppercase tracking-widest">
          Administrator Login
        </span>
      </div>
      <div>
        <label className="admin-label" htmlFor="email">
          Email Address
        </label>
        <input
          autoFocus
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="field"
          placeholder="admin@example.com"
        />
      </div>
      <div>
        <label className="admin-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="field"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        disabled={loading}
        className="btn-gold w-full disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
        <ArrowRight size={17} />
      </button>
      <p className="text-center text-xs text-slate-400">
        Admin account is created using the seed script.
      </p>
    </form>
  );
}
