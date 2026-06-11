import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  MonitorPlay, AlertCircle, Users, Clock, MessageSquare, Search, Brain,
  Briefcase, Mail, ClipboardCheck, Wrench, BookOpen, CalendarDays, Compass,
  Heart, ShieldAlert, TrendingUp, Zap, Award, Target, BarChart3, ShieldCheck,
  CheckCircle2, Code2, Cpu, Paintbrush, Smartphone, FileText, Play, ChevronRight,
  Sparkles, Lock, Eye, ChevronDown, Pause, Trophy, Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/project-presentation")({
  head: () => ({
    meta: [
      { title: "Project Presentation · CAPACITI Success Coach" },
      { name: "description", content: "An AI-powered student support platform designed to improve communication, productivity, learning, and student success." },
    ],
  }),
  component: ProjectPresentation,
});

const sections = [
  { id: "overview", title: "Project Overview" },
  { id: "problem", title: "Problem Being Solved" },
  { id: "features", title: "Key Features" },
  { id: "impact", title: "Project Impact" },
  { id: "responsible-ai", title: "Responsible AI" },
  { id: "tech-stack", title: "Technology Stack" },
  { id: "demo-guide", title: "Live Demo Guide" },
  { id: "summary", title: "Competition Summary" },
];

const problemCards = [
  { icon: ShieldAlert, title: "Attendance Management", desc: "Students struggle to track attendance and understand the impact of missed days." },
  { icon: ClipboardCheck, title: "Daily Reporting", desc: "Writing structured daily reports is time-consuming and inconsistent." },
  { icon: MessageSquare, title: "Professional Communication", desc: "Crafting professional emails to managers requires practice and confidence." },
  { icon: Search, title: "Finding the Right AI Tools", desc: "With hundreds of AI tools, students waste time deciding which to use." },
  { icon: Brain, title: "Information Overload", desc: "Research and articles can be overwhelming without summarisation support." },
  { icon: Briefcase, title: "Career Uncertainty", desc: "Students need guidance on career paths aligned with their skills and interests." },
];

const featureCards = [
  { icon: Mail, title: "Smart Email Assistant", desc: "Generates professional emails and supports communication with Day Managers." },
  { icon: ClipboardCheck, title: "Daily Report Generator", desc: "Creates structured progress reports and improves accountability." },
  { icon: Wrench, title: "AI Tool Finder", desc: "Recommends relevant AI tools and helps students work more efficiently." },
  { icon: BookOpen, title: "AI Research Assistant", desc: "Summarises articles and reports, extracting key insights and recommendations." },
  { icon: CalendarDays, title: "Study Planner", desc: "Creates personalised study schedules and revision plans." },
  { icon: Compass, title: "Career Path Advisor", desc: "Suggests career opportunities and learning paths based on skills." },
  { icon: Heart, title: "Wellness Check-In", desc: "Encourages student wellbeing and provides productivity tips." },
  { icon: ShieldAlert, title: "Attendance Risk Predictor", desc: "Identifies students who may need support before attendance drops." },
];

const impactMetrics = [
  { label: "Improved Student Communication", value: 92 },
  { label: "Increased Productivity", value: 85 },
  { label: "Better Time Management", value: 88 },
  { label: "Enhanced Learning Outcomes", value: 90 },
  { label: "Improved Attendance Awareness", value: 78 },
  { label: "Stronger Career Readiness", value: 82 },
];

const techStack = [
  { icon: Sparkles, name: "Lovable", role: "Rapid Development Platform" },
  { icon: Cpu, name: "AI Gateway", role: "AI Model Orchestration" },
  { icon: Code2, name: "React", role: "UI Framework" },
  { icon: FileText, name: "TypeScript", role: "Type-Safe Language" },
  { icon: Paintbrush, name: "Tailwind CSS", role: "Styling & Design System" },
  { icon: Smartphone, name: "Responsive Design", role: "Mobile-First Approach" },
];

