import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail, LineChart, Wrench, BookOpen, ArrowRight, MapPin, Wifi,
  ClipboardCheck, CalendarDays, Compass, Heart, ShieldAlert, Trophy, CheckCircle2, Circle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CapacitiLogo } from "@/components/CapacitiLogo";
import { ResponsibleAINotice } from "@/components/ResponsibleAINotice";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · CAPACITI Success Coach" },
      { name: "description", content: "Welcome to your CAPACITI AI Skills Accelerator dashboard." },
    ],
  }),
  component: Index,
});

const quickActions = [
  { to: "/email-assistant", title: "Generate Email", icon: Mail, gradient: "bg-gradient-purple" },
  { to: "/daily-report", title: "Submit Daily Report", icon: ClipboardCheck, gradient: "bg-gradient-navy" },
  { to: "/ai-tool-finder", title: "Find AI Tool", icon: Wrench, gradient: "bg-[linear-gradient(135deg,var(--red),var(--purple))]" },
  { to: "/research-assistant", title: "Research Assistant", icon: BookOpen, gradient: "bg-[linear-gradient(135deg,var(--navy),var(--purple))]" },
  { to: "/study-planner", title: "Study Planner", icon: CalendarDays, gradient: "bg-gradient-purple" },
  { to: "/career-advisor", title: "Career Advisor", icon: Compass, gradient: "bg-gradient-navy" },
];

const todayProgress = [
  { label: "Attendance", status: "complete", to: "/attendance-risk", icon: ShieldAlert },
  { label: "Daily Report", status: "complete", to: "/daily-report", icon: ClipboardCheck },
  { label: "Study Plan", status: "pending", to: "/study-planner", icon: CalendarDays },
  { label: "Wellness", status: "pending", to: "/wellness", icon: Heart },
];

function Index() {
  const [mode, setMode] = useState<"onsite" | "online">("onsite");
  const completed = todayProgress.filter((p) => p.status === "complete").length;
  const pct = Math.round((completed / todayProgress.length) * 100);

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero text-white shadow-glow">
        <AnimatedBg />
        <div className="relative p-8 sm:p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">Welcome to CAPACITI Success Coach</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-extrabold leading-tight">
              HELLO ALIZIWE <span className="inline-block">👋</span>
              <br />
              <span className="text-white/90">LET'S MAKE TODAY COUNT</span>
            </h1>
            <p className="mt-4 max-w-xl text-white/80 text-base sm:text-lg">
              Your AI companion for success in the CAPACITI AI Skills Accelerator Programme.
            </p>
            <div className="mt-6 inline-flex bg-white/10 backdrop-blur p-1 rounded-full border border-white/20">
              <button onClick={() => setMode("onsite")} className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition ${mode === "onsite" ? "bg-white text-navy shadow" : "text-white/80 hover:text-white"}`}>
                <MapPin className="h-4 w-4" /> Onsite
              </button>
              <button onClick={() => setMode("online")} className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition ${mode === "online" ? "bg-white text-navy shadow" : "text-white/80 hover:text-white"}`}>
                <Wifi className="h-4 w-4" /> Online
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative h-56 w-56">
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
              <div className="absolute inset-4 rounded-full bg-white grid place-items-center shadow-soft">
                <CapacitiLogo size={160} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's progress */}
      <section>
        <Card className="p-6 rounded-3xl shadow-soft">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div>
              <h2 className="text-xl font-display font-bold">Today's Progress</h2>
              <p className="text-sm text-muted-foreground">{completed} of {todayProgress.length} actions complete</p>
            </div>
            <div className="flex items-center gap-3">
              {pct === 100 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/15 text-success text-xs font-semibold">
                  <Trophy className="h-3.5 w-3.5" /> Day Champion
                </span>
              )}
              <span className="text-2xl font-display font-extrabold text-purple">{pct}%</span>
            </div>
          </div>
          <Progress value={pct} className="h-2 mb-5" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {todayProgress.map((p) => {
              const done = p.status === "complete";
              return (
                <Link key={p.label} to={p.to} className="group">
                  <div className={`p-4 rounded-2xl border-2 transition ${done ? "border-success/30 bg-success/5" : "border-border hover:border-purple/40"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p.icon className="h-5 w-5 text-purple" />
                      {done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground/40" />}
                    </div>
                    <p className="font-semibold text-sm">{p.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{done ? "Complete" : "Pending"}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-xl font-display font-bold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((f) => (
            <Link key={f.to} to={f.to} className="group">
              <Card className="p-5 h-full rounded-3xl border-border hover:border-purple/40 transition-all shadow-soft hover:shadow-glow hover:-translate-y-1 duration-200">
                <div className={`h-12 w-12 rounded-2xl ${f.gradient} grid place-items-center text-white shadow-soft`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-display font-bold">{f.title}</h3>
                <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-purple group-hover:gap-2 transition-all">
                  Open <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Current Day", value: "Day 3" },
          { label: "Status", value: "On Track" },
          { label: "Mode", value: mode === "onsite" ? "Onsite" : "Online" },
          { label: "Cohort", value: "AISA '26" },
        ].map((s) => (
          <Card key={s.label} className="p-4 rounded-2xl">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xl font-display font-bold">{s.value}</p>
          </Card>
        ))}
      </section>

      <ResponsibleAINotice />
    </div>
  );
}

function BgPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon points="30,2 56,17 56,47 30,62 4,47 4,17" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}
