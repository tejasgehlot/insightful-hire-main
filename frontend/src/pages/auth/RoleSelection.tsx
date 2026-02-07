import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Briefcase, User, ArrowRight } from "lucide-react";

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-16">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold">
            Assess<span className="gradient-text">AI</span>
          </span>
        </Link>

        <h1 className="text-4xl font-bold mb-4">How would you like to use AssessAI?</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Choose your role to get started with our AI-powered assessment platform.
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* Recruiter Card */}
        <Link to="/auth/signup/recruiter" className="group">
          <div className="relative h-full p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex flex-col h-full">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="w-7 h-7 text-primary" />
                </div>
              </div>

              <div className="flex-1 mb-6">
                <h2 className="text-2xl font-bold mb-3">I'm a Recruiter</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Find and assess the best candidates with AI-powered assessments.
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>AI-generated assessments</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Anti-fraud & proctoring</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>

              <Button variant="hero" className="w-full group/btn">
                Continue as Recruiter
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </Link>

        {/* Candidate Card */}
        <Link to="/auth/signup/candidate" className="group">
          <div className="relative h-full p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex flex-col h-full">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <User className="w-7 h-7 text-primary" />
                </div>
              </div>

              <div className="flex-1 mb-6">
                <h2 className="text-2xl font-bold mb-3">I'm a Candidate</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Take assessments and showcase your skills to top employers.
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Fair assessments</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Transparent scoring</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Free to use</span>
                </div>
              </div>

              <Button variant="outline" className="w-full group/btn">
                Continue as Candidate
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-12 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
