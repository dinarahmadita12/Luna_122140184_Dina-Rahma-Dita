
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { Smile } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const moodEmojis = {
  "great": "😄",
  "good": "🙂",
  "okay": "😐",
  "bad": "🙁",
  "awful": "😞"
};

export function MoodSummary() {
  const { moods } = useWellness();
  
  const recentMoods = moods.slice(-5).reverse();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Smile className="h-5 w-5 mr-2" />
          Mood Tracker
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/mood">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentMoods.length > 0 ? (
          <ul className="space-y-3">
            {recentMoods.map((mood) => (
              <li key={mood.id} className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className="text-xl mr-2">{moodEmojis[mood.mood]}</span>
                  <span className="capitalize">{mood.mood}</span>
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(mood.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-2">No mood entries yet</p>
            <Button asChild>
              <Link to="/mood">Track your mood</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
