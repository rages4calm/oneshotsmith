"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@oneshotsmith/ui";
import { generateCharacter } from "@oneshotsmith/core";
import type { Role, CharacterLevel, Character } from "@oneshotsmith/core";

export default function CharacterCreatorPage() {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState<CharacterLevel>(3);
  const [role, setRole] = useState<Role | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const roles: Array<{
    name: Role;
    icon: string;
    description: string;
    color: string;
  }> = [
    {
      name: "Frontliner",
      icon: "🛡️",
      description: "Tank and protect allies. High HP and AC.",
      color: "from-red-500 to-orange-500",
    },
    {
      name: "Skirmisher",
      icon: "⚔️",
      description: "High damage, mobile striker. Sneak attacks.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Support",
      icon: "💚",
      description: "Heal and buff allies. Keep the party alive.",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Control",
      icon: "✨",
      description: "Area control and crowd control. Spellcaster.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Face",
      icon: "🎭",
      description: "Social skills and support. Inspire allies.",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const handleGenerate = async () => {
    if (!role) return;

    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const generated = generateCharacter({ level, role });
    setCharacter(generated);
    setIsGenerating(false);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setLevel(3);
    setRole(null);
    setCharacter(null);
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
            Step {step} of 3: {step === 1 ? "Choose Level" : step === 2 ? "Select Role" : "Your Character"}
          </div>
        </div>

        {/* Step 1: Choose Level */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Choose Your Level
              </h1>
              <p className="text-xl text-slate-400">
                Higher levels get more features and abilities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {([3, 5, 8] as CharacterLevel[]).map((lvl) => (
                <Card
                  key={lvl}
                  className={`cursor-pointer transition-all duration-300 ${
                    level === lvl
                      ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                      : "border-slate-800 hover:border-purple-500/50 bg-slate-900/50"
                  }`}
                  onClick={() => setLevel(lvl)}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl text-white">
                      Level {lvl}
                    </CardTitle>
                    <CardDescription>
                      {lvl === 3 && "Beginner friendly, core abilities"}
                      {lvl === 5 && "Balanced, extra attack/spells"}
                      {lvl === 8 && "Advanced, powerful features"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Proficiency bonus: +{lvl <= 4 ? 2 : 3}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        {lvl === 3 && "2-3 class features"}
                        {lvl === 5 && "Extra attack/3rd level spells"}
                        {lvl === 8 && "Powerful subclass features"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg"
              >
                Continue
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Role */}
        {step === 2 && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Choose Your Role
              </h1>
              <p className="text-xl text-slate-400">
                What do you want to do in combat?
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((r) => (
                <Card
                  key={r.name}
                  className={`cursor-pointer transition-all duration-300 ${
                    role === r.name
                      ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20 scale-105"
                      : "border-slate-800 hover:border-purple-500/50 bg-slate-900/50 hover:scale-102"
                  }`}
                  onClick={() => setRole(r.name)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-br ${r.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg`}>
                      {r.icon}
                    </div>
                    <CardTitle className="text-2xl text-white">
                      {r.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {r.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

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
                disabled={!role || isGenerating}
                className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 transition-all shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin mr-2">⚙️</span>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Character
                    <span className="ml-2">✨</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Character Sheet */}
        {step === 3 && character && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                {character.name}
              </h1>
              <p className="text-xl text-slate-300">
                Level {character.level} {character.race} {character.class}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300">
                <span className="text-xl">✓</span>
                Character Ready!
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-300">Hit Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-red-400">{character.hp}</div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-300">Armor Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-400">{character.ac}</div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-300">Proficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-400">+{character.proficiencyBonus}</div>
                </CardContent>
              </Card>
            </div>

            {/* Abilities */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white">Ability Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {Object.entries(character.abilities).map(([ability, score]) => (
                    <div key={ability} className="text-center">
                      <div className="text-sm text-slate-400 font-semibold mb-1">{ability}</div>
                      <div className="text-2xl font-bold text-white">{score}</div>
                      <div className="text-xs text-slate-500">
                        ({score >= 10 ? '+' : ''}{Math.floor((score - 10) / 2)})
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features & Equipment */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {character.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-purple-400">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {character.equipment.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-blue-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Skills */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {character.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tactics */}
            <Card className="border-purple-500/20 bg-purple-900/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span>💡</span>
                  How to Play This Character
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {character.tactics.map((tactic, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <span className="text-purple-400 font-bold">{i + 1}.</span>
                      <span>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={handleReset}
                className="px-8 py-6 text-lg border-2 border-slate-700"
              >
                Create Another
              </Button>
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
              >
                Export as PDF
                <span className="ml-2">📄</span>
              </Button>
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                Save Character
                <span className="ml-2">💾</span>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
