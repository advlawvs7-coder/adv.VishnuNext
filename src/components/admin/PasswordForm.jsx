"use client";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";
export default function PasswordForm() {
  const [busy, setBusy] = useState(false),
    [status, setStatus] = useState(""),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setStatus("");
    const fd = new FormData(e.currentTarget);
    const input = Object.fromEntries(fd.entries());
    if (input.newPassword !== input.confirmPassword) {
      setError("New passwords do not match.");
      setBusy(false);
      return;
    }
    try {
      const r = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setStatus("Password changed successfully.");
      e.target.reset();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="mb-7">
        <p className="kicker mb-2">Account Security</p>
        <h1 className="font-serif text-3xl">Change Admin Password</h1>
      </div>
      <form onSubmit={submit} className="admin-card max-w-xl space-y-5 p-8">
        <LockKeyhole size={28} className="text-gold" />
        {[
          ["oldPassword", "Current Password"],
          ["newPassword", "New Password (12+ characters)"],
          ["confirmPassword", "Confirm New Password"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="admin-label" htmlFor={name}>
              {label}
            </label>
            <input
              required
              minLength={name !== "oldPassword" ? 12 : undefined}
              className="field"
              name={name}
              id={name}
              type="password"
              autoComplete={
                name === "oldPassword" ? "current-password" : "new-password"
              }
            />
          </div>
        ))}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {status && <p className="text-sm text-green-700">{status}</p>}
        <button disabled={busy} className="btn-gold disabled:opacity-50">
          {busy ? "Saving..." : "Update Password"}
        </button>
      </form>
    </>
  );
}
