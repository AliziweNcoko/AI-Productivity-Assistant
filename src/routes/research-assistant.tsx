import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, Copy, Check, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";
import { summarizeResearch } from "@/lib/research.functions";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant · CAPACITI" },
      { name: "description", content: "Summarize articles, extract insights, and simplify complex information for your CAPACITI projects." },
    ],
  }),
  component: ResearchAssistant,
});

type ResearchResult = {
  summary: string;
  keyInsights: string[];
  recommendations: string[];
  simplifiedExplanation: string;
};

function ResearchAssistant() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const doSummarize = useServerFn(summarizeResearch);

  async function handleSubmit() {
    if (!content.trim()) {
      toast.error("Please paste some text to analyze");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const output = await doSummarize({ data: { content: content.trim() } });
      setResult(output);
      toast.success("Research analysis complete");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(text: string, field: string) {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-navy grid place-items-center shadow-soft shrink-0">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
            AI Research Assistant
          </h1>
          <p className="text-muted-foreground mt-1">
            Paste an article, report, or topic and get a clear summary with key insights.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-3xl space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              What would you like to analyze?
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste an article, report, or describe a topic you need help understanding..."
              className="min-h-[280px] rounded-2xl text-base leading-relaxed"
            />
            <p className="text-xs text-muted-foreground">
              Tip: Paste up to ~3,000 words for best results.
            </p>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading || !content.trim()}
            className="w-full rounded-full bg-gradient-purple hover:opacity-90 text-white font-semibold gap-2 h-12"
            size="lg"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
            {loading ? "Analyzing..." : "Analyze with AI"}
          </Button>
        </Card>

        <div className="space-y-4">
          {result ? (
            <>
              <ResultCard
                title="Summary"
                text={result.summary}
                onCopy={() => copyToClipboard(result.summary, "summary")}
                copied={copiedField === "summary"}
              />
              <ResultCard
                title="Key Insights"
                text={result.keyInsights.join("\n")}
                bullets={result.keyInsights}
                onCopy={() => copyToClipboard(result.keyInsights.join("\n"), "insights")}
                copied={copiedField === "insights"}
              />
              <ResultCard
                title="Recommendations"
                text={result.recommendations.join("\n")}
                bullets={result.recommendations}
                onCopy={() => copyToClipboard(result.recommendations.join("\n"), "recommendations")}
                copied={copiedField === "recommendations"}
              />
              <ResultCard
                title="Simplified Explanation"
                text={result.simplifiedExplanation}
                onCopy={() => copyToClipboard(result.simplifiedExplanation, "simple")}
                copied={copiedField === "simple"}
              />
            </>
          ) : (
            <Card className="p-10 rounded-3xl text-center text-muted-foreground border-dashed flex flex-col items-center justify-center min-h-[320px]">
              <div className="h-12 w-12 rounded-2xl bg-muted grid place-items-center mb-4">
                <Sparkles className="h-6 w-6 text-muted-foreground/60" />
              </div>
              <p className="font-medium text-foreground mb-1">Ready to analyze</p>
              <p className="text-sm max-w-xs">
                Paste content on the left and hit "Analyze with AI" to get your summary, insights, and recommendations.
              </p>
            </Card>
          )}
        </div>
      </div>

      <ResponsibleAINotice />
    </div>
  );
}

function ResultCard({
  title,
  text,
  bullets,
  onCopy,
  copied,
}: {
  title: string;
  text: string;
  bullets?: string[];
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <Card className="p-5 rounded-3xl shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-foreground">{title}</h3>
        <Button
          onClick={onCopy}
          variant="ghost"
          size="sm"
          className="rounded-full gap-1.5 text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      {bullets ? (
        <ul className="space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{text}</p>
      )}
    </Card>
  );
}
