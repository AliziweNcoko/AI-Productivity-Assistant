import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, Loader2, Sparkles, Copy, Check, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";
import { generateStudyPlan } from "@/lib/coach.functions";

export const Route = createFileRoute("/study-planner")({
  head: () => ({
    meta: [
      { title: "Study Planner · CAPACITI" },
      { name: "description", content: "Generate a personalised study schedule and revision plan." },
    ],
  }),
  component: StudyPlanner,
});

type Plan = {
  dailySchedule: { day: string; focus: string; hours: number }[];
  revisionPlan: string[];
  priorityAreas: string[];
  timeManagementTips: string[];
};

function StudyPlanner() {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("2");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const run = useServerFn(generateStudyPlan);

  async function handleSubmit() {
    if (!subject.trim() || !date) {
      toast.error("Please fill in subject and assessment date");
      return;
    }
    setLoading(true);
    setPlan(null);
    try {
      const out = await run({
        data: { subject: subject.trim(), assessmentDate: date, hoursPerDay: Number(hours) },
      });
      setPlan(out);
    } catch (e) {
      console.error(e);
      toast.error("Could not generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function formatPlan(p: Plan) {
    return `STUDY PLAN — ${subject}
Assessment: ${date} · ${hours}h/day

DAILY SCHEDULE
${p.dailySchedule.map((d) => `• ${d.day} (${d.hours}h): ${d.focus}`).join("\n")}

REVISION PLAN
${p.revisionPlan.map((r) => `• ${r}`).join("\n")}

PRIORITY AREAS
${p.priorityAreas.map((r) => `• ${r}`).join("\n")}

TIME MANAGEMENT TIPS
${p.timeManagementTips.map((r) => `• ${r}`).join("\n")}
`;
  }

  async function copy() {
    if (!plan) return;
    await navigator.clipboard.writeText(formatPlan(plan));
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    if (!plan) return;
    const blob = new Blob([formatPlan(plan)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `study-plan-${subject.replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-navy grid place-items-center shadow-soft shrink-0">
          <CalendarDays className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Study Planner</h1>
          <p className="text-muted-foreground mt-1">Get a structured plan tailored to your assessment.</p>
        </div>
      </div>

      <Card className="p-6 rounded-3xl space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3 space-y-2">
            <label className="text-sm font-medium">Subject / Topic</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Machine Learning Basics" className="rounded-2xl h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Assessment Date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-2xl h-11" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Hours per day</label>
            <Input type="number" min={0.5} max={16} step={0.5} value={hours} onChange={(e) => setHours(e.target.value)} className="rounded-2xl h-11" />
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={loading} className="w-full rounded-full h-12 bg-gradient-purple text-white gap-2" size="lg">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
          Generate Plan
        </Button>
      </Card>

      {plan && (
        <Card className="p-6 rounded-3xl space-y-5 shadow-soft">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-display font-bold">Your Plan</h2>
            <div className="flex gap-2">
              <Button onClick={copy} variant="outline" size="sm" className="rounded-full gap-1.5">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy
              </Button>
              <Button onClick={download} variant="outline" size="sm" className="rounded-full gap-1.5">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </div>

          <Section title="Daily Schedule">
            <ul className="space-y-2">
              {plan.dailySchedule.map((d, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-muted/60">
                  <span className="font-semibold text-purple shrink-0 min-w-[110px]">{d.day}</span>
                  <span className="flex-1 text-sm">{d.focus}</span>
                  <span className="text-xs font-mono bg-card px-2 py-1 rounded-full">{d.hours}h</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Revision Plan" items={plan.revisionPlan} />
          <Section title="Priority Areas" items={plan.priorityAreas} />
          <Section title="Time Management Tips" items={plan.timeManagementTips} />
        </Card>
      )}

      <ResponsibleAINotice />
    </div>
  );
}

function Section({ title, items, children }: { title: string; items?: string[]; children?: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display font-bold mb-2">{title}</h3>
      {children ?? (
        <ul className="space-y-2">
          {items?.map((it, i) => (
            <li key={i} className="flex gap-2 text-sm"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple shrink-0" />{it}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
