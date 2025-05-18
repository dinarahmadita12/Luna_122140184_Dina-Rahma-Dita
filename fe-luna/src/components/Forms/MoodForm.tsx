
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useWellness } from "@/contexts/WellnessContext";
import { useToast } from "@/components/ui/use-toast";

const moodOptions = [
  { value: "great", emoji: "😄", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "bad", emoji: "🙁", label: "Bad" },
  { value: "awful", emoji: "😞", label: "Awful" }
];

export function MoodForm() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const { addMood } = useWellness();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        variant: "destructive"
      });
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    addMood({
      date: today,
      mood: selectedMood as any,
      notes: notes.trim() || undefined
    });
    
    toast({
      title: "Mood tracked successfully",
      description: "Your mood has been saved"
    });
    
    // Reset form
    setSelectedMood(null);
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {moodOptions.map((mood) => (
              <Button
                key={mood.value}
                type="button"
                variant={selectedMood === mood.value ? "default" : "outline"}
                className={`flex flex-col h-24 ${
                  selectedMood === mood.value ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedMood(mood.value)}
              >
                <span className="text-2xl mb-2">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <label className="luna-label" htmlFor="notes">
              Notes (optional)
            </label>
            <Textarea
              id="notes"
              placeholder="Add any notes about how you're feeling..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Save Mood</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
