import Link from "next/link";
import { Button } from "@oneshotsmith/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Header/Nav */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚔️</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                OneShotsmith
              </span>
            </div>
            <a
              href="https://github.com/rages4calm/oneshotsmith"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                GitHub
              </Button>
            </a>
          </nav>

          {/* Hero Content */}
          <div className="text-center space-y-8 mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              D&D 5e SRD 5.1 - Free & Open Source
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="block text-white mb-2">
                Get Players
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent">
                Table-Ready
              </span>
              <span className="block text-white">
                in 10 Minutes
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-slate-300 leading-relaxed">
              Fast D&D 5e character creation and one-shot adventures.
              Zero prep panic. <span className="text-purple-400 font-semibold">Zero experience needed.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/character-creator">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                >
                  Create Character
                  <span className="ml-2" aria-hidden>⚔️</span>
                </Button>
              </Link>
              <Link href="/one-shot-generator">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 border-slate-700 bg-slate-900/70 text-white hover:border-purple-500 hover:bg-purple-500/20 transition-all duration-300 shadow-lg/40"
                >
                  Generate One-Shot
                  <span className="ml-2" aria-hidden>🎲</span>
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-8 text-sm text-slate-400">
              <p>Trusted by GMs and new players worldwide</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎲</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Smart Character Builder
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Pick a role, level, and generate a complete character with abilities, equipment, and tactical tips. SRD-compliant and balanced.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                One-Shot Adventures
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Generate complete adventures with hooks, encounters, NPCs, and treasures. Perfect for 2-4 hour sessions with zero prep time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Party Balance Meter
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Real-time party composition analysis. See healing, control, and utility coverage as players join your lobby.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-32 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 text-lg mb-16">
              Three simple steps to epic adventures
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 pt-12">
                  <h3 className="text-xl font-semibold text-white mb-3">Choose Your Role</h3>
                  <p className="text-slate-400">
                    Frontliner, Skirmisher, Support, Control, or Face. Pick what sounds fun.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 pt-12">
                  <h3 className="text-xl font-semibold text-white mb-3">Click Generate</h3>
                  <p className="text-slate-400">
                    Our engine creates a balanced, playable character with everything you need.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 pt-12">
                  <h3 className="text-xl font-semibold text-white mb-3">Start Playing</h3>
                  <p className="text-slate-400">
                    Export to PDF, VTT, or use our digital character sheet. You're ready!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 text-center bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-2xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Create Your First Character?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of players who've discovered the fastest way to get into D&D 5e.
            </p>
            <Link href="/character-creator">
              <Button
                size="lg"
                className="px-10 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                Get Started Free
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">⚔️</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  OneShotsmith
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Fast, friendly D&D 5e character creation and one-shot adventures.
                Built with ❤️ for the tabletop community.
              </p>
              <p className="text-slate-500 text-xs mt-4">
                Code: MIT License | SRD Content: CC-BY-4.0
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/character-creator" className="text-slate-400 hover:text-purple-400 transition">Character Creator</Link></li>
                <li><Link href="/one-shot-generator" className="text-slate-400 hover:text-purple-400 transition">One-Shot Generator</Link></li>
                <li><Link href="/library" className="text-slate-400 hover:text-purple-400 transition">Pregen Library</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/rages4calm/oneshotsmith"
                    className="text-slate-400 hover:text-purple-400 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
            <p>
              Portions of the materials used are property of Wizards of the Coast LLC and are used under CC-BY-4.0.
            </p>
            <p className="mt-2">
              {"\u00A9"} {new Date().getFullYear()} Carl Prewitt Jr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}




