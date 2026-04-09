"use client";

import { useState } from "react";

export default function SubmitPirateSignalPage() {
  const [form, setForm] = useState({
    type: "pirate-signal",
    title: "",
    story: "",
    embedUrl: "",
    embedType: "bandcamp" as string,
    email: "",
    credit: "",
    honeypot: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!agreed) return;

    setStatus("sending");
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiBase}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          title: form.title,
          body: form.story,
          embedUrl: form.embedUrl || undefined,
          embedType: form.embedType,
          email: form.email || undefined,
          credit: form.credit || undefined,
        }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
        <div className="p-8 border border-frequencies/30 rounded-sm">
          <h1 className="font-display text-2xl text-text mb-3">Signal received.</h1>
          <p className="font-body text-text-muted">
            Thanks for the tip. If it catches our ear, it will show up on
            Pirate Signal.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <p className="font-mono text-xs text-frequencies uppercase tracking-widest mb-2">
          Pirate Signal
        </p>
        <h1 className="font-display text-3xl text-text mb-3">
          Submit a Track
        </h1>
        <p className="font-body text-text-muted">
          Found something strange and beautiful? Making something yourself?
          Drop us a link. Bandcamp, SoundCloud, YouTube, anywhere.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website"
            value={form.honeypot}
            onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="title" className="block font-mono text-sm text-text-muted mb-2">
            Artist / Track Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-body text-sm text-text focus:outline-none focus:border-frequencies"
          />
        </div>

        <div>
          <label htmlFor="embedUrl" className="block font-mono text-sm text-text-muted mb-2">
            Link (Bandcamp, SoundCloud, YouTube)
          </label>
          <input
            id="embedUrl"
            type="url"
            required
            value={form.embedUrl}
            onChange={(e) => setForm({ ...form, embedUrl: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-mono text-sm text-text focus:outline-none focus:border-frequencies"
            placeholder="https://..."
          />
        </div>

        <div>
          <label htmlFor="embedType" className="block font-mono text-sm text-text-muted mb-2">
            Platform
          </label>
          <select
            id="embedType"
            value={form.embedType}
            onChange={(e) => setForm({ ...form, embedType: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-mono text-sm text-text focus:outline-none focus:border-frequencies"
          >
            <option value="bandcamp">Bandcamp</option>
            <option value="soundcloud">SoundCloud</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>

        <div>
          <label htmlFor="story" className="block font-mono text-sm text-text-muted mb-2">
            Why This? <span className="text-text-muted">(optional, what caught your ear)</span>
          </label>
          <textarea
            id="story"
            rows={4}
            value={form.story}
            onChange={(e) => setForm({ ...form, story: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-body text-sm text-text focus:outline-none focus:border-frequencies resize-y"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-sm text-text-muted mb-2">
            Contact Email <span className="text-text-muted">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-mono text-sm text-text focus:outline-none focus:border-frequencies"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
            required
          />
          <label htmlFor="agree" className="font-body text-sm text-text-muted">
            I affirm this submission is mine to share or properly sourced and I
            grant phreak.fm non-exclusive rights to feature it.
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "sending" || !agreed}
          className="font-mono text-sm px-6 py-2.5 border border-frequencies text-frequencies rounded-sm hover:bg-frequencies/10 transition-colors disabled:opacity-40"
        >
          {status === "sending" ? "Sending..." : "Submit Track"}
        </button>

        {status === "error" && (
          <p className="font-mono text-sm text-riso-red mt-2">
            Something went wrong. Try again later.
          </p>
        )}
      </form>
    </main>
  );
}
