"use client";

import { useState } from "react";

export default function SubmitStoryPage() {
  const [form, setForm] = useState({
    title: "",
    story: "",
    email: "",
    credit: "",
    sources: "",
    honeypot: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!agreed) return;

    const subject = encodeURIComponent(`[phreak.fm submission] ${form.title}`);
    const body = encodeURIComponent(
      `Title: ${form.title}\n\n` +
      `Credit as: ${form.credit || "anonymous"}\n` +
      `Contact: ${form.email || "not provided"}\n\n` +
      `--- Story ---\n\n${form.story}\n\n` +
      (form.sources ? `--- Sources ---\n\n${form.sources}\n` : "")
    );

    window.location.href = `mailto:tips@phreak.fm?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
        <div className="p-8 border border-accent/30 rounded-sm">
          <h1 className="text-xl text-text-bright mb-3">Email client opened.</h1>
          <p className="text-sm text-text-muted">
            Your email client should have opened with the submission pre-filled.
            Send it to complete your submission. If it did not open, email
            tips@phreak.fm directly.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <p className="text-xs text-text-muted tracking-widest uppercase mb-2">
          submit
        </p>
        <h1 className="text-2xl text-text-bright mb-3">
          Submit a Story
        </h1>
        <p className="text-sm text-text-muted">
          Hacker history, breach narratives, security analysis, tech
          commentary. Anything that belongs in the phreak.fm voice.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot */}
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
          <label htmlFor="title" className="block text-xs text-text-muted mb-1.5">
            headline / title
          </label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="story" className="block text-xs text-text-muted mb-1.5">
            the story
          </label>
          <textarea
            id="story"
            required
            rows={10}
            value={form.story}
            onChange={(e) => setForm({ ...form, story: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text focus:outline-none focus:border-accent resize-y font-body"
            placeholder="What happened? Why does it matter?"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs text-text-muted mb-1.5">
              contact email <span className="text-text-muted">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="credit" className="block text-xs text-text-muted mb-1.5">
              credit as <span className="text-text-muted">(name, handle, or anonymous)</span>
            </label>
            <input
              id="credit"
              type="text"
              value={form.credit}
              onChange={(e) => setForm({ ...form, credit: e.target.value })}
              className="w-full bg-bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="sources" className="block text-xs text-text-muted mb-1.5">
            source links / references <span className="text-text-muted">(optional)</span>
          </label>
          <textarea
            id="sources"
            rows={2}
            value={form.sources}
            onChange={(e) => setForm({ ...form, sources: e.target.value })}
            className="w-full bg-bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text focus:outline-none focus:border-accent resize-y"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5"
            required
          />
          <label htmlFor="agree" className="text-xs text-text-muted leading-relaxed">
            I affirm this story is mine to tell or properly sourced and I
            grant phreak.fm non-exclusive rights to edit and publish.
          </label>
        </div>

        <button
          type="submit"
          disabled={!agreed}
          className="text-xs px-5 py-2 border border-accent text-accent rounded-sm hover:bg-accent/10 transition-colors disabled:opacity-30"
        >
          submit story
        </button>
      </form>
    </main>
  );
}
