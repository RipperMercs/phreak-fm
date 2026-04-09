interface AsideProps {
  children: React.ReactNode;
}

export function Aside({ children }: AsideProps) {
  return (
    <aside className="my-6 p-4 bg-bg-surface border border-border rounded-sm text-sm font-body text-text-muted">
      {children}
    </aside>
  );
}
