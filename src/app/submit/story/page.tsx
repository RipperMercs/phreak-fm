"use client";

import { useState } from "react";

export default function SubmitStoryPage() {
  const [form, setForm] = useState({
    type: "story",
    title: "",
    story: "",
    email: "",
    credit: "",
    sources: "",
    honeypot: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return; // Bot trap
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
          email: form.email || undefined,
          credit: form.credit || undefined,
          sources: form.sources || undefined,
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
        <div className="p-8 border border-riso-cyan/30 rounded-sm">
          <h1 className="font-display text-2xl text-text mb-3">Received.</h1>
          <p className="font-body text-text-muted">
            Thank you for your submission. We read everything. If it is a
            fit, you will hear back.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
          Submit
        </p>
        <h1 className="font-display text-3xl text-text mb-3">
          Submit a Story
        </h1>
        <p className="font-body text-text-muted">
          Hacker history, breach narratives, security analysis, tech
          commentary, or anything that belongs in the phreak.fm voice.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot (hidden from real users) */}
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
            Headline / Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-body text-sm text-text focus:outline-none focus:border-riso-cyan"
          />
        </div>

        <div>
          <label htmlFor="story" className="block font-mono text-sm text-text-muted mb-2">
            The Story
          </label>
          <textarea
            id="story"
            required
            rows={10}
            value={form.story}
            onChange={(e) => setForm({ ...form, story: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-body text-sm text-text focus:outline-none focus:border-riso-cyan resize-y"
            placeholder="Tell us the story. What happened? Why does it matter? What do people need to know?"
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
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-mono text-sm text-text focus:outline-none focus:border-riso-cyan"
          />
        </div>

        <div>
          <label htmlFor="credit" className="block font-mono text-sm text-text-muted mb-2">
            How to Credit You <span className="text-text-muted">(optional: real name, handle, or anonymous)</span>
          </label>
          <input
            id="credit"
            type="text"
            value={form.credit}
            onChange={(e) => setForm({ ...form, credit: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-body text-sm text-text focus:outline-none focus:border-riso-cyan"
          />
        </div>

        <div>
          <label htmlFor="sources" className="block font-mono text-sm text-text-muted mb-2">
            Source Links / References <span className="text-text-muted">(optional)</span>
          </label>
          <textarea
            id="sources"
            rows={3}
            value={form.sources}
            onChange={(e) => setForm({ ...form, sources: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-4 py-2.5 font-body text-sm text-text focus:outline-none focus:border-riso-cyan resize-y"
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
            I affirm this story is mine to tell or properly sourced and I
            grant phreak.fm non-exclusive rights to edit and publish.
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "sending" || !agreed}
          className="font-mono text-sm px-6 py-2.5 border border-riso-cyan text-riso-cyan rounded-sm hover:bg-riso-cyan/10 transition-colors disabled:opacity-40"
        >
          {status === "sending" ? "Sending..." : "Submit Story"}
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
