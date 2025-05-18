
import { MoodForm } from "@/components/Forms/MoodForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const moodEmojis = {
  "great": "😄",
  "good": "🙂",
  "okay": "😐",
  "bad": "🙁",
  "awful": "😞"
};

export default function MoodPage() {
  const { moods, deleteMood } = useWellness();
  const { toast } = useToast();
  
  const sortedMoods = [...moods].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleDelete = (id: string) => {
    deleteMood(id);
    toast({ title: "Mood entry deleted" });
  };
  
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Mood Tracker</h1>
        <p className="text-muted-foreground">Record and monitor your emotional wellbeing</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <MoodForm />
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Mood History</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedMoods.length > 0 ? (
                <div className="space-y-4">
                  {sortedMoods.map((mood) => (
                    <div key={mood.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{moodEmojis[mood.mood]}</span>
                          <div>
                            <p className="font-medium capitalize">{mood.mood}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(mood.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(mood.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {mood.notes && (
                        <p className="text-sm bg-secondary/50 p-2 rounded-md">{mood.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No mood entries yet</p>
                  <p className="text-sm">Use the form to start tracking your mood</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
