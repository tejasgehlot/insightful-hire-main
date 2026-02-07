import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Search, Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

const jobDescriptions = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$180K - $220K",
    postedDays: 3,
    description: "We're looking for an experienced Frontend Developer to join our growing team. You'll work on cutting-edge web applications using React and TypeScript.",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "FinanceHub",
    location: "New York, NY",
    salary: "$160K - $200K",
    postedDays: 5,
    description: "Build scalable financial applications with Node.js and React. Work with modern cloud infrastructure and contribute to our platform's growth.",
  },
  {
    id: 3,
    title: "Backend Software Engineer",
    company: "DataFlow",
    location: "Austin, TX",
    salary: "$170K - $210K",
    postedDays: 2,
    description: "Design and implement robust backend systems using Python and Go. Handle large-scale data processing and microservices architecture.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudBase",
    location: "Remote",
    salary: "$150K - $190K",
    postedDays: 7,
    description: "Manage cloud infrastructure, CI/CD pipelines, and deployment automation. Work with Kubernetes, Docker, and AWS.",
  },
  {
    id: 5,
    title: "Product Manager",
    company: "InnovateCo",
    location: "Seattle, WA",
    salary: "$140K - $180K",
    postedDays: 4,
    description: "Lead product strategy and roadmap for our SaaS platform. Collaborate with engineering and design teams to deliver impactful features.",
  },
  {
    id: 6,
    title: "Machine Learning Engineer",
    company: "ScaleUp",
    location: "Boston, MA",
    salary: "$190K - $240K",
    postedDays: 1,
    description: "Build ML models and pipelines for our recommendation engine. Work with Python, TensorFlow, and distributed computing.",
  },
];

export default function BrowseJD() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobDescriptions);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const filtered = jobDescriptions.filter(
      (job) =>
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.company.toLowerCase().includes(value.toLowerCase()) ||
        job.location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            <span className="text-muted-foreground">Welcome, Candidate</span>
            <Button variant="outline" asChild>
              <Link to="/candidate/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Assessments</h1>
          <p className="text-lg text-muted-foreground">
            Browse and take assessments for job opportunities that interest you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by job title, company, or location..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/assessment/${job.id}`}
                className="group"
              >
                <div className="h-full p-6 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">{job.company}</p>
                  </div>

                  {/* Details */}
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

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                    {job.description}
                  </p>

                  {/* CTA Button */}
                  <Button
                    variant="hero"
                    className="w-full group-hover:shadow-lg transition-shadow"
                  >
                    Take Assessment
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
