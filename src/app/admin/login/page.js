"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/actions/authActions";

export default function AdminLogin() {
  const [state, action, pending] = useActionState(loginAdmin, {});
  return <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
    <form action={action} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl space-y-5">
      <div><p className="text-amber-600 text-xs font-bold uppercase tracking-widest">Secure administration</p><h1 className="text-2xl font-black text-slate-900 mt-1">Admin Login</h1><p className="text-sm text-slate-500 mt-2">Manage articles and consultation enquiries.</p></div>
      <label className="block text-sm font-semibold text-slate-700">Email<input name="email" type="email" required autoComplete="username" className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500" /></label>
      <label className="block text-sm font-semibold text-slate-700">Password<input name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500" /></label>
      {state?.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
      <button disabled={pending} className="w-full rounded-lg bg-slate-900 py-3 font-bold text-amber-400 disabled:opacity-60">{pending ? "Signing in…" : "Sign In"}</button>
    </form>
  </main>;
}
