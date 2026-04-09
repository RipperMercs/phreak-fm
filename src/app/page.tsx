export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl font-mono tracking-tight">
          phreak<span className="text-accent">.fm</span>
        </h1>
        <p className="text-muted text-lg font-serif max-w-md mx-auto">
          signals, frequencies, and the people who bend them
        </p>
        <div className="flex gap-6 justify-center text-sm font-mono">
          <span className="text-signals">signals</span>
          <span className="text-frequencies">frequencies</span>
          <span className="text-static-v">static</span>
        </div>
      </div>
    </main>
  );
}
