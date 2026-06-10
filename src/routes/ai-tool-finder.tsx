import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Wrench, Copy, Check, Sparkles, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";

export const Route = createFileRoute("/ai-tool-finder")({
  head: () => ({
    meta: [
      { title: "AI Tool Finder · CAPACITI" },
      { name: "description", content: "Describe what you need — we'll recommend the right AI tool with a starter prompt." },
    ],
  }),
  component: AIToolFinder,
});

type Tool = {
  name: string;
  url: string;
  why: string;
  prompt: string;
  accent: string;
};

const RULES: { match: RegExp; tools: Tool[] }[] = [
  {
    match: /slide|deck|presentation|pitch/i,
    tools: [
      { name: "Gamma", url: "https://gamma.app", accent: "bg-gradient-purple", why: "Generates polished, on-brand slide decks from a short prompt — perfect for Day 5 demos.", prompt: "Create a 6-slide pitch deck for my CAPACITI project. Audience: judges & peers. Include: problem, target user, solution, demo screenshot, AI ethics considerations, next steps." },
    ],
  },
  {
    match: /\bui\b|design|figma|landing|website|frontend/i,
    tools: [
      { name: "Lovable", url: "https://lovable.dev", accent: "bg-gradient-purple", why: "Spins up a working React UI from a description — fastest path to a clickable prototype.", prompt: "Build a mobile-first landing page for [your project]. Use CAPACITI brand colors (navy, purple, red). Include hero, 3 feature cards, and a sign-up form." },
    ],
  },
  {
    match: /code|bug|error|function|api|backend|debug|typescript|python/i,
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com", accent: "bg-[linear-gradient(135deg,var(--purple),var(--navy))]", why: "Great all-rounder for code generation, refactors and explaining errors.", prompt: "I'm getting this error: [paste error]. Here's the relevant code: [paste code]. Explain the root cause and give me the smallest possible fix." },
      { name: "Claude", url: "https://claude.ai", accent: "bg-[linear-gradient(135deg,var(--red),var(--purple))]", why: "Excellent at reading long files and producing careful, well-explained refactors.", prompt: "Review this file for bugs, unsafe patterns and quick wins. Return a prioritised list, then the rewritten file." },
    ],
  },
  {
    match: /research|find|sources|cite|paper|article|reference/i,
    tools: [
      { name: "Perplexity", url: "https://perplexity.ai", accent: "bg-gradient-navy", why: "Cited, up-to-date answers — much safer for research than vanilla chatbots.", prompt: "Give me a 5-bullet briefing on [topic], with sources from the last 12 months. End with 3 open questions worth investigating." },
    ],
  },
  {
    match: /image|logo|illustration|graphic|picture|art/i,
    tools: [
      { name: "Midjourney", url: "https://midjourney.com", accent: "bg-[linear-gradient(135deg,var(--red),var(--purple))]", why: "Best-in-class for stylised brand visuals, hero images and illustrations.", prompt: "Modern, minimal hero illustration for an AI study companion app. CAPACITI palette: deep navy, vibrant red, royal purple. Geometric, soft shadows, flat shapes." },
    ],
  },
  {
    match: /write|email|copy|blog|content|caption|essay/i,
    tools: [
      { name: "Claude", url: "https://claude.ai", accent: "bg-gradient-purple", why: "Produces warm, well-structured long-form writing with strong tone control.", prompt: "Write a friendly LinkedIn post (under 150 words) about what I learned today on the CAPACITI programme. Tone: confident, humble, specific. No hashtags." },
    ],
  },
];

const FALLBACK: Tool[] = [
  { name: "ChatGPT", url: "https://chat.openai.com", accent: "bg-gradient-purple", why: "Strong general-purpose AI assistant — a safe first stop for most tasks.", prompt: "I'm working on the CAPACITI AI Skills Accelerator. I need help with: [describe task]. Ask me 3 clarifying questions first, then propose a plan." },
  { name: "Perplexity", url: "https://perplexity.ai", accent: "bg-gradient-navy", why: "Use this when you need answers with real citations.", prompt: "Briefly explain [topic] for someone learning it for the first time. Include sources." },
];

const EXAMPLES = [
  "I need to create slides",
  "I need a UI",
  "I need help with code",
  "I need research",
  "I need an image for my app",
];

function AIToolFinder() {
  const [query, setQuery] = useState("");

  const results = useMemo<Tool[]>(() => {
    if (!query.trim()) return [];
    const hit = RULES.find((r) => r.match.test(query));
    return hit ? hit.tools : FALLBACK;
  }, [query]);

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,var(--red),var(--purple))] grid place-items-center shadow-soft shrink-0">
          <Wrench className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">AI Tool Finder</h1>
          <p className="text-muted-foreground mt-1">Describe what you need — we'll recommend the best AI tool and a starter prompt.</p>
        </div>
      </div>

      <Card className="p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2 focus-within:border-purple transition">
          <Sparkles className="h-5 w-5 text-purple" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. I need to design slides for my final demo"
            className="border-0 shadow-none focus-visible:ring-0 text-base h-12"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((e) => (
            <button
              key={e}
              onClick={() => setQuery(e)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/70 transition"
            >
              {e}
            </button>
          ))}
        </div>
      </Card>

      {results.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {results.map((t) => (
            <ToolCard key={t.name} tool={t} />
          ))}
        </div>
      ) : (
        <Card className="p-10 rounded-3xl text-center text-muted-foreground border-dashed">
          Start typing above or tap an example to get a tool recommendation.
        </Card>
      )}

      <ResponsibleAINotice />
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(tool.prompt);
    setCopied(true);
    toast.success(`Starter prompt for ${tool.name} copied`);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Card className="p-6 rounded-3xl space-y-4 shadow-soft hover:shadow-glow transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 rounded-2xl ${tool.accent} grid place-items-center text-white font-display font-bold text-lg`}>
            {tool.name[0]}
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">{tool.name}</h3>
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-purple hover:underline inline-flex items-center gap-1"
            >
              Visit <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground">Why this tool: </span>
        {tool.why}
      </p>

      <div className="rounded-2xl bg-muted/60 p-4 text-sm text-foreground border border-border">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Starter prompt</p>
        <p className="leading-relaxed">{tool.prompt}</p>
      </div>

      <Button onClick={copy} className="w-full rounded-full bg-navy hover:bg-navy/90 text-white gap-2">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy starter prompt"}
      </Button>
    </Card>
  );
}