const demoSteps = [
  { step: 1, title: "Open Smart Email Assistant", desc: "Navigate to the Email Assistant page.", link: "/email-assistant" },
  { step: 2, title: "Generate a Professional Absence Email", desc: "Enter details and generate a polished email.", link: "/email-assistant" },
  { step: 3, title: "Open Daily Report Generator", desc: "Navigate to the Daily Report page.", link: "/daily-report" },
  { step: 4, title: "Generate a Daily Progress Report", desc: "Fill in tasks and submit a structured report.", link: "/daily-report" },
  { step: 5, title: "Open AI Research Assistant", desc: "Navigate to the Research Assistant page.", link: "/research-assistant" },
  { step: 6, title: "Analyze an Article and Show Insights", desc: "Paste an article and extract key takeaways.", link: "/research-assistant" },
  { step: 7, title: "Open AI Tool Finder", desc: "Navigate to the AI Tool Finder page.", link: "/ai-tool-finder" },
  { step: 8, title: "Show Recommended AI Tools", desc: "Search for a need and display tool recommendations.", link: "/ai-tool-finder" },
  { step: 9, title: "Display Responsible AI Page", desc: "Navigate to the Responsible AI Centre.", link: "/responsible-ai" },
  { step: 10, title: "Show Impact Dashboard", desc: "Return to the Dashboard for a full overview.", link: "/" },
];

