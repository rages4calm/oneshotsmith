"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@oneshotsmith/ui";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Compass,
  Castle,
  Clipboard,
  FileDown,
  Flag,
  Gem,
  Ghost,
  KeyRound,
  LifeBuoy,
  Loader2,
  Map,
  Megaphone,
  RefreshCw,
  Timer,
  Save,
  Sparkles,
  Users,
  Check,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { generateOneShot } from "@oneshotsmith/core";
import type { OneShotTheme, CharacterLevel, Difficulty, TimeBox, OneShotPacket } from "@oneshotsmith/core";

const pacingBlueprint: Record<
  TimeBox,
  Array<{ id: string; label: string; minutes: number; core: string[] }>
> = {
  "2h": [
    {
      id: "hook",
      label: "Hook & Safety Check-in",
      minutes: 15,
      core: ["Run a quick vibe check and spotlight consent tool reminders.", "Drop the inciting incident immediately."],
    },
    {
      id: "approach",
      label: "Approach & Discovery",
      minutes: 30,
      core: ["Let players gather intel or scout the problem space.", "Set up the midpoint complication early."],
    },
    {
      id: "rising",
      label: "Rising Action",
      minutes: 35,
      core: ["Run the signature encounter or skill challenge.", "Track who hasn't had spotlight yet."],
    },
    {
      id: "climax",
      label: "Climax",
      minutes: 25,
      core: ["Trigger the twist beat and escalate the stakes.", "Keep initiative rounds brisk (90 seconds per turn)."],
    },
    {
      id: "wrap",
      label: "Wrap-up & Debrief",
      minutes: 15,
      core: ["Reward big choices with cinematic narration.", "Collect stars & wishes or highlight next steps."],
    },
  ],
  "3h": [
    {
      id: "hook",
      label: "Hook & Table Calibration",
      minutes: 20,
      core: ["Establish tone, boundaries, and win conditions.", "Surface personal stakes for at least two PCs."],
    },
    {
      id: "approach",
      label: "Investigation & Approach",
      minutes: 45,
      core: ["Offer meaningful choices between stealth, diplomacy, or force.", "Share an escalating clock or countdown timer."],
    },
    {
      id: "rising",
      label: "Escalation",
      minutes: 50,
      core: ["Deliver a set piece encounter or chase sequence.", "Hand out advantage for inventive play to keep momentum."],
    },
    {
      id: "climax",
      label: "Showdown",
      minutes: 40,
      core: ["Introduce the final complication tied to the twist.", "Spotlight player driven solutions before rolling dice."],
    },
    {
      id: "wrap",
      label: "Resolution & Epilogue",
      minutes: 25,
      core: ["Resolve outstanding NPC arcs or bargains.", "Invite players to narrate an epilogue snapshot."],
    },
  ],
  "4h": [
    {
      id: "hook",
      label: "Hook, Lines & Boundaries",
      minutes: 25,
      core: ["Layer in sensory details and foreshadow the villain.", "Clarify table expectations and pacing as a group."],
    },
    {
      id: "approach",
      label: "Investigation & Travel",
      minutes: 60,
      core: ["Alternate between exploration, roleplay, and light conflict.", "Seed clues that pay off during the finale."],
    },
    {
      id: "rising",
      label: "Escalation & Complications",
      minutes: 70,
      core: ["Run a tiered conflict or social duel.", "Rotate spotlight intentionally every 10 minutes."],
    },
    {
      id: "climax",
      label: "Finale",
      minutes: 55,
      core: ["Let the twist reshape the battlefield or objectives.", "Bring in dynamic terrain or environmental hazards."],
    },
    {
      id: "wrap",
      label: "Aftercare & Celebration",
      minutes: 30,
      core: ["Resolve outstanding threads and highlight player heroics.", "Close with table debrief or plug future adventures."],
    },
  ],
};

const themeOverlays: Partial<Record<OneShotTheme, Partial<Record<string, string>>>> = {
  Heist: {
    approach: "Offer flashback tokens to retroactively set up cons or gadgets.",
    climax: "Trigger security sweeps or rival thieves on a failed clock.",
  },
  Rescue: {
    approach: "Show glimpses of captives through whispered Sending or clues.",
    wrap: "Prompt rescued NPCs to thank specific heroes for spotlight beats.",
  },
  "Dungeon Sprint": {
    rising: "Lean into environmental hazards and collapsing architecture cues.",
    climax: "Reveal the necromancer or guardian adapting to player tactics.",
  },
  "Horror-Lite": {
    hook: "Use subtle sensory creep before the full supernatural reveal.",
    climax: "Offer bargains with the haunting entity for desperate leverage.",
  },
  "Travel Gauntlet": {
    approach: "Alternate between travel vignettes narrated by different players.",
    wrap: "Let the VIP deliver epilogue monologues or future requests.",
  },
};

const difficultyOverlays: Partial<Record<Difficulty, Partial<Record<string, string>>>> = {
  Hard: {
    rising: "Signal resource attrition: describe wounds, failing light, or rising heat.",
    climax: "Prep a backup escape valve so defeat still feels earned.",
  },
  Deadly: {
    approach: "Preview the opposition's calling card to justify high stakes.",
    climax: "Telegraph lethal moves a round early to reward smart play.",
  },
  Easy: {
    rising: "Add cinematic complications instead of extra hit points.",
    wrap: "Frame downtime scenes that reinforce character growth moments.",
  },
};

