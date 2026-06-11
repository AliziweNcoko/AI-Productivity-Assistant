import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, TrendingUp, ClipboardCheck, Wrench, BookOpen, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";

export const Route = createFileRoute("/manager-insights")({
  head: () => ({
    meta: [
      { title: "Manager Insights · CAPACITI" },
      { name: "description", content: "Programme-wide insights for Day Managers." },
    ],
  }),
  component: ManagerInsights,
});

const attendanceTrend = [78, 82, 85, 84, 88, 91, 87];

function ManagerInsights() {
  const max = Math.max(...attendanceTrend);
  const avg = Math.round(attendanceTrend.reduce((a, b) => a + b, 0) / attendanceTrend.length);

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-navy grid place-items-center shadow-soft shrink-0">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Manager Insights</h1>
          <p className="text-muted-foreground mt-1">Cohort overview at a glance.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={TrendingUp} label="Avg Attendance" value={`${avg}%`} progress={avg} />
        <Stat icon={ClipboardCheck} label="Daily Reports" value="42 / 48" progress={(42 / 48) * 100} />
        <Stat icon={Wrench} label="AI Tool Usage" value="128 sessions" progress={75} />
        <Stat icon={BookOpen} label="Research Analyses" value="63" progress={60} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-3xl shadow-soft">
          <h3 className="font-display font-bold mb-1">Attendance Trend (last 7 days)</h3>
          <p className="text-xs text-muted-foreground mb-4">Cohort daily attendance %</p>
          <div className="flex items-end gap-2 h-40">
            {attendanceTrend.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-xl bg-gradient-purple"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">D{i + 1}</span>
                <span className="text-xs font-mono">{v}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 rounded-3xl shadow-soft">
          <h3 className="font-display font-bold mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-purple" /> Wellness Check-In Summary
          </h3>
          <div className="space-y-3">
            {[
              { emoji: "😊", label: "Great", pct: 35, color: "bg-success" },
              { emoji: "🙂", label: "Good", pct: 40, color: "bg-purple" },
              { emoji: "😐", label: "Okay", pct: 18, color: "bg-warning" },
              { emoji: "😔", label: "Struggling", pct: 7, color: "bg-destructive" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{m.emoji} {m.label}</span>
                  <span className="font-mono">{m.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <ResponsibleAINotice />
    </div>
  );
}

function Stat({ icon: Icon, label, value, progress }: { icon: any; label: string; value: string; progress: number }) {
  return (
    <Card className="p-5 rounded-3xl shadow-soft space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-purple" />
      </div>
      <p className="text-2xl font-display font-extrabold">{value}</p>
      <Progress value={progress} className="h-1.5" />
    </Card>
  );
}