function ProjectPresentation() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [demoActive, setDemoActive] = useState(false);
  const [activeSection, setActiveSection] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const startDemo = () => {
    if (demoActive) return;
    setDemoActive(true);
    setActiveSection(0);
    scrollToSection(0);

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += 1;
      if (current >= sections.length) {
        setDemoActive(false);
        setActiveSection(-1);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      setActiveSection(current);
      scrollToSection(current);
    }, 3000);
  };

  const stopDemo = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDemoActive(false);
    setActiveSection(-1);
  };

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-12">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-3xl bg-gradient-hero text-white shadow-glow transition-all duration-500"
      >
        <PresentationBg />
        <div className="relative p-8 sm:p-14 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur">
            <MonitorPlay className="h-4 w-4" /> Project Presentation
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold leading-tight">
            CAPACITI Success Coach
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/85 leading-relaxed">
            An AI-powered student support platform designed to improve communication, productivity, learning, and student success.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {!demoActive ? (
              <Button
                onClick={startDemo}
                className="rounded-full h-12 px-8 bg-white text-navy hover:bg-white/90 gap-2 text-base font-semibold shadow-lg"
              >
                <Play className="h-5 w-5" /> Start Demo
              </Button>
            ) : (
              <Button
                onClick={stopDemo}
                className="rounded-full h-12 px-8 bg-white/20 text-white hover:bg-white/30 gap-2 text-base font-semibold border border-white/30 backdrop-blur"
              >
                <Pause className="h-5 w-5" /> Stop Demo
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Section jump nav */}
      <div className="flex flex-wrap justify-center gap-2">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
              activeSection === i
                ? "bg-purple text-white border-purple"
                : "bg-card border-border text-muted-foreground hover:border-purple/40 hover:text-foreground"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Overview */}
      <section
        ref={setRef(0)}
        id="overview"
        className={`space-y-6 transition-all duration-500 ${activeSection === 0 ? "ring-4 ring-purple/20 rounded-3xl p-4 -mx-4" : ""}`}
      >
        <SectionHeader title="Project Overview" icon={MonitorPlay} />
        <div className="grid md:grid-cols-2 gap-5">
          <OverviewCard
            title="Problem Statement"
            content="Students in the CAPACITI AI Skills Accelerator face challenges with attendance tracking, daily reporting, professional communication, finding suitable AI tools, managing information overload, and planning their careers."
            accent="bg-gradient-navy"
          />
          <OverviewCard
            title="Solution Overview"
            content="CAPACITI Success Coach integrates AI-powered tools into a single platform — providing smart email assistance, daily report generation, AI tool recommendations, research support, study planning, career guidance, wellness check-ins, and attendance risk prediction."
            accent="bg-gradient-purple"
          />
          <OverviewCard
            title="Target Users"
            content="CAPACITI AI Skills Accelerator students, Day Managers, and programme coordinators who need streamlined communication, productivity, and student success monitoring."
            accent="bg-[linear-gradient(135deg,var(--red),var(--purple))]"
          />
          <OverviewCard
            title="Expected Impact"
            content="Improved communication quality, increased daily productivity, better time management, enhanced learning outcomes, stronger attendance awareness, and clearer career direction for all programme participants."
            accent="bg-[linear-gradient(135deg,var(--navy),var(--red))]"
          />
        </div>
      </section>

      {/* Problem */}
      <section
        ref={setRef(1)}
        id="problem"
        className={`space-y-6 transition-all duration-500 ${activeSection === 1 ? "ring-4 ring-purple/20 rounded-3xl p-4 -mx-4" : ""}`}
      >
        <SectionHeader title="Problem Being Solved" icon={AlertCircle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problemCards.map((c) => (
            <Card key={c.title} className="p-6 rounded-3xl space-y-4 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300 border-border hover:border-purple/30">
              <div className="h-12 w-12 rounded-2xl bg-gradient-navy grid place-items-center text-white shadow-soft">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        ref={setRef(2)}
        id="features"
        className={`space-y-6 transition-all duration-500 ${activeSection === 2 ? "ring-4 ring-purple/20 rounded-3xl p-4 -mx-4" : ""}`}
      >
        <SectionHeader title="Key Features" icon={Sparkles} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featureCards.map((f) => (
            <Card key={f.title} className="p-5 rounded-3xl space-y-3 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300 border-border hover:border-purple/30">
              <div className="h-10 w-10 rounded-xl bg-gradient-purple grid place-items-center text-white shadow-soft">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section
        ref={setRef(3)}
        id="impact"
        className={`space-y-6 transition-all duration-500 ${activeSection === 3 ? "ring-4 ring-purple/20 rounded-3xl p-4 -mx-4" : ""}`}
      >
        <SectionHeader title="Project Impact" icon={TrendingUp} />
        <Card className="p-6 sm:p-8 rounded-3xl space-y-6 shadow-soft">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactMetrics.map((m) => (
              <div key={m.label} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{m.label}</span>
                  <span className="text-sm font-display font-bold text-purple">{m.value}%</span>
                </div>
                <Progress value={m.value} className="h-2.5" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-border">
            {[
              { icon: Zap, label: "Productivity Boost" },
              { icon: Award, label: "Better Outcomes" },
              { icon: Target, label: "Clearer Goals" },
              { icon: Clock, label: "Time Saved" },
              { icon: BarChart3, label: "Data Insights" },
              { icon: Users, label: "Student Focus" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-muted/40 text-center">
                <b.icon className="h-6 w-6 text-purple" />
                <span className="text-xs font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Responsible AI */}
      <section
        ref={setRef(4)}
        id="responsible-ai"
        className={`space-y-6 transition-all duration-500 ${activeSection === 4 ? "ring-4 ring-purple/20 rounded-3xl p-4 -mx-4" : ""}`}
      >
        <SectionHeader title="Responsible AI" icon={ShieldCheck} />
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="p-6 rounded-3xl space-y-4 shadow-soft border-success/30 bg-success/5">
            <div className="h-12 w-12 rounded-2xl bg-success/20 grid place-items-center">
              <Eye className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-display font-bold text-lg">AI Assists, Not Replaces</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-generated suggestions are designed to accelerate student work, not replace human judgment. Every output should be reviewed, edited, and personalised before use.
            </p>
          </Card>
          <Card className="p-6 rounded-3xl space-y-4 shadow-soft border-warning/30 bg-warning/5">
            <div className="h-12 w-12 rounded-2xl bg-warning/20 grid place-items-center">
              <CheckCircle2 className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-display font-bold text-lg">Verify Before Sending</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Students must review and verify all AI-generated emails, reports, and recommendations before submitting them to managers or programme staff.
            </p>
          </Card>
          <Card className="p-6 rounded-3xl space-y-4 shadow-soft border-destructive/30 bg-destructive/5">
            <div className="h-12 w-12 rounded-2xl bg-destructive/20 grid place-items-center">
              <Lock className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="font-display font-bold text-lg">Protect Sensitive Data</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No passwords, ID numbers, banking information, or sensitive personal details should be entered into any AI tool within the platform.
            </p>
          </Card>
          <Card className="p-6 rounded-3xl space-y-4 shadow-soft border-purple/30 bg-purple/5">
            <div className="h-12 w-12 rounded-2xl bg-purple/20 grid place-items-center">
              <Users className="h-6 w-6 text-purple" />
            </div>
            <h3 className="font-display font-bold text-lg">Human Review Required</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All communications generated by the Smart Email Assistant require human review before sending. The platform encourages responsible AI literacy.
            </p>
          </Card>
        </div>
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-navy text-white text-sm font-semibold shadow-glow">
            <ShieldCheck className="h-4 w-4" /> Responsible AI Certified
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        ref={setRef(5)}
        id="tech-stack"
        className={`space-y-6 transition-all duration-500 ${activeSection === 5 ? "ring-4 ring-purple/20 rounded-3xl p-4 -mx-4" : ""}`}
      >
        <SectionHeader title="Technology Stack" icon={Code2} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((t) => (
            <Card key={t.name} className="p-5 rounded-3xl text-center space-y-3 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300 border-border hover:border-purple/30">
              <div className="h-14 w-14 rounded-2xl bg-gradient-purple grid place-items-center text-white mx-auto shadow-soft">
                <t.icon className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm">{t.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo Guide */}
      <section
        ref={setRef(6)}
        id="demo-guide"
        className={`space-y-6 transition-all duration-500 ${activeSection === 6 ? "ring-4 ring-purple/20 rounded-3xl p-4 -mx-4" : ""}`}
      >
        <SectionHeader title="Live Demo Guide" icon={Play} />
        <Card className="p-6 sm:p-8 rounded-3xl shadow-soft space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {demoSteps.map((s) => (
              <Link key={s.step} to={s.link} className="group block">
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card hover:border-purple/40 hover:bg-accent/40 transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-gradient-navy grid place-items-center text-white font-display font-bold text-sm shrink-0 shadow-soft group-hover:bg-gradient-purple transition">
                    {s.step}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-sm group-hover:text-purple transition">{s.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-purple group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center pt-2">
            {!demoActive ? (
              <Button onClick={startDemo} className="rounded-full h-12 px-8 bg-gradient-purple text-white gap-2 text-base font-semibold shadow-glow">
                <Play className="h-5 w-5" /> Start Demo
              </Button>
            ) : (
              <Button onClick={stopDemo} variant="outline" className="rounded-full h-12 px-8 gap-2 text-base font-semibold border-purple/40">
                <Pause className="h-5 w-5" /> Stop Demo
              </Button>
            )}
          </div>
        </Card>
      </section>

      {/* Summary */}
      <section
        ref={setRef(7)}
        id="summary"
        className={`space-y-6 transition-all duration-500 ${activeSection === 7 ? "ring-4 ring-purple/20 rounded-3xl p-4 -mx-4" : ""}`}
      >
        <SectionHeader title="Competition Summary" icon={Trophy} />
        <Card className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-hero text-white shadow-glow text-center space-y-6">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[color:var(--red)]/30 blur-3xl animate-float-medium" />
          </div>
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-sm font-medium backdrop-blur">
              <Star className="h-4 w-4" /> CAPACITI Success Coach
            </div>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-white/90">
              CAPACITI Success Coach leverages Artificial Intelligence to support student success through smarter communication, productivity tools, learning support, career guidance, and responsible AI practices.
            </p>
          </div>
        </Card>
      </section>

      {/* Scroll to top */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple transition"
        >
          <ChevronDown className="h-4 w-4 rotate-180" /> Back to top
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon: Icon }: { title: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-gradient-navy grid place-items-center text-white shadow-soft">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-display font-extrabold">{title}</h2>
    </div>
  );
}

function OverviewCard({ title, content, accent }: { title: string; content: string; accent: string }) {
  return (
    <Card className="p-6 rounded-3xl space-y-4 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300 border-border hover:border-purple/30">
      <div className={`h-2 w-16 rounded-full ${accent}`} />
      <h3 className="font-display font-bold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </Card>
  );
}

function PresentationBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -inset-[20%] opacity-50 animate-hero-pan"
        style={{
          backgroundImage:
            "radial-gradient(40% 50% at 20% 30%, rgba(91,61,187,0.55), transparent 60%), radial-gradient(35% 45% at 80% 20%, rgba(255,59,78,0.45), transparent 60%), radial-gradient(45% 55% at 60% 85%, rgba(26,43,74,0.6), transparent 60%)",
        }}
      />
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl animate-float-slow" />
      <div className="absolute bottom-8 right-20 h-40 w-40 rounded-full bg-[color:var(--red)]/30 blur-3xl animate-float-medium" />
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-pp" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon points="30,2 56,17 56,47 30,62 4,47 4,17" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pp)" />
      </svg>
    </div>
  );
}
