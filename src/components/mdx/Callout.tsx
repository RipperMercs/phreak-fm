interface CalloutProps {
  type?: "info" | "warning" | "danger" | "note";
  children: React.ReactNode;
}

const styles = {
  info: "border-riso-cyan bg-riso-cyan/5",
  warning: "border-riso-ochre bg-riso-ochre/5",
  danger: "border-riso-red bg-riso-red/5",
  note: "border-text-muted bg-bg-surface",
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
      <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
        {labels[type]}
      </p>
      <div className="font-body text-sm">{children}</div>
    </aside>
  );
}
