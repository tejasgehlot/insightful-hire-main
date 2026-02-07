import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, FileText, MapPin, DollarSign, Clock, Briefcase } from "lucide-react";

const jobDescriptions = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$180K - $220K",
    postedDays: 3,
    description: "Experienced Frontend Developer to build web applications with React and TypeScript.",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateCo",
    location: "Seattle, WA",
    salary: "$140K - $180K",
    postedDays: 4,
    description: "Lead product strategy and roadmap for our SaaS platform.",
  },
  {
    id: 3,
    title: "Machine Learning Engineer",
    company: "ScaleUp",
    location: "Boston, MA",
    salary: "$190K - $240K",
    postedDays: 1,
    description: "Build ML models and pipelines for recommendation engines.",
  },
];

export default function JDLibrary() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">
              Assess<span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/recruiter/dashboard">
                Back to Dashboard
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/jd/new">
                <FileText className="w-4 h-4 mr-2" />
                Upload New
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">JD Library</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            A curated list of job descriptions. Click any JD to view or create an assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobDescriptions.map((job) => (
            <Link key={job.id} to={`/assessment/${job.id}`} className="group">
              <div className="h-full p-6 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-muted-foreground font-medium">{job.company}</p>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>Posted {job.postedDays} days ago</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{job.description}</p>

                <Button variant="outline" className="w-full mt-auto">View Assessment</Button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
