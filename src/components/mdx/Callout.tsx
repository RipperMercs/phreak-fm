interface CalloutProps {
  type?: "info" | "warning" | "danger" | "note";
  children: React.ReactNode;
}

const styles = {
  info: "border-accent bg-accent/5",
  warning: "border-static-v bg-static-v/5",
  danger: "border-red-500 bg-red-500/5",
  note: "border-muted bg-surface",
};

const labels = {
  info: "Info",
  warning: "Warning",
  danger: "Danger",
  note: "Note",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <aside
      className={`border-l-2 pl-4 py-3 my-6 ${styles[type]}`}
      role="note"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
        {labels[type]}
      </p>
      <div className="font-serif text-sm">{children}</div>
    </aside>
  );
}
