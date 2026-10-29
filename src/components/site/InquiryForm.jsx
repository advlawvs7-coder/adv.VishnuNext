"use client";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
export default function InquiryForm({
  source = "Website",
  compact = false,
  serviceOptions = [],
}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.source = source;
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const r = await res.json();
      if (!res.ok) throw new Error(r.error || "Could not submit enquiry.");
      setStatus("done");
      e.target.reset();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }
  if (status === "done")
    return (
      <div className="rounded bg-green-50 p-7 text-green-900">
        <CheckCircle2 className="mb-3" />
        <h3 className="text-lg font-semibold">Enquiry received</h3>
        <p className="mt-2 text-sm">
          Your enquiry has been recorded. The office may contact you regarding
          consultation availability.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-bold underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2"}
    >
      <input
        type="text"
        name="website"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input
        className="field"
        name="name"
        required
        maxLength={100}
        placeholder="Full Name *"
        aria-label="Full Name"
      />
      <input
        className="field"
        name="phone"
        required
        maxLength={30}
        placeholder="Phone Number *"
        aria-label="Phone Number"
      />
      <input
        className="field"
        name="email"
        type="email"
        required
        maxLength={160}
        placeholder="Email Address *"
        aria-label="Email Address"
      />
      <select
        className="field"
        name="service"
        aria-label="Matter category"
        defaultValue=""
      >
        <option value="">Select a Legal Matter</option>
        {(serviceOptions.length
          ? serviceOptions.map((s) => s.title)
          : [
              "Matrimonial / Divorce",
              "Property / Inheritance",
              "Criminal / Bail",
              "Civil Litigation",
              "NRI Legal Matter",
              "Business / Debt Recovery",
              "Other",
            ]
        ).map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
      {!compact && (
        <input
          className="field sm:col-span-2"
          name="subject"
          maxLength={200}
          placeholder="Subject"
          aria-label="Subject"
        />
      )}
      <textarea
        className={`field min-h-28 ${compact ? "" : "sm:col-span-2"}`}
        name="message"
        required
        minLength={10}
        maxLength={3000}
        placeholder="Briefly describe your legal concern *"
        aria-label="Your legal concern"
      />
      <div className={compact ? "" : "sm:col-span-2"}>
        <p className="mb-3 text-[11px] leading-5 text-[var(--theme-muted)]">
          Please do not include passwords or highly sensitive documents.
          Submitting does not create an advocate–client relationship.
        </p>
        {status === "error" && (
          <p
            role="alert"
            className="mb-3 flex items-center gap-2 text-xs text-red-600"
          >
            <AlertCircle size={14} />
            {error}
          </p>
        )}
        <button
          disabled={status === "saving"}
          className="btn-gold w-full disabled:opacity-60"
        >
          {status === "saving" ? "Submitting…" : "Send Enquiry"}
          <Send size={16} />
        </button>
      </div>
    </form>
  );
}