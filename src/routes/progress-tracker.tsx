import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LineChart, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";

export const Route = createFileRoute("/progress-tracker")({
  head: () => ({
    meta: [
      { title: "Progress Tracker · CAPACITI" },
      { name: "description", content: "Check in on your CAPACITI programme progress and get personalised coaching." },
    ],
  }),
  component: ProgressTracker,
});

const days = [
  { id: 1, title: "Day 1", subtitle: "Research & Planning" },
  { id: 2, title: "Day 2", subtitle: "Development Phase 1" },
  { id: 3, title: "Day 3", subtitle: "Development Phase 2" },
  { id: 4, title: "Day 4", subtitle: "Optimization & Responsible AI" },
  { id: 5, title: "Day 5", subtitle: "Presentation & Demo" },
];

type Status = "on" | "help" | "behind";
const statuses: { id: Status; emoji: string; label: string; ring: string }[] = [
  { id: "on", emoji: "🟢", label: "On Track", ring: "ring-success" },
  { id: "help", emoji: "🟡", label: "Need Help", ring: "ring-warning" },
  { id: "behind", emoji: "🔴", label: "Behind Schedule", ring: "ring-red" },
];

function ProgressTracker() {
  const [day, setDay] = useState(3);
  const [status, setStatus] = useState<Status>("on");
  const dayMeta = days.find((d) => d.id === day)!;

  const coaching = getCoaching(day, status);

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-navy grid place-items-center shadow-soft shrink-0">
          <LineChart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">Progress Tracker</h1>
          <p className="text-muted-foreground mt-1">Tell us where you are and how it's going — we'll coach you from there.</p>
        </div>
      </div>

      <Card className="p-6 rounded-3xl space-y-3">
        <h2 className="text-lg font-display font-bold text-foreground">Which day of the programme are you on?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {days.map((d) => {
            const active = d.id === day;
            return (
              <button
                key={d.id}
                onClick={() => setDay(d.id)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  active
                    ? "border-purple bg-gradient-purple text-white shadow-glow"
                    : "border-border bg-card hover:border-purple/40 hover:-translate-y-0.5"
                }`}
              >
                <div className={`text-xs uppercase tracking-wider ${active ? "text-white/80" : "text-muted-foreground"}`}>{d.title}</div>
                <div className={`mt-1 font-display font-bold ${active ? "text-white" : "text-foreground"}`}>{d.subtitle}</div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 rounded-3xl space-y-3">
        <h2 className="text-lg font-display font-bold text-foreground">How are you doing today?</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {statuses.map((s) => {
            const active = s.id === status;
            return (
              <button
                key={s.id}
                onClick={() => setStatus(s.id)}
                className={`p-5 rounded-2xl border bg-card text-left transition-all ${
                  active ? `border-transparent ring-2 ${s.ring} shadow-soft` : "border-border hover:border-purple/40"
                }`}
              >
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-2 font-display font-bold text-foreground">{s.label}</div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 rounded-3xl bg-gradient-hero text-white shadow-glow overflow-hidden relative">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/15 grid place-items-center backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">AI Coach</p>
            <h3 className="font-display font-bold text-xl">
              {dayMeta.title} · {dayMeta.subtitle}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-white/90 leading-relaxed whitespace-pre-line">{coaching}</p>
      </Card>

      <ResponsibleAINotice />
    </div>
  );
}

function getCoaching(day: number, status: Status): string {
  const intro: Record<Status, string> = {
    on: "Amazing — you're holding the pace. Here's how to keep momentum without burning out:",
    help: "Totally normal. The fastest way out of stuck is to name what's blocking you. Try this:",
    behind: "Take a breath — you can still land this. Let's shrink the scope and protect your energy:",
  };
  const tips: Record<number, string[]> = {
    1: [
      "Lock the problem statement to one sentence before opening any tools.",
      "List 3 must-have features and 3 nice-to-haves — protect the must-haves.",
      "Draft a tiny architecture sketch (5 boxes max) before coding.",
    ],
    2: [
      "Get an ugly end-to-end version working before polishing anything.",
      "Commit small. Push at least twice today.",
      "If a feature has eaten >45 minutes with no progress, swap to the next one.",
    ],
    3: [
      "Add the second core feature, then write one test or quick demo flow.",
      "Refactor only what hurts — don't rewrite working code.",
      "Take a 10-minute walk after lunch, your brain will thank you.",
    ],
    4: [
      "Run an honest Responsible AI pass: bias, privacy, hallucination, citations.",
      "Profile the slowest interaction and fix only that one.",
      "Write the README like a stranger will read it tomorrow.",
    ],
    5: [
      "Rehearse the demo twice end-to-end — no slides, just clicks.",
      "Open with the problem and the user, not the tech stack.",
      "Have a backup screenshot/video in case the live demo fails.",
    ],
  };
  const dayTips = tips[day].map((t) => `• ${t}`).join("\n");
  return `${intro[status]}\n\n${dayTips}`;
}
