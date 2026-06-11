import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Heart, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";
import { wellnessCoach } from "@/lib/coach.functions";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "Wellness Check-In · CAPACITI" },
      { name: "description", content: "Daily mood check-in with AI-powered support." },
    ],
  }),
  component: Wellness,
});

type Mood = "great" | "good" | "okay" | "struggling";
const OPTIONS: { mood: Mood; emoji: string; label: string }[] = [
  { mood: "great", emoji: "😊", label: "Great" },
  { mood: "good", emoji: "🙂", label: "Good" },
  { mood: "okay", emoji: "😐", label: "Okay" },
  { mood: "struggling", emoji: "😔", label: "Struggling" },
];

type Result = {
  encouragement: string;
  productivityAdvice: string[];
  studyTips: string[];
  supportRecommendations: string[];
};

type HistoryEntry = { date: string; mood: Mood };

function Wellness() {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<Mood | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const run = useServerFn(wellnessCoach);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("capaciti.wellness");
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  async function pick(mood: Mood) {
    setLoading(mood);
    setResult(null);
    try {
      const out = await run({ data: { mood } });
      setResult(out);
      const entry = { date: new Date().toISOString(), mood };
      const next = [entry, ...history].slice(0, 30);
      setHistory(next);
      localStorage.setItem("capaciti.wellness", JSON.stringify(next));
    } catch (e) {
      console.error(e);
      toast.error("Could not load support. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-purple grid place-items-center shadow-soft shrink-0">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Daily Wellness Check-In</h1>
          <p className="text-muted-foreground mt-1">How are you feeling today?</p>
        </div>
      </div>

      <Card className="p-6 rounded-3xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {OPTIONS.map((o) => (
            <Button
              key={o.mood}
              onClick={() => pick(o.mood)}
              disabled={loading !== null}
              variant="outline"
              className="h-28 rounded-3xl flex-col gap-2 hover:border-purple hover:bg-purple/5"
            >
              {loading === o.mood ? <Loader2 className="h-6 w-6 animate-spin" /> : <span className="text-4xl">{o.emoji}</span>}
              <span className="text-sm font-semibold">{o.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {result && (
        <Card className="p-6 rounded-3xl space-y-5 shadow-soft">
          <div className="p-4 rounded-2xl bg-gradient-purple text-white">
            <p className="font-medium leading-relaxed">💜 {result.encouragement}</p>
          </div>
          <Bullets title="Productivity Advice" items={result.productivityAdvice} />
          <Bullets title="Study Tips" items={result.studyTips} />
          <Bullets title="Support Recommendations" items={result.supportRecommendations} />
        </Card>
      )}

      {history.length > 0 && (
        <Card className="p-6 rounded-3xl">
          <h3 className="font-display font-bold mb-3">Recent Check-Ins</h3>
          <div className="flex flex-wrap gap-2">
            {history.slice(0, 14).map((h, i) => {
              const emoji = OPTIONS.find((o) => o.mood === h.mood)?.emoji ?? "❓";
              return (
                <div key={i} className="px-3 py-1.5 rounded-full bg-muted text-sm flex items-center gap-1.5">
                  <span>{emoji}</span>
                  <span className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <ResponsibleAINotice />
    </div>
  );
}

function Bullets({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display font-bold mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple shrink-0" />{it}</li>
        ))}
      </ul>
    </div>
  );
}
