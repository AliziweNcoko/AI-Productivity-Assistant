import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ShieldAlert, Loader2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";
import { predictAttendanceRisk } from "@/lib/coach.functions";

export const Route = createFileRoute("/attendance-risk")({
  head: () => ({
    meta: [
      { title: "Attendance Risk Predictor · CAPACITI" },
      { name: "description", content: "Predict attendance-related risk and get recommended actions." },
    ],
  }),
  component: AttendanceRisk,
});

type Result = {
  riskLevel: "low" | "medium" | "high";
  explanation: string;
  recommendedActions: string[];
  motivationalMessage: string;
};

const RISK_STYLES: Record<Result["riskLevel"], { label: string; ring: string; bg: string; dot: string }> = {
  low: { label: "Low Risk", ring: "border-success/40", bg: "bg-success/10", dot: "bg-success" },
  medium: { label: "Medium Risk", ring: "border-warning/40", bg: "bg-warning/15", dot: "bg-warning" },
  high: { label: "High Risk", ring: "border-destructive/40", bg: "bg-destructive/10", dot: "bg-destructive" },
};

function AttendanceRisk() {
  const [attendance, setAttendance] = useState("85");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const run = useServerFn(predictAttendanceRisk);

  async function handleSubmit() {
    const n = Number(attendance);
    if (Number.isNaN(n) || n < 0 || n > 100) {
      toast.error("Enter attendance between 0 and 100");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const out = await run({ data: { attendance: n } });
      setResult(out);
    } catch (e) {
      console.error(e);
      toast.error("Could not analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const styles = result ? RISK_STYLES[result.riskLevel] : null;

  return (
    <div className="px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-purple grid place-items-center shadow-soft shrink-0">
          <ShieldAlert className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Attendance Risk Predictor</h1>
          <p className="text-muted-foreground mt-1">Find out where you stand and what to do next.</p>
        </div>
      </div>

      <Card className="p-6 rounded-3xl space-y-4">
        <label className="text-sm font-medium">Attendance Percentage</label>
        <div className="flex gap-3">
          <Input
            type="number"
            min={0}
            max={100}
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="rounded-2xl h-12 text-base"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading}
            size="lg"
            className="rounded-full bg-gradient-purple text-white gap-2 h-12 px-6"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            Analyze
          </Button>
        </div>
      </Card>

      {result && styles && (
        <Card className={`rounded-3xl border-2 ${styles.ring} ${styles.bg} p-6 space-y-5 shadow-soft`}>
          <div className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${styles.dot}`} />
            <h2 className="text-xl font-display font-bold">{styles.label}</h2>
          </div>
          <p className="text-foreground leading-relaxed">{result.explanation}</p>
          <div>
            <h3 className="font-semibold mb-2">Recommended Actions</h3>
            <ul className="space-y-2">
              {result.recommendedActions.map((a, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${styles.dot} shrink-0`} />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-4 rounded-2xl bg-card/80">
            <p className="text-sm italic text-foreground">💜 {result.motivationalMessage}</p>
          </Card>
        </Card>
      )}

      <ResponsibleAINotice />
    </div>
  );
}
