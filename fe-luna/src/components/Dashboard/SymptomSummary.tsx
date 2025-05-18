
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { ThermometerSun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SymptomSummary() {
  const { symptoms } = useWellness();
  
  const recentSymptoms = symptoms.slice(-3).reverse();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <ThermometerSun className="h-5 w-5 mr-2" />
          Recent Symptoms
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/symptoms">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentSymptoms.length > 0 ? (
          <ul className="space-y-3">
            {recentSymptoms.map((entry) => (
              <li key={entry.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    entry.intensity === 'mild' 
                      ? 'bg-green-100 text-green-800'
                      : entry.intensity === 'moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {entry.intensity}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {entry.symptoms.map((symptom, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-secondary px-2 py-0.5 rounded-full"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-2">No symptom entries yet</p>
            <Button asChild>
              <Link to="/symptoms">Track symptoms</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
