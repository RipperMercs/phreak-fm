interface AsideProps {
  children: React.ReactNode;
}

export function Aside({ children }: AsideProps) {
  return (
    <aside className="my-6 p-4 bg-surface border border-border rounded text-sm font-serif text-muted">
      {children}
    </aside>
  );
}
