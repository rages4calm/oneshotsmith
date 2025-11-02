"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@oneshotsmith/ui";
import { generateOneShot } from "@oneshotsmith/core";
import type { OneShotTheme, CharacterLevel, Difficulty, TimeBox, OneShotPacket } from "@oneshotsmith/core";

export default function OneShotGeneratorPage() {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState<OneShotTheme | null>(null);
  const [level, setLevel] = useState<CharacterLevel>(3);
  const [timebox, setTimebox] = useState<TimeBox>("3h");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [oneShot, setOneShot] = useState<OneShotPacket | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const themes: Array<{
    name: OneShotTheme;
    icon: string;
    description: string;
    color: string;
  }> = [
    {
      name: "Heist",
      icon: "🎭",
      description: "Steal an artifact, infiltrate, and escape.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Rescue",
      icon: "⛓️",
      description: "Save prisoners from bandits or cultists.",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Dungeon Sprint",
      icon: "🏰",
      description: "Classic dungeon crawl with traps and monsters.",
      color: "from-slate-500 to-gray-600",
    },
    {
      name: "Horror-Lite",
      icon: "👻",
      description: "Spooky mansion or haunted location.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "Travel Gauntlet",
      icon: "🗺️",
      description: "Escort mission through dangerous terrain.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const handleGenerate = async () => {
    if (!theme) return;

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const generated = generateOneShot({
      theme,
      level,
      timebox,
      difficulty,
    });
    setOneShot(generated);
    setIsGenerating(false);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setTheme(null);
    setOneShot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">⚔️</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                OneShotsmith
              </span>
            </Link>
            <Button variant="ghost" onClick={handleReset} className="text-slate-300">
              ← Back to Start
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s
                      ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 rounded ${
                      step > s ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-slate-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-slate-400">
            Step {step} of 3: {step === 1 ? "Choose Theme" : step === 2 ? "Configure Settings" : "Your Adventure"}
          </div>
        </div>

        {/* Step 1: Choose Theme */}
        {step === 1 && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Choose Adventure Theme
              </h1>
              <p className="text-xl text-slate-400">
                What kind of one-shot do you want to run?
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((t) => (
                <Card
                  key={t.name}
                  className={`cursor-pointer transition-all duration-300 ${
                    theme === t.name
                      ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20 scale-105"
                      : "border-slate-800 hover:border-purple-500/50 bg-slate-900/50 hover:scale-102"
                  }`}
                  onClick={() => setTheme(t.name)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg`}>
                      {t.icon}
                    </div>
                    <CardTitle className="text-2xl text-white">
                      {t.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {t.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                disabled={!theme}
                className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 transition-all shadow-lg"
              >
                Continue
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Configure Settings */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Configure Your Adventure
              </h1>
              <p className="text-xl text-slate-400">
                Set level, time, and difficulty
              </p>
            </div>

            {/* Player Level */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white">Player Level</CardTitle>
                <CardDescription>What level are your players?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {([3, 5, 8] as CharacterLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        level === lvl
                          ? "border-purple-500 bg-purple-500/10 text-white"
                          : "border-slate-700 hover:border-purple-500/50 text-slate-300"
                      }`}
                    >
                      <div className="text-2xl font-bold">Level {lvl}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Box */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white">Session Length</CardTitle>
                <CardDescription>How long is your session?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {(["2h", "3h", "4h"] as TimeBox[]).map((time) => (
                    <button
                      key={time}
                      onClick={() => setTimebox(time)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        timebox === time
                          ? "border-blue-500 bg-blue-500/10 text-white"
                          : "border-slate-700 hover:border-blue-500/50 text-slate-300"
                      }`}
                    >
                      <div className="text-2xl font-bold">{time}</div>
                      <div className="text-xs text-slate-400">
                        {time === "2h" && "Quick session"}
                        {time === "3h" && "Standard"}
                        {time === "4h" && "Extended"}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Difficulty */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white">Difficulty</CardTitle>
                <CardDescription>How challenging should combat be?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {(["Easy", "Medium", "Hard", "Deadly"] as Difficulty[]).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        difficulty === diff
                          ? "border-red-500 bg-red-500/10 text-white"
                          : "border-slate-700 hover:border-red-500/50 text-slate-300"
                      }`}
                    >
                      <div className="text-lg font-bold">{diff}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStep(1)}
                className="px-8 py-6 text-lg border-2 border-slate-700"
              >
                ← Back
              </Button>
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 transition-all shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin mr-2">⚙️</span>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Adventure
                    <span className="ml-2">✨</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Adventure Output */}
        {step === 3 && oneShot && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                {oneShot.title}
              </h1>
              <p className="text-xl text-slate-300">
                {theme} • Level {level} • {timebox} • {difficulty}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300">
                <span className="text-xl">✓</span>
                Adventure Ready!
              </div>
            </div>

            {/* Hook */}
            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span>🎯</span>
                  The Hook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-slate-300 leading-relaxed">{oneShot.hook}</p>
              </CardContent>
            </Card>

            {/* Three-Act Structure */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Act I</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{oneShot.actOne}</p>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Act II</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{oneShot.actTwo}</p>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Act III</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{oneShot.actThree}</p>
                </CardContent>
              </Card>
            </div>

            {/* Twist & Finale */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-amber-500/20 bg-amber-900/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <span>🎲</span>
                    The Twist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{oneShot.twist}</p>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 bg-red-900/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <span>⚔️</span>
                    Finale Complication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{oneShot.finale}</p>
                </CardContent>
              </Card>
            </div>

            {/* Encounters */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span>⚔️</span>
                  Encounters ({oneShot.encounters.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {oneShot.encounters.map((encounter, i) => (
                    <div key={i} className="border-l-2 border-purple-500 pl-4 space-y-2">
                      <h3 className="text-lg font-semibold text-white">{encounter.name}</h3>
                      <p className="text-slate-300">{encounter.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {encounter.monsters.map((monster, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
                          >
                            {monster}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-slate-400">
                        <strong>Terrain:</strong> {encounter.terrain} • <strong>XP:</strong> {encounter.xp}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* NPCs */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span>👥</span>
                  NPCs ({oneShot.npcs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {oneShot.npcs.map((npc, i) => (
                    <div key={i} className="p-4 rounded-lg border border-slate-700 bg-slate-800/30">
                      <h3 className="text-lg font-semibold text-white mb-2">{npc.name}</h3>
                      <p className="text-sm text-slate-300 mb-2">{npc.description}</p>
                      <p className="text-xs text-purple-300"><strong>Goal:</strong> {npc.goal}</p>
                      <p className="text-xs text-blue-300"><strong>Quirk:</strong> {npc.quirk}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Item & Treasure */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <span>🔑</span>
                    Key Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{oneShot.keyItem}</p>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/20 bg-yellow-900/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <span>💰</span>
                    Treasure Parcels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {oneShot.treasureParcels.map((treasure, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-yellow-400">•</span>
                        {treasure}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={handleReset}
                className="px-8 py-6 text-lg border-2 border-slate-700"
              >
                Generate Another
              </Button>
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
              >
                Export GM Packet
                <span className="ml-2">📄</span>
              </Button>
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                Save Adventure
                <span className="ml-2">💾</span>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
