
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWellness } from "@/contexts/WellnessContext";
import { useToast } from "@/components/ui/use-toast";

export function MedicationForm() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("08:00");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly" | "as-needed">("daily");
  const { addMedication } = useWellness();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Please enter a medication name",
        variant: "destructive"
      });
      return;
    }
    
    addMedication({
      name: name.trim(),
      time,
      frequency,
      taken: false
    });
    
    toast({
      title: "Medication reminder created",
      description: `You'll be reminded to take ${name} at ${time}`
    });
    
    // Reset form
    setName("");
    setTime("08:00");
    setFrequency("daily");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Medication Reminder</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="med-name">Medication Name</Label>
            <Input
              id="med-name"
              placeholder="e.g. Vitamin D, Birth Control Pill"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="med-time">Time</Label>
            <Input
              id="med-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="med-frequency">Frequency</Label>
            <Select value={frequency} onValueChange={(value) => setFrequency(value as any)}>
              <SelectTrigger id="med-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="as-needed">As Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Save Medication</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
