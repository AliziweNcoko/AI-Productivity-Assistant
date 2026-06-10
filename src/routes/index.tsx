import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, LineChart, Wrench, ArrowRight, MapPin, Wifi } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const features = [
  { to: "/email-assistant", title: "Smart Email Assistant", desc: "Draft polished emails to your Day Manager in seconds.", icon: Mail, gradient: "bg-gradient-purple" },
  { to: "/progress-tracker", title: "Progress Tracker", desc: "Check in and get personalised coaching for today.", icon: LineChart, gradient: "bg-gradient-navy" },
  { to: "/ai-tool-finder", title: "AI Tool Finder", desc: "Find the right AI tool for whatever you need to build.", icon: Wrench, gradient: "bg-[linear-gradient(135deg,var(--red),var(--purple))]" },
];

function Index() {
  const [mode, setMode] = useState<"onsite" | "online">("onsite");

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero text-white shadow-glow">
        <BgPattern />
        <div className="relative p-8 sm:p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">CAPACITI · AI Skills Accelerator</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-display font-extrabold leading-tight">
              HELLO ALIZIWE <span className="inline-block">👋</span>
              <br />
              <span className="text-white/90">WE ARE HERE FOR YOU</span>
            </h1>
            <p className="mt-4 max-w-xl text-white/80 text-base sm:text-lg">
              Your AI companion for success in the CAPACITI AI Skills Accelerator Programme.
            </p>
            <div className="mt-6 inline-flex bg-white/10 backdrop-blur p-1 rounded-full border border-white/20">
              <button
                onClick={() => setMode("onsite")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition ${
                  mode === "onsite" ? "bg-white text-navy shadow" : "text-white/80 hover:text-white"
                }`}
              >
                <MapPin className="h-4 w-4" /> Onsite Student
              </button>
              <button
                onClick={() => setMode("online")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition ${
                  mode === "online" ? "bg-white text-navy shadow" : "text-white/80 hover:text-white"
                }`}
              >
                <Wifi className="h-4 w-4" /> Online Student
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

      {/* Feature cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <Link key={f.to} to={f.to} className="group">
            <Card className="p-6 h-full rounded-3xl border-border hover:border-purple/40 transition-all shadow-soft hover:shadow-glow hover:-translate-y-1 duration-200">
              <div className={`h-12 w-12 rounded-2xl ${f.gradient} grid place-items-center text-white shadow-soft`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-display font-bold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple group-hover:gap-2 transition-all">
                Open <ArrowRight className="h-4 w-4" />
              </div>
            </Card>
          </Link>
        ))}
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
            <p className="mt-1 text-xl font-display font-bold text-foreground">{s.value}</p>
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

// Re-export Button to avoid unused import lint
void Button;
