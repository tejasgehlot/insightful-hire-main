import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Brain, Upload, AlertCircle } from "lucide-react";

export default function UploadNew() {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }
    setIsLoading(true);
    // Simulate upload/processing
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to JD library or dashboard
      navigate("/jd/library");
    }, 1500);
  };

  const handleClear = () => {
    setJobDescription("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Upload Job Description</h1>
            <p className="text-sm text-muted-foreground">Create a new assessment from a job description</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 mb-8">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">AI-Powered Processing</p>
              <p>
                Paste your job description below. Our AI will automatically extract skills, generate role-specific assessments, and identify potential evaluation criteria.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Area */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-base font-semibold">
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste your job description here. Include details about responsibilities, required skills, qualifications, and any other relevant information..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-96 resize-none text-base"
              />
              <p className="text-xs text-muted-foreground">
                {jobDescription.length} characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isLoading || !jobDescription.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload & Process
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleClear}
                disabled={!jobDescription.trim() || isLoading}
              >
                Clear
              </Button>
            </div>
          </form>

          {/* Tips Section */}
          <div className="mt-12 p-6 rounded-xl border border-border bg-card/50">
            <h3 className="font-semibold mb-4">Tips for best results:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Include detailed job responsibilities and day-to-day tasks</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>List technical and soft skills required for the role</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Mention experience level and qualifications</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Include any special requirements or certifications</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
