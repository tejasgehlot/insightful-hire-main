import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  ArrowRight,
  Trophy,
  Target,
  BarChart3,
  LogOut,
  Settings,
  User,
} from "lucide-react";

const upcomingTests = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    deadline: "Feb 8, 2026",
    duration: "90 min",
    status: "pending",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    deadline: "Feb 10, 2026",
    duration: "60 min",
    status: "pending",
  },
];

const completedTests = [
  {
    id: "3",
    title: "Full Stack Developer",
    company: "InnovateCo",
    completedAt: "Feb 1, 2026",
    score: 87,
    status: "passed",
  },
  {
    id: "4",
    title: "React Developer",
    company: "WebAgency",
    completedAt: "Jan 28, 2026",
    score: 92,
    status: "passed",
  },
  {
    id: "5",
    title: "JavaScript Engineer",
    company: "DevShop",
    completedAt: "Jan 20, 2026",
    score: 65,
    status: "failed",
  },
];

const skills = [
  { name: "React", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "Node.js", level: 75 },
  { name: "System Design", level: 70 },
  { name: "Problem Solving", level: 85 },
];

export default function CandidateDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Assess<span className="gradient-text">AI</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Alex Chen</p>
                  <p className="text-xs text-muted-foreground">alex@email.com</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Alex</h1>
            <p className="text-muted-foreground">
              You have {upcomingTests.length} upcoming assessments
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Tests */}
              <section className="card-elevated p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Upcoming Assessments</h2>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {upcomingTests.length} pending
                  </span>
                </div>

                {upcomingTests.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingTests.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{test.title}</h3>
                            <p className="text-sm text-muted-foreground">{test.company}</p>
                          </div>
                          <Button variant="hero" size="sm" asChild>
                            <Link to={`/test/${test.id}`}>
                              Start Test
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            Due {test.deadline}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {test.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-muted-foreground">No pending assessments</p>
                  </div>
                )}
              </section>

              {/* Completed Tests */}
              <section className="card-elevated p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Completed Assessments</h2>
                  <Button variant="ghost" size="sm">
                    View all
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {completedTests.map((test) => (
                    <div
                      key={test.id}
                      className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{test.title}</h3>
                          <p className="text-sm text-muted-foreground">{test.company}</p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${
                              test.status === "passed" ? "text-emerald-500" : "text-red-500"
                            }`}
                          >
                            {test.score}%
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              test.status === "passed" ? "text-emerald-500" : "text-red-500"
                            }`}
                          >
                            {test.status === "passed" ? "Passed" : "Not Passed"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Completed {test.completedAt}
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/candidate/results/${test.id}`}>
                            View Results
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="card-elevated p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Alex Chen</h3>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Tests Taken</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-500">83%</div>
                    <div className="text-xs text-muted-foreground">Avg. Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-xs text-muted-foreground">Shortlisted</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/candidate/profile">
                    <FileText className="w-4 h-4 mr-2" />
                    View Profile
                  </Link>
                </Button>
              </div>

              {/* Skills */}
              <div className="card-elevated p-6">
                <h3 className="font-semibold mb-4">Skill Assessment</h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Pro Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Ensure stable internet before starting
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Use a quiet, well-lit environment
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Have your webcam ready for proctoring
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
