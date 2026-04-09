interface PullquoteProps {
  attribution?: string;
  children: React.ReactNode;
}

export function Pullquote({ attribution, children }: PullquoteProps) {
  return (
    <blockquote className="my-8 py-6 border-t border-b border-border">
      <p className="font-serif text-xl text-foreground italic leading-relaxed">
        {children}
      </p>
      {attribution && (
        <cite className="block mt-3 font-mono text-sm text-muted not-italic">
          {attribution}
        </cite>
      )}
    </blockquote>
  );
}
