import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Brain,
  Zap,
  Shield,
  BarChart3,
  FileText,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  TrendingUp,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "JD Intelligence",
    description: "AI parses job descriptions to extract skills, priorities, and detect contradictions automatically.",
  },
  {
    icon: Zap,
    title: "Auto-Generated Assessments",
    description: "Create role-specific assessments with MCQs, coding challenges, and case studies in seconds.",
  },
  {
    icon: Shield,
    title: "Anti-Fraud Detection",
    description: "Real-time proctoring, plagiarism detection, and behavioral analysis to ensure integrity.",
  },
  {
    icon: BarChart3,
    title: "Explainable Scoring",
    description: "Transparent AI decisions with detailed breakdowns and confidence scores for every evaluation.",
  },
  {
    icon: FileText,
    title: "Smart Question Bank",
    description: "ML-curated question library with difficulty scaling and skill-based categorization.",
  },
  {
    icon: Users,
    title: "Bias-Free Hiring",
    description: "Fairness metrics and disparate impact analysis to ensure equitable candidate evaluation.",
  },
];

const stats = [
  { value: "73%", label: "Faster Time-to-Hire" },
  { value: "89%", label: "Candidate Satisfaction" },
  { value: "95%", label: "Fraud Detection Rate" },
  { value: "2.5M+", label: "Assessments Delivered" },
];

const testimonials = [
  {
    quote: "AssessAI transformed our engineering hiring. We reduced screening time by 80% while improving quality of hires.",
    author: "Sarah Chen",
    role: "VP Engineering",
    company: "TechCorp",
  },
  {
    quote: "The explainability features give us confidence in every hiring decision. Compliance has never been easier.",
    author: "Michael Rodriguez",
    role: "CHRO",
    company: "FinanceHub",
  },
  {
    quote: "Finally, a platform that catches fraudulent candidates before they waste our time. Game changer.",
    author: "Emily Watson",
    role: "Head of Talent",
    company: "ScaleUp Inc",
  },
];

const logos = [
  "TechCorp", "FinanceHub", "ScaleUp", "DataFlow", "CloudBase", "InnovateCo"
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Introducing AI-Powered Hiring Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
              Hire Smarter with
              <span className="block gradient-text">Intelligent Assessments</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              AI-driven platform that parses JDs, generates assessments, detects fraud, and explains every decision—so you can hire the best, faster.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth/role-selection">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/contact">
                  <Play className="w-5 h-5 mr-1" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="text-sm text-muted-foreground mb-6">Trusted by innovative companies worldwide</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                {logos.map((logo) => (
                  <div key={logo} className="text-lg font-semibold tracking-tight">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="glass rounded-2xl p-2 max-w-5xl mx-auto glow">
              <div className="bg-card rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Platform Dashboard Preview</h3>
                  <p className="text-muted-foreground">Your intelligent hiring command center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="gradient-text"> Hire Better</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From job description parsing to final decision, our AI handles the heavy lifting while keeping humans in control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="stat-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps from job posting to perfect hire.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: FileText, title: "Upload JD", desc: "Paste or upload your job description" },
              { icon: Brain, title: "AI Parses", desc: "Extract skills, requirements, and priorities" },
              { icon: Target, title: "Generate Assessment", desc: "Auto-create tailored evaluations" },
              { icon: TrendingUp, title: "Hire Best", desc: "Get ranked candidates with explanations" },
            ].map((step, index) => (
              <div key={step.title} className="relative text-center">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-7 h-7 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Loved by <span className="gradient-text">Hiring Teams</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="stat-card">
                <p className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="glass rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto glow">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of companies using AssessAI to find the best talent faster, fairer, and smarter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth/role-selection">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/contact">Request Demo</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
