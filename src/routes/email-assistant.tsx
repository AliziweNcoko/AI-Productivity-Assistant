import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, Mail, Check, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";
import { toast } from "sonner";

export const Route = createFileRoute("/email-assistant")({
  head: () => ({
    meta: [
      { title: "Smart Email Assistant · CAPACITI" },
      { name: "description", content: "Generate polished emails to your CAPACITI Day Manager in seconds." },
    ],
  }),
  component: EmailAssistant,
});

const managers = ["Omphile", "Brandon", "Liyabona", "Other"];
const issues = [
  "Can't upload my work",
  "I don't understand today's delivery",
  "I will be late",
  "Tool access issue",
  "Loadshedding",
  "Code error / bug",
  "Personal emergency",
  "Internet connection problem",
];
const requestTypes = [
  "Generate an Email",
  "Request an Extension",
  "Ask for Help",
  "Give a Progress Update",
  "Report a Blocker",
] as const;
type Req = typeof requestTypes[number];

function EmailAssistant() {
  const [manager, setManager] = useState("Omphile");
  const [issue, setIssue] = useState(issues[0]);
  const [request, setRequest] = useState<Req>("Generate an Email");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);

  const email = useMemo(() => buildEmail({ manager, issue, request, details }), [manager, issue, request, details]);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <Header
        icon={<Mail className="h-6 w-6 text-white" />}
        title="Smart Email Assistant"
        subtitle="Pick your manager, the issue, and what you need — we'll draft it for you."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-3xl space-y-6">
          <Field label="Day Manager">
            <Chips options={managers} value={manager} onChange={setManager} />
          </Field>
          <Field label="What's going on?">
            <Chips options={issues} value={issue} onChange={setIssue} />
          </Field>
          <Field label="Request type">
            <Chips options={[...requestTypes]} value={request} onChange={(v) => setRequest(v as Req)} />
          </Field>
          <Field label="Add a few details (optional)">
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. My laptop battery died mid-task and I lost 45 minutes…"
              className="min-h-28 rounded-2xl"
            />
          </Field>
        </Card>

        <Card className="p-6 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Draft email</p>
              <h3 className="font-display font-bold text-lg text-foreground">To: {manager}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={copy} size="sm" className="rounded-full gap-2 bg-purple hover:bg-purple/90 text-white">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                onClick={() => {
                  const url = `https://teams.microsoft.com/l/chat/0/0?message=${encodeURIComponent(email)}`;
                  window.open(url, "_blank");
                }}
                size="sm"
                variant="outline"
                className="rounded-full gap-2 border-navy text-navy hover:bg-navy hover:text-white"
              >
                <TeamsIcon className="h-4 w-4" />
                Open in Teams
              </Button>
            </div>
          </div>
          <pre className="flex-1 whitespace-pre-wrap rounded-2xl bg-muted/60 p-5 text-sm leading-relaxed text-foreground font-sans">
{email}
          </pre>
          <div className="mt-4">
            <ResponsibleAINotice />
          </div>
        </Card>
      </div>

      <ResponsibleAINotice />
    </div>
  );
}

function Header({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 rounded-2xl bg-gradient-purple grid place-items-center shadow-soft shrink-0">{icon}</div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              active
                ? "bg-navy text-white border-navy shadow-soft"
                : "bg-card text-foreground border-border hover:border-purple/50 hover:bg-accent"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function buildEmail({ manager, issue, request, details }: { manager: string; issue: string; request: Req; details: string }) {
  const subjectMap: Record<Req, string> = {
    "Generate an Email": `Quick update regarding: ${issue}`,
    "Request an Extension": `Extension request — ${issue}`,
    "Ask for Help": `Help needed — ${issue}`,
    "Give a Progress Update": `Progress update — ${issue}`,
    "Report a Blocker": `Blocker report — ${issue}`,
  };
  const bodyMap: Record<Req, string> = {
    "Generate an Email": `I hope you're well. I wanted to share an update with you about today's session.\n\nIssue: ${issue}.`,
    "Request an Extension": `I hope you're well. I'd like to respectfully request a short extension on today's deliverable.\n\nReason: ${issue}.`,
    "Ask for Help": `I hope you're well. I'm running into a challenge and would appreciate some guidance.\n\nWhat I'm stuck on: ${issue}.`,
    "Give a Progress Update": `I hope you're well. Here's a quick progress update on where I am with today's task.\n\nContext: ${issue}.`,
    "Report a Blocker": `I hope you're well. I want to flag a blocker that's affecting my progress today.\n\nBlocker: ${issue}.`,
  };

  const extra = details.trim() ? `\n\nMore detail: ${details.trim()}` : "";

  return `Subject: ${subjectMap[request]}

Hi ${manager},

${bodyMap[request]}${extra}

I'm committed to staying on track with the programme and will keep you posted on my progress. Please let me know how you'd like me to proceed.

Thank you for your support.

Kind regards,
Aliziwe
CAPACITI AI Skills Accelerator`;
}
