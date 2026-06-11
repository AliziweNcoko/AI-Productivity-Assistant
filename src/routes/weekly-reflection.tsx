import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { NotebookPen, Loader2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";
import { generateReflection } from "@/lib/coach.functions";

export const Route = createFileRoute("/weekly-reflection")({
  head: () => ({
    meta: [
      { title: "Weekly Reflection · CAPACITI" },
      { name: "description", content: "Reflect on your week and set goals with AI coaching." },
    ],
  }),
  component: WeeklyReflection,
});

type Result = {
  summary: string;
  strengths: string[];
  areasForImprovement: string[];
  actionPlan: string[];
};

function WeeklyReflection() {
  const [wentWell, setWent] = useState("");
  const [challenges, setCh] = useState("");
  const [learned, setLearned] = useState("");
  const [goals, setGoals] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const run = useServerFn(generateReflection);

  async function submit() {
    if (!wentWell || !challenges || !learned || !goals) {
      toast.error("Please answer all four prompts");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const out = await run({ data: { wentWell, challenges, learned, goals } });
      setResult(out);
    } catch (e) {
      console.error(e);
      toast.error("Could not generate reflection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-purple grid place-items-center shadow-soft shrink-0">
          <NotebookPen className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Weekly Reflection Coach</h1>
          <p className="text-muted-foreground mt-1">Take a moment to look back, then plan the week ahead.</p>
        </div>
      </div>

      <Card className="p-6 rounded-3xl space-y-4">
        <Field label="What went well this week?" value={wentWell} onChange={setWent} />
        <Field label="What challenges did you face?" value={challenges} onChange={setCh} />
        <Field label="What did you learn?" value={learned} onChange={setLearned} />
        <Field label="What are your goals for next week?" value={goals} onChange={setGoals} />
        <Button onClick={submit} disabled={loading} className="w-full rounded-full h-12 bg-gradient-purple text-white gap-2" size="lg">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
          Reflect with AI
        </Button>
      </Card>

      {result && (
        <Card className="p-6 rounded-3xl space-y-5 shadow-soft">
          <div>
            <h3 className="font-display font-bold mb-2">Reflection Summary</h3>
            <p className="text-sm leading-relaxed">{result.summary}</p>
          </div>
          <Bullets title="Strengths Identified" items={result.strengths} color="bg-success" />
          <Bullets title="Areas for Improvement" items={result.areasForImprovement} color="bg-warning" />
          <Bullets title="Action Plan for Next Week" items={result.actionPlan} color="bg-purple" />
        </Card>
      )}

      <ResponsibleAINotice />
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} className="min-h-[90px] rounded-2xl" />
    </div>
  );
}

function Bullets({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div>
      <h3 className="font-display font-bold mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm"><span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${color} shrink-0`} />{it}</li>
        ))}
      </ul>
    </div>
  );
}
