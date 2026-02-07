import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RecruiterSidebar } from "@/components/layout/RecruiterSidebar";
import {
  Users,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  AlertTriangle,
  Plus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
} from "lucide-react";

const stats = [
  {
    label: "Active Campaigns",
    value: "12",
    change: "+3",
    trend: "up",
    icon: Target,
  },
  {
    label: "Total Candidates",
    value: "847",
    change: "+127",
    trend: "up",
    icon: Users,
  },
  {
    label: "Avg. Time to Hire",
    value: "8.2d",
    change: "-2.1d",
    trend: "up",
    icon: Clock,
  },
  {
    label: "Fraud Detected",
    value: "23",
    change: "+5",
    trend: "down",
    icon: AlertTriangle,
  },
];

const recentCampaigns = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    candidates: 156,
    shortlisted: 12,
    status: "active",
    progress: 75,
  },
  {
    id: "2",
    title: "Product Manager",
    candidates: 89,
    shortlisted: 8,
    status: "active",
    progress: 45,
  },
  {
    id: "3",
    title: "Data Scientist",
    candidates: 234,
    shortlisted: 15,
    status: "completed",
    progress: 100,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    candidates: 67,
    shortlisted: 5,
    status: "active",
    progress: 30,
  },
];

const recentActivity = [
  {
    type: "completed",
    candidate: "Alex Chen",
    action: "completed assessment",
    campaign: "Senior Frontend Engineer",
    time: "5 min ago",
  },
  {
    type: "fraud",
    candidate: "Unknown User",
    action: "flagged for suspicious activity",
    campaign: "Product Manager",
    time: "12 min ago",
  },
  {
    type: "shortlisted",
    candidate: "Sarah Johnson",
    action: "was shortlisted",
    campaign: "Data Scientist",
    time: "1 hour ago",
  },
  {
    type: "completed",
    candidate: "Michael Brown",
    action: "completed assessment",
    campaign: "DevOps Engineer",
    time: "2 hours ago",
  },
];

export default function RecruiterDashboard() {
  return (
    <div className="min-h-screen bg-background flex">
      <RecruiterSidebar />

      <main className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's what's happening with your hiring.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/jd/library">
                  <FileText className="w-4 h-4 mr-2" />
                  JD Library
                </Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/jd/new">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Campaigns */}
            <div className="lg:col-span-2 card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Active Campaigns</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/recruiter/campaigns">
                    View all
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {campaign.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {campaign.candidates} candidates • {campaign.shortlisted} shortlisted
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            campaign.status === "active"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {campaign.status}
                        </span>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-elevated p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "completed"
                          ? "bg-emerald-500/10"
                          : activity.type === "fraud"
                          ? "bg-red-500/10"
                          : "bg-primary/10"
                      }`}
                    >
                      {activity.type === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : activity.type === "fraud" ? (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      ) : (
                        <Target className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.candidate}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.campaign} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="ghost" className="w-full mt-4" size="sm">
                View all activity
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 p-6 glass rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/jd/new"
                className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Upload JD</span>
              </Link>
              <Link
                to="/questions"
                className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Question Bank</span>
              </Link>
              <Link
                to="/analytics/recruiter"
                className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Analytics</span>
              </Link>
              <Link
                to="/recruiter/candidates"
                className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">All Candidates</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
