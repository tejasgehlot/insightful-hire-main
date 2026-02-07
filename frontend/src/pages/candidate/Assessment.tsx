import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Upload, CheckCircle2, AlertCircle } from "lucide-react";

const assessmentQuestions = [
  {
    id: 1,
    question: "What is your experience level with this technology?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    type: "single",
  },
  {
    id: 2,
    question: "Describe your approach to problem-solving in your past projects.",
    options: [],
    type: "text",
  },
  {
    id: 3,
    question: "Which of the following best describes your working style?",
    options: ["Collaborative", "Independent", "Leadership-focused", "Mixed"],
    type: "single",
  },
  {
    id: 4,
    question: "What are your career goals for the next 3 years?",
    options: [],
    type: "text",
  },
  {
    id: 5,
    question: "Rate your proficiency in the required technical skills.",
    options: ["1 - Novice", "2 - Basic", "3 - Proficient", "4 - Expert", "5 - Master"],
    type: "single",
  },
];

export default function Assessment() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [allAnswered, setAllAnswered] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileUploaded(true);
    }
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = { ...answers, [assessmentQuestions[currentQuestion].id]: answer };
    setAnswers(newAnswers);
    
    // Check if all questions are answered
    const allQuestioned = assessmentQuestions.every(
      (q) => newAnswers[q.id] && newAnswers[q.id].trim() !== ""
    );
    setAllAnswered(allQuestioned);
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitAssessment = () => {
    // Navigate to candidate dashboard
    navigate("/candidate/dashboard");
  };

  const question = assessmentQuestions[currentQuestion];
  const isAnswered = answers[question.id] && answers[question.id].trim() !== "";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Assessment</h1>
            <p className="text-sm text-muted-foreground">Job ID: {jobId}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* File Upload Section */}
          <Card className={`p-8 mb-8 transition-all ${fileUploaded ? "opacity-100" : "opacity-100"}`}>
            <h2 className="text-xl font-bold mb-4">Step 1: Upload Your Resume</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-8">
              {!fileUploaded ? (
                <label className="cursor-pointer block">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold mb-2">Upload your resume</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supported formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                </label>
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                    <p className="text-lg font-semibold">File uploaded successfully</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{fileName}</p>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setFileUploaded(false);
                      setFileName("");
                    }}
                  >
                    Change File
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Assessment Section */}
          <div className={`transition-all ${fileUploaded ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
            {!fileUploaded && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 mb-6">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Please upload your resume to begin the assessment
                </p>
              </div>
            )}

            <Card className="p-8">
              <h2 className="text-xl font-bold mb-2">Step 2: Assessment Questions</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-8">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-6">{question.question}</h3>

                {question.type === "single" ? (
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={handleAnswerChange}
                    disabled={!fileUploaded}
                  >
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={option} disabled={!fileUploaded} />
                          <Label
                            htmlFor={option}
                            className="text-base cursor-pointer font-normal"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <textarea
                    className="w-full h-32 p-4 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Type your answer here..."
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    disabled={!fileUploaded}
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentQuestion === 0 || !fileUploaded}
                >
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentQuestion < assessmentQuestions.length - 1 ? (
                    <Button
                      variant="hero"
                      onClick={handleNext}
                      disabled={!isAnswered || !fileUploaded}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="hero"
                      onClick={handleSubmitAssessment}
                      disabled={!allAnswered || !fileUploaded}
                    >
                      Submit Assessment
                    </Button>
                  )}
                </div>
              </div>

              {/* Question Indicator */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Answered questions:</p>
                <div className="flex flex-wrap gap-2">
                  {assessmentQuestions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => {
                        if (fileUploaded) setCurrentQuestion(idx);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                        answers[q.id] && answers[q.id].trim() !== ""
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"
                      } ${currentQuestion === idx ? "ring-2 ring-primary" : ""}`}
                      disabled={!fileUploaded}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
