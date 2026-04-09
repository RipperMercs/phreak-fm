export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-5xl font-display tracking-tight text-text">
          phreak<span className="text-riso-cyan">.fm</span>
        </h1>
        <p className="text-text-muted text-lg font-body max-w-md mx-auto">
          signals, frequencies, and the people who bend them
        </p>
        <div className="flex gap-6 justify-center text-sm font-mono">
          <span className="text-signals">SIG</span>
          <span className="text-frequencies">FRQ</span>
          <span className="text-static-v">STA</span>
        </div>
      </div>
    </main>
  );
}
