export default function HomePage() {
    return (<main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">
          OneShotsmith
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Get brand-new D&D 5e players <strong>table-ready in under 10 minutes</strong>.
          Fast character creation and one-shot adventures with zero prep panic.
        </p>
        <div className="flex gap-4 justify-center pt-6">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition">
            Create Character
          </button>
          <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition">
            Generate One-Shot
          </button>
        </div>
      </div>
    </main>);
}
