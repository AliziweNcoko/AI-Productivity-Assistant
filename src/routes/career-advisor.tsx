import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Compass, Loader2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";
import { recommendCareer } from "@/lib/coach.functions";

export const Route = createFileRoute("/career-advisor")({
  head: () => ({
    meta: [
      { title: "Career Path Advisor · CAPACITI" },
      { name: "description", content: "Discover tech careers aligned with your skills and interests." },
    ],
  }),
  component: CareerAdvisor,
});

type CareerResult = {
  recommendedPaths: {
    title: string;
    whyItFits: string;
    requiredSkills: string[];
    learningResources: string[];
    nextSteps: string[];
  }[];
};

function CareerAdvisor() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [programme, setProgramme] = useState("CAPACITI AI Skills Accelerator");
  const [result, setResult] = useState<CareerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const run = useServerFn(recommendCareer);

  async function submit() {
    if (!skills || !interests) {
      toast.error("Tell us about your skills and interests");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const out = await run({ data: { skills, interests, programme } });
      setResult(out);
    } catch (e) {
      console.error(e);
      toast.error("Could not generate recommendations.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-navy grid place-items-center shadow-soft shrink-0">
          <Compass className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Career Path Advisor</h1>
          <p className="text-muted-foreground mt-1">Get personalised tech career suggestions.</p>
        </div>
      </div>

      <Card className="p-6 rounded-3xl space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Skills</label>
          <Textarea value={skills} onChange={(e) => setSkills(e.target.value)} className="rounded-2xl min-h-[80px]" placeholder="Python, problem solving, communication..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Interests</label>
          <Textarea value={interests} onChange={(e) => setInterests(e.target.value)} className="rounded-2xl min-h-[80px]" placeholder="Data, automation, building products..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Learning Programme</label>
          <Input value={programme} onChange={(e) => setProgramme(e.target.value)} className="rounded-2xl h-11" />
        </div>
        <Button onClick={submit} disabled={loading} className="w-full rounded-full h-12 bg-gradient-purple text-white gap-2" size="lg">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
          Recommend Careers
        </Button>
      </Card>

      {result && (
        <div className="grid md:grid-cols-3 gap-4">
          {result.recommendedPaths.map((p, i) => (
            <Card key={i} className="p-5 rounded-3xl shadow-soft space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-purple text-white grid place-items-center font-bold">{i + 1}</div>
              <h3 className="font-display font-bold text-lg">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.whyItFits}</p>
              <Mini title="Required Skills" items={p.requiredSkills} />
              <Mini title="Learning Resources" items={p.learningResources} />
              <Mini title="Next Steps" items={p.nextSteps} />
            </Card>
          ))}
        </div>
      )}

      <ResponsibleAINotice />
    </div>
  );
}

function Mini({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-purple mb-1">{title}</p>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="text-xs flex gap-1.5"><span className="mt-1 h-1 w-1 rounded-full bg-purple shrink-0" />{it}</li>
        ))}
      </ul>
    </div>
  );
}