export default function OneShotGeneratorPage() {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState<OneShotTheme | null>(null);
  const [level, setLevel] = useState<CharacterLevel>(3);
  const [timebox, setTimebox] = useState<TimeBox>("3h");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [oneShot, setOneShot] = useState<OneShotPacket | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const storageKey = "oneshotsmith:saved-adventures";

  const themes: Array<{
    name: OneShotTheme;
    icon: LucideIcon;
    description: string;
    color: string;
  }> = [
    {
      name: "Heist",
      icon: KeyRound,
      description: "Steal an artifact, infiltrate, and escape.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Rescue",
      icon: LifeBuoy,
      description: "Save prisoners from bandits or cultists.",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Dungeon Sprint",
      icon: Castle,
      description: "Classic dungeon crawl with traps and monsters.",
      color: "from-slate-500 to-gray-600",
    },
    {
      name: "Horror-Lite",
      icon: Ghost,
      description: "Spooky mansion or haunted location.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "Travel Gauntlet",
      icon: Map,
      description: "Escort mission through dangerous terrain.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const pacingTips = useMemo(() => {
    const tips: string[] = [];
    if (timebox === "2h") {
      tips.push("Keep encounters to two set pieces; montage travel and downtime scenes.");
    } else if (timebox === "3h") {
      tips.push("Budget 60 minutes for Act II; flag a midpoint twist at the 90-minute mark.");
    } else {
      tips.push("Use the extra hour for roleplay spotlights or a skill challenge detour.");
    }

    if (difficulty === "Hard" || difficulty === "Deadly") {
      tips.push("Add battlefield gimmicks that telegraph danger early so players can react.");
    } else if (difficulty === "Easy") {
      tips.push("Lean into environmental hazards to keep tension without overwhelming the party.");
    }

    tips.push(`Prep milestone rewards that feel cinematic for level ${level} characters.`);
    return tips;
  }, [timebox, difficulty, level]);

  const spotlightIdeas = useMemo(() => {
    const ideas: Record<OneShotTheme, string[]> = {
      "Heist": [
        "Stage a flashback planning scene before the vault showdown.",
        "Give each character a signature gadget or disguise complication.",
      ],
      "Rescue": [
        "Foreshadow the prisoners with personal artifacts or whispered Sending spells.",
        "Introduce a moral dilemma: save civilians or secure the objective first?",
      ],
      "Dungeon Sprint": [
        "Use a countdown tracker for collapsing tunnels or rising lava.",
        "Reward creative trap solutions with momentum bonuses in the finale.",
      ],
      "Horror-Lite": [
        "Employ sensory cues to escalate dread without stalling play.",
        "Offer a bargain from a sinister patron when the party feels cornered.",
      ],
      "Travel Gauntlet": [
        "Let each player narrate a travel vignette that reveals personal stakes.",
        "Track resource attrition to make the destination feel hard-earned.",
      ],
    };
    return theme ? ideas[theme] : [];
  }, [theme]);
  const pacingPlan = useMemo(() => {
    const blueprint = pacingBlueprint[timebox];
    return blueprint.map((segment) => {
      const beats = [...segment.core];
      const themeOverlay = theme ? themeOverlays[theme]?.[segment.id] : undefined;
      if (themeOverlay) beats.push(themeOverlay);
      const difficultyOverlay = difficultyOverlays[difficulty]?.[segment.id];
      if (difficultyOverlay) beats.push(difficultyOverlay);
      return {
        ...segment,
        beats,
      };
    });
  }, [timebox, theme, difficulty]);
  const totalPacingMinutes = useMemo(
    () => pacingPlan.reduce((sum, segment) => sum + segment.minutes, 0),
    [pacingPlan]
  );
  const handleExportPacket = async () => {
    if (!oneShot) return;
    try {
      setIsExporting(true);
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = 20;

      const ensureSpace = (amount: number) => {
        if (y + amount > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
      };

      const addHeading = (title: string) => {
        ensureSpace(10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(title, 14, y);
        y += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
      };

      const addLine = (value: string) => {
        ensureSpace(6);
        const lines = doc.splitTextToSize(value, 176);
        lines.forEach((line: string) => {
          doc.text(line, 14, y);
          y += 6;
          ensureSpace(0);
        });
      };

      const addBulletList = (title: string, items: string[]) => {
        if (!items.length) return;
        addHeading(title);
        items.forEach((item) => addLine(`• ${item}`));
      };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(oneShot.title, 14, y);
      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      addLine(`Theme: ${theme} • Level ${level} • ${timebox} • ${difficulty}`);
      addLine(`Hook: ${oneShot.hook}`);

      addHeading("Three-Act Structure");
      addLine(`Act I: ${oneShot.actOne}`);
      addLine(`Act II: ${oneShot.actTwo}`);
      addLine(`Act III: ${oneShot.actThree}`);
      addLine(`Twist: ${oneShot.twist}`);
      addLine(`Finale: ${oneShot.finale}`);

      addHeading("Encounters");
      oneShot.encounters.forEach((encounter, index) => {
        addLine(`Encounter ${index + 1}: ${encounter.name} (Terrain: ${encounter.terrain}, XP: ${encounter.xp})`);
        addLine(`Summary: ${encounter.description}`);
        addLine(`Monsters: ${encounter.monsters.join(", ")}`);
      });

      addHeading("NPC Roster");
      oneShot.npcs.forEach((npc) => {
        addLine(`${npc.name} — Goal: ${npc.goal} | Quirk: ${npc.quirk}`);
        addLine(npc.description);
      });

      addHeading("Key Item");
      addLine(oneShot.keyItem);

      addBulletList("Treasure Parcels", oneShot.treasureParcels);
      addBulletList("Pacing Priorities", pacingTips);
      addBulletList("Spotlight Prompts", spotlightIdeas);

      const safeTitle = oneShot.title.replace(/\s+/g, "_") || "oneshot";
      doc.save(`${safeTitle}.pdf`);
      setFeedback({ type: "success", message: "GM packet exported. Check your downloads." });
      setTimeout(() => setFeedback(null), 4000);
    } catch (error) {
      console.error("Failed to export GM packet", error);
      setFeedback({ type: "error", message: "Export failed. Try again after refreshing." });
      setTimeout(() => setFeedback(null), 4000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveAdventure = () => {
    if (!oneShot) return;
    try {
      setIsSaving(true);
      const payload = {
        ...oneShot,
        difficulty,
        level,
        timebox,
        theme,
        savedAt: new Date().toISOString(),
        id: crypto.randomUUID(),
      };
      const existingRaw = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
      const existing: typeof payload[] = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [payload, ...existing].slice(0, 20);
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
      setFeedback({ type: "success", message: "Adventure saved locally. Your prep vault remembers it." });
      setTimeout(() => setFeedback(null), 4000);
    } catch (error) {
      console.error("Failed to save adventure", error);
      setFeedback({ type: "error", message: "Save failed. Browser storage may be disabled." });
      setTimeout(() => setFeedback(null), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyAdventure = async () => {
    if (!oneShot) return;
    try {
      setIsCopying(true);
      const summaryLines: string[] = [
        "OneShotsmith Adventure Summary",
        `Title: ${oneShot.title}`,
        `Theme: ${theme ?? "Custom"} • Level ${level} • ${timebox} • Difficulty ${difficulty}`,
        "",
        "Hook:",
        oneShot.hook,
        "",
        "Three-Act Structure:",
        `Act I: ${oneShot.actOne}`,
        `Act II: ${oneShot.actTwo}`,
        `Act III: ${oneShot.actThree}`,
        `Twist: ${oneShot.twist}`,
        `Finale: ${oneShot.finale}`,
        "",
        "Encounters:",
      ];

      oneShot.encounters.forEach((encounter, index) => {
        summaryLines.push(
          `Encounter ${index + 1}: ${encounter.name} (Terrain: ${encounter.terrain}, XP: ${encounter.xp})`,
          `  Summary: ${encounter.description}`,
          `  Monsters: ${encounter.monsters.join(", ")}`
        );
      });

      summaryLines.push("", "NPC Roster:");
      oneShot.npcs.forEach((npc) => {
        summaryLines.push(
          `${npc.name} — Goal: ${npc.goal}, Quirk: ${npc.quirk}`,
          `  ${npc.description}`
        );
      });

      summaryLines.push("", `Key Item: ${oneShot.keyItem}`);
      summaryLines.push("", "Treasure Parcels:", ...oneShot.treasureParcels.map((parcel) => `- ${parcel}`));

      if (pacingTips.length > 0) {
        summaryLines.push("", "Pacing Priorities:", ...pacingTips.map((tip) => `- ${tip}`));
      }

      if (spotlightIdeas.length > 0) {
        summaryLines.push("", "Spotlight Prompts:", ...spotlightIdeas.map((idea) => `- ${idea}`));
      }

      await navigator.clipboard.writeText(summaryLines.join("\n"));
      setFeedback({ type: "success", message: "Adventure summary copied to clipboard." });
      setTimeout(() => setFeedback(null), 4000);
    } catch (error) {
      console.error("Failed to copy adventure summary", error);
      setFeedback({ type: "error", message: "Copy failed. Browser permissions may block clipboard access." });
      setTimeout(() => setFeedback(null), 4000);
    } finally {
      setIsCopying(false);
    }
  };
  const handleGenerate = async () => {
    if (!theme) return;

    setFeedback(null);
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
    setFeedback(null);
    setIsExporting(false);
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" prefetch={false} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-purple-300" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                OneShotsmith
              </span>
            </Link>
            <Button variant="ghost" onClick={handleReset} className="text-slate-300">
              <ArrowRight className="mr-2 h-5 w-5 rotate-180" aria-hidden="true" />
                Back to Start
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
              {themes.map((t) => {
                const ThemeIcon = t.icon;
                return (
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
                      <div className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        <ThemeIcon className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-2xl text-white">
                        {t.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {t.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                disabled={!theme}
                className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 transition-all shadow-lg"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleCopyAdventure}
                disabled={isCopying}
                className="px-8 py-6 text-lg border-2 border-slate-700 bg-slate-900/60 hover:border-blue-500 hover:bg-blue-500/10 disabled:opacity-60"
              >
                {isCopying ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Copying...
                  </>
                ) : (
                  <>
                    Copy Summary
                    <Clipboard className="ml-2 h-5 w-5" aria-hidden="true" />
                  </>
                )}
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
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" aria-hidden="true" />
                Back
              </Button>
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 transition-all shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Adventure
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
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
                <Check className="h-4 w-4" aria-hidden="true" />
                Adventure Ready!
              </div>
            </div>

            {/* Hook */}
            <Card className="border-slate-700 bg-slate-900/70 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-purple-300" aria-hidden="true" />
                  The Hook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-slate-100 leading-relaxed">{oneShot.hook}</p>
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
                    <Flag className="h-4 w-4 text-purple-300" aria-hidden="true" />
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
                    <Megaphone className="h-4 w-4" aria-hidden="true" />
                    Finale Complication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{oneShot.finale}</p>
                </CardContent>
              </Card>
            </div>

            {/* Pacing Clock */}
            <Card className="border-blue-500/30 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Timer className="h-4 w-4 text-blue-300" aria-hidden="true" />
                  Session Pacing Clock ({totalPacingMinutes} minutes)
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Keep an eye on these timeboxes to land your finale on schedule. Adjust live if the table needs more
                  spotlight or breathing room.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {pacingPlan.map((segment) => (
                  <div key={segment.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-white">{segment.label}</span>
                      <span className="text-slate-400">{segment.minutes} min</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{
                          width: `${totalPacingMinutes > 0 ? Math.round((segment.minutes / totalPacingMinutes) * 100) : 0}%`,
                        }}
                      />
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                      {segment.beats.map((beat) => (
                        <li key={beat}>{beat}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Encounters */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Megaphone className="h-4 w-4" aria-hidden="true" />
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
                  <Users className="h-4 w-4 text-blue-300" aria-hidden="true" />
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
                    <Users className="h-4 w-4 text-blue-300" aria-hidden="true" />
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
                    <Gem className="h-4 w-4 text-yellow-400" aria-hidden="true" />
                    Treasure Parcels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {oneShot.treasureParcels.map((treasure, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <Gem className="h-4 w-4 text-yellow-400" aria-hidden="true" />
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
                <RefreshCw className="mr-2 h-5 w-5" aria-hidden="true" />
                Generate Another
              </Button>
              <Button
                size="lg"
                onClick={handleExportPacket}
                disabled={isExporting}
                className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-60"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Preparing Packet...
                  </>
                ) : (
                  <>
                    Export GM Packet
                    <FileDown className="ml-2 h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                onClick={handleSaveAdventure}
                disabled={isSaving}
                className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save Adventure
                    <Save className="ml-2 h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>

            {feedback && (
              <div
                className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                  feedback.type === "success"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                    : "border-red-500/40 bg-red-500/10 text-red-200"
                }`}
              >
                {feedback.message}
              </div>
            )}

            {(pacingTips.length > 0 || spotlightIdeas.length > 0) && (
              <Card className="border-blue-500/30 bg-slate-900/60">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Compass className="h-4 w-4 text-blue-300" aria-hidden="true" />
                    GM Prep Toolkit
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Quick table-ready beats to keep pacing sharp and spotlight every player.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  {pacingTips.length > 0 && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wide text-blue-300 mb-3">Pacing Priorities</h3>
                      <ul className="space-y-2 text-slate-200 text-sm">
                        {pacingTips.map((tip, index) => (
                          <li key={`pace-${index}`} className="flex items-start gap-2">
                            <span className="text-blue-400">{index + 1}.</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {spotlightIdeas.length > 0 && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wide text-purple-300 mb-3">Spotlight Prompts</h3>
                      <ul className="space-y-2 text-slate-200 text-sm">
                        {spotlightIdeas.map((idea, index) => (
                          <li key={`spotlight-${index}`} className="flex items-start gap-2">
                            <Sparkles className="text-purple-400 h-4 w-4" aria-hidden="true" />
                            <span>{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}





