import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, AlertTriangle, Lock, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI · CAPACITI" },
      { name: "description", content: "How to use AI safely and effectively at CAPACITI." },
    ],
  }),
  component: ResponsibleAI,
});

function ResponsibleAI() {
  const [ack, setAck] = useState(false);
  useEffect(() => {
    setAck(localStorage.getItem("capaciti.ai-ack") === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("capaciti.ai-ack", String(ack));
  }, [ack]);

  return (
    <div className="px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-navy grid place-items-center shadow-soft shrink-0">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Responsible AI Centre</h1>
          <p className="text-muted-foreground mt-1">Use AI to accelerate your learning — safely and ethically.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 rounded-3xl space-y-3 border-success/30 bg-success/5">
          <div className="h-10 w-10 rounded-2xl bg-success/20 grid place-items-center">
            <Sparkles className="h-5 w-5 text-success" />
          </div>
          <h3 className="font-display font-bold">What AI Can Do</h3>
          <ul className="text-sm space-y-1.5">
            {["Assist learning", "Generate drafts", "Summarize information", "Recommend resources"].map((i) => (
              <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-success shrink-0 mt-0.5" />{i}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 rounded-3xl space-y-3 border-warning/30 bg-warning/5">
          <div className="h-10 w-10 rounded-2xl bg-warning/20 grid place-items-center">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <h3 className="font-display font-bold">Limitations</h3>
          <ul className="text-sm space-y-1.5">
            {["AI can make mistakes", "AI may provide outdated information", "Outputs should always be verified", "Human review is required"].map((i) => (
              <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warning shrink-0" />{i}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 rounded-3xl space-y-3 border-destructive/30 bg-destructive/5">
          <div className="h-10 w-10 rounded-2xl bg-destructive/20 grid place-items-center">
            <Lock className="h-5 w-5 text-destructive" />
          </div>
          <h3 className="font-display font-bold">Privacy Guidance</h3>
          <ul className="text-sm space-y-1.5">
            {["Never upload passwords", "Never upload ID numbers", "Never upload banking information", "Protect personal information"].map((i) => (
              <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />{i}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6 rounded-3xl bg-gradient-navy text-white">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={ack}
            onCheckedChange={(v) => setAck(v === true)}
            className="mt-1 border-white data-[state=checked]:bg-white data-[state=checked]:text-navy"
          />
          <span className="text-sm leading-relaxed">
            I understand that AI-generated content must be reviewed before use.
          </span>
        </label>
        {ack && <p className="mt-3 text-xs text-white/70">✓ Acknowledgement saved on this device.</p>}
      </Card>
    </div>
  );
}
