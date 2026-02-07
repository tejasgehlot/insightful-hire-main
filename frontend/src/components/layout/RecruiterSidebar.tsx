import { Link, useLocation } from "react-router-dom";
import {
  Brain,
  LayoutDashboard,
  FileText,
  Users,
  Target,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  FolderOpen,
  Zap,
  Shield,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mainNav = [
  {
    label: "Dashboard",
    href: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Job Descriptions",
    icon: FileText,
    children: [
      { label: "Upload New", href: "/jd/new" },
      { label: "JD Library", href: "/jd/library" },
    ],
  },
  {
    label: "Assessments",
    icon: ClipboardList,
    children: [
      { label: "Blueprints", href: "/blueprint/library" },
      { label: "Active Tests", href: "/assessments" },
    ],
  },
  {
    label: "Questions",
    icon: Target,
    children: [
      { label: "Question Bank", href: "/questions" },
      { label: "Generate New", href: "/questions/generate" },
      { label: "Review Queue", href: "/questions/review" },
    ],
  },
  {
    label: "Campaigns",
    href: "/recruiter/campaigns",
    icon: Zap,
  },
  {
    label: "Candidates",
    href: "/recruiter/candidates",
    icon: Users,
  },
  {
    label: "Analytics",
    icon: BarChart3,
    children: [
      { label: "Overview", href: "/analytics/recruiter" },
      { label: "Fairness Report", href: "/analytics/fairness" },
      { label: "Benchmarks", href: "/analytics/benchmarks" },
    ],
  },
  {
    label: "Proctoring",
    href: "/proctoring",
    icon: Shield,
  },
];

const bottomNav = [
  { label: "Settings", href: "/admin/org", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
];

export function RecruiterSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Job Descriptions", "Questions"]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">
            Assess<span className="gradient-text">AI</span>
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="space-y-1">
          {mainNav.map((item) => {
            const isExpanded = expandedItems.includes(item.label);
            const isActive = item.href === location.pathname;
            const hasChildren = item.children && item.children.length > 0;
            const isChildActive = item.children?.some((child) => child.href === location.pathname);

            if (hasChildren) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isChildActive
                        ? "text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-sm transition-colors",
                            location.pathname === child.href
                              ? "text-sidebar-primary bg-sidebar-primary/10"
                              : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href!}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "text-sidebar-primary bg-sidebar-primary/10"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="space-y-1 mb-3">
          {bottomNav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">john@company.com</p>
          </div>
          <button className="p-1.5 hover:bg-sidebar-border rounded transition-colors">
            <LogOut className="w-4 h-4 text-sidebar-foreground/60" />
          </button>
        </div>
      </div>
    </aside>
  );
}
