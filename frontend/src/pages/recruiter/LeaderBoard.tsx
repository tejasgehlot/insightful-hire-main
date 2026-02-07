import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

const students = [
  { name: "Alice Johnson", score: 95 },
  { name: "Bob Lee", score: 89 },
  { name: "Carla Gomez", score: 86 },
  { name: "Daniel Kim", score: 82 },
  { name: "Emma Patel", score: 78 },
  { name: "Frank Wu", score: 74 },
  { name: "Grace Li", score: 70 },
];

export default function LeaderBoard() {
  const sorted = [...students].sort((a, b) => b.score - a.score);
  const maxScore = sorted[0]?.score || 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Leader-Board</h1>
            <p className="text-sm text-muted-foreground">Top students ranked by score</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Top Performers</h2>
              <p className="text-sm text-muted-foreground">Ranking based on assessment scores</p>
            </div>
            <Link to="/recruiter/dashboard" className="text-sm text-primary hover:underline">Back to Dashboard</Link>
          </div>

          <div className="space-y-4">
            {sorted.map((s, idx) => (
              <div key={s.name} className="p-4 rounded-lg border border-border bg-card flex items-center gap-4">
                <div className="w-12 text-center">
                  <div className="text-lg font-bold">#{idx + 1}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{s.name}</div>
                    <div className="font-semibold">{s.score}</div>
                  </div>

                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(s.score / maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
