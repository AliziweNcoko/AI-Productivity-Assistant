import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClipboardCheck, Copy, Check, Send, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";

export const Route = createFileRoute("/daily-report")({
  head: () => ({
    meta: [
      { title: "Daily Report to Managers · CAPACITI" },
      {
        name: "description",
        content:
          "Send a clear, professional end-of-day status report to your CAPACITI Day Manager in seconds.",
      },
    ],
  }),
  component: DailyReport,
});

const managers = [
  { id: "omphile", name: "Omphile" },
  { id: "brandon", name: "Brandon" },
  { id: "thandiwe", name: "Thandiwe" },
  { id: "sive", name: "Sive" },
];

const days = [
  { id: 1, label: "Day 1 · Research & Planning" },
  { id: 2, label: "Day 2 · Development Phase 1" },
  { id: 3, label: "Day 3 · Development Phase 2" },
  { id: 4, label: "Day 4 · Optimization & Responsible AI" },
  { id: 5, label: "Day 5 · Presentation & Demo" },
];

type Status = "on" | "help" | "behind";
const statuses: { id: Status; emoji: string; label: string; ring: string }[] = [
  { id: "on", emoji: "🟢", label: "On Track", ring: "ring-success" },
  { id: "help", emoji: "🟡", label: "Need Help", ring: "ring-warning" },
  { id: "behind", emoji: "🔴", label: "Behind Schedule", ring: "ring-red" },
];

function DailyReport() {
  const [studentName, setStudentName] = useState("Aliziwe");
  const [manager, setManager] = useState("omphile");
  const [day, setDay] = useState(3);
  const [status, setStatus] = useState<Status>("on");
  const [accomplishments, setAccomplishments] = useState("");
  const [blockers, setBlockers] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [copied, setCopied] = useState(false);

  const managerName = managers.find((m) => m.id === manager)?.name ?? "Manager";
  const dayLabel = days.find((d) => d.id === day)?.label ?? "";
  const statusMeta = statuses.find((s) => s.id === status)!;

  const report = useMemo(() => {
    const lines = [
      `Hi ${managerName},`,
      ``,
      `Here is my end-of-day check-in for ${dayLabel}.`,
      ``,
      `Status: ${statusMeta.emoji} ${statusMeta.label}`,
      ``,
      `What I accomplished today:`,
      bulletize(accomplishments) || "• (please add what you worked on)",
      ``,
      `Blockers / where I need support:`,
      bulletize(blockers) || (status === "on" ? "• None — all clear." : "• (please describe your blockers)"),
      ``,
      `My plan for tomorrow:`,
      bulletize(nextSteps) || "• (please add your next steps)",
      ``,
      `Thank you,`,
      studentName || "Student",
    ];
    return lines.join("\n");
  }, [managerName, dayLabel, statusMeta, accomplishments, blockers, nextSteps, status, studentName]);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      toast.success("Report copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please select and copy manually");
    }
  }

  function emailReport() {
    const subject = encodeURIComponent(
      `${dayLabel} check-in — ${statusMeta.label} — ${studentName || "Student"}`,
    );
    const body = encodeURIComponent(report);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-navy grid place-items-center shadow-soft shrink-0">
          <ClipboardCheck className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
            Daily Report to Managers
          </h1>
          <p className="text-muted-foreground mt-1">
            Tell us how today went — we'll turn it into a clear update for your Day Manager.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-3xl space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label>Send to</Label>
              <Select value={manager} onValueChange={setManager}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {managers.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Which day are you reporting on?</Label>
            <Select value={String(day)} onValueChange={(v) => setDay(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem key={d.id} value={String(d.id)}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>How are you doing today?</Label>
            <div className="grid sm:grid-cols-3 gap-3">
              {statuses.map((s) => {
                const active = s.id === status;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStatus(s.id)}
                    className={`p-4 rounded-2xl border bg-card text-left transition-all ${
                      active
                        ? `border-transparent ring-2 ${s.ring} shadow-soft`
                        : "border-border hover:border-purple/40"
                    }`}
                  >
                    <div className="text-2xl">{s.emoji}</div>
                    <div className="mt-1 font-display font-bold text-foreground text-sm">{s.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accomplishments">What did you accomplish today?</Label>
            <Textarea
              id="accomplishments"
              rows={3}
              value={accomplishments}
              onChange={(e) => setAccomplishments(e.target.value)}
              placeholder="e.g. Finished the login flow, added Supabase auth, fixed the sidebar layout..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blockers">Any blockers or things you need help with?</Label>
            <Textarea
              id="blockers"
              rows={3}
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
              placeholder="e.g. Stuck on RLS policies, internet was down for 2 hours..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="next">What's your plan for tomorrow?</Label>
            <Textarea
              id="next"
              rows={3}
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              placeholder="e.g. Build the dashboard, connect the API, start the demo script..."
            />
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 rounded-3xl bg-gradient-hero text-white shadow-glow">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-2xl bg-white/15 grid place-items-center backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">Your Report</p>
                <h3 className="font-display font-bold text-xl">Ready to send to {managerName}</h3>
              </div>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/95 bg-white/10 rounded-2xl p-4 backdrop-blur max-h-[420px] overflow-auto">
              {report}
            </pre>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                onClick={copyReport}
                className="flex-1 bg-white text-navy hover:bg-white/90 font-semibold"
                size="lg"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy report"}
              </Button>
              <Button
                onClick={emailReport}
                variant="outline"
                size="lg"
                className="flex-1 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Open in email
              </Button>
            </div>
          </Card>

          <ResponsibleAINotice />
        </div>
      </div>
    </div>
  );
}

function bulletize(text: string): string {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (l.startsWith("•") || l.startsWith("-") ? l.replace(/^-/, "•") : `• ${l}`))
    .join("\n");
}
