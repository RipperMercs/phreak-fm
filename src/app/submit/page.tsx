"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    vertical: "signals" as string,
    subject: "",
    pitch: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiBase}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", vertical: "signals", subject: "", pitch: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <h1 className="font-mono text-3xl text-foreground mb-3">
          Submit a Pitch
        </h1>
        <p className="font-serif text-muted text-lg">
          Have a story, review, or feature idea? We want to hear it. Pitches
          for all three verticals are welcome.
        </p>
      </header>

      {status === "sent" ? (
        <div className="p-6 bg-surface border border-accent/30 rounded">
          <p className="font-mono text-sm text-accent mb-2">Pitch received.</p>
          <p className="font-serif text-sm text-muted">
            Thank you for your submission. If it is a fit, you will hear back.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-mono text-sm text-muted mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-surface border border-border rounded px-4 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-mono text-sm text-muted mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-surface border border-border rounded px-4 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="vertical" className="block font-mono text-sm text-muted mb-2">
              Vertical
            </label>
            <select
              id="vertical"
              value={form.vertical}
              onChange={(e) => setForm({ ...form, vertical: e.target.value })}
              className="w-full bg-surface border border-border rounded px-4 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-accent"
            >
              <option value="signals">Signals</option>
              <option value="frequencies">Frequencies</option>
              <option value="static">Static</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block font-mono text-sm text-muted mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-surface border border-border rounded px-4 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="pitch" className="block font-mono text-sm text-muted mb-2">
              Pitch
            </label>
            <textarea
              id="pitch"
              required
              rows={6}
              value={form.pitch}
              onChange={(e) => setForm({ ...form, pitch: e.target.value })}
              className="w-full bg-surface border border-border rounded px-4 py-2 font-serif text-sm text-foreground focus:outline-none focus:border-accent resize-y"
              placeholder="Describe your idea. What is the angle? Why does it belong on phreak.fm?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="font-mono text-sm px-6 py-2 bg-accent text-background rounded hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Submit Pitch"}
          </button>

          {status === "error" && (
            <p className="font-mono text-sm text-red-400 mt-2">
              Something went wrong. Try again later.
            </p>
          )}
        </form>
      )}
    </main>
  );
}
