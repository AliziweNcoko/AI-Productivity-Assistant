import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Mail, LineChart, Wrench, GraduationCap, ClipboardCheck, BookOpen,
  ShieldAlert, CalendarDays, NotebookPen, Compass, Heart, BarChart3, ShieldCheck,
  MonitorPlay,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CapacitiLogo } from "./CapacitiLogo";

const groups = [
  {
    label: "Programme",
    items: [
      { title: "Dashboard", url: "/", icon: Home },
      { title: "Daily Report", url: "/daily-report", icon: ClipboardCheck },
      { title: "Progress Tracker", url: "/progress-tracker", icon: LineChart },
      { title: "Wellness Check-In", url: "/wellness", icon: Heart },
    ],
  },
  {
    label: "AI Coach",
    items: [
      { title: "Smart Email Assistant", url: "/email-assistant", icon: Mail },
      { title: "Study Planner", url: "/study-planner", icon: CalendarDays },
      { title: "Weekly Reflection", url: "/weekly-reflection", icon: NotebookPen },
      { title: "Attendance Risk", url: "/attendance-risk", icon: ShieldAlert },
      { title: "Career Advisor", url: "/career-advisor", icon: Compass },
      { title: "AI Tool Finder", url: "/ai-tool-finder", icon: Wrench },
      { title: "Research Assistant", url: "/research-assistant", icon: BookOpen },
    ],
  },
  {
    label: "Insights",
    items: [
      { title: "Project Presentation", url: "/project-presentation", icon: MonitorPlay },
      { title: "Manager Insights", url: "/manager-insights", icon: BarChart3 },
      { title: "Responsible AI", url: "/responsible-ai", icon: ShieldCheck },
    ],
  },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <CapacitiLogo size={36} />
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-display font-bold text-sidebar-foreground tracking-wide">CAPACITI</span>
            <span className="text-xs text-sidebar-foreground/60">Success Coach</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={path === item.url} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="h-9 w-9 rounded-full bg-gradient-purple grid place-items-center text-white text-sm font-semibold shrink-0">
            A
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-sidebar-foreground">Aliziwe</span>
            <span className="text-xs text-sidebar-foreground/60 flex items-center gap-1">
              <GraduationCap className="h-3 w-3" /> AI Skills Accelerator
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
