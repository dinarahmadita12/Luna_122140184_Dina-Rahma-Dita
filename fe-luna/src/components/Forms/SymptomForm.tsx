
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useWellness } from "@/contexts/WellnessContext";
import { useToast } from "@/components/ui/use-toast";

const commonSymptoms = [
  "Headache",
  "Cramps",
  "Fatigue",
  "Bloating",
  "Backache",
  "Breast tenderness",
  "Acne",
  "Nausea",
  "Insomnia",
  "Dizziness",
  "Mood swings"
];

export function SymptomForm() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [intensity, setIntensity] = useState<"mild" | "moderate" | "severe">("mild");
  const [notes, setNotes] = useState("");
  const { addSymptom } = useWellness();
  const { toast } = useToast();

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleCustomSymptomAdd = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom.trim()]);
      setCustomSymptom("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSymptoms.length === 0) {
      toast({
        title: "Please select at least one symptom",
        variant: "destructive"
      });
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    addSymptom({
      date: today,
      symptoms: selectedSymptoms,
      intensity,
      notes: notes.trim() || undefined
    });
    
    toast({
      title: "Symptoms tracked successfully",
      description: `${selectedSymptoms.length} symptom${selectedSymptoms.length > 1 ? 's' : ''} recorded`
    });
    
    // Reset form
    setSelectedSymptoms([]);
    setIntensity("mild");
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Your Symptoms</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="luna-label mb-2">Common Symptoms</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`symptom-${symptom}`}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
                    />
                    <label 
                      htmlFor={`symptom-${symptom}`}
                      className="text-sm cursor-pointer"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add custom symptom"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                className="luna-input flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCustomSymptomAdd}
                disabled={!customSymptom.trim()}
              >
                Add
              </Button>
            </div>
            
            <div>
              <h3 className="luna-label mb-2">Selected Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.length > 0 ? (
                  selectedSymptoms.map((symptom, i) => (
                    <div 
                      key={i}
                      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center"
                    >
                      {symptom}
                      <button
                        type="button"
                        className="ml-2 text-muted-foreground hover:text-foreground"
                        onClick={() => handleSymptomToggle(symptom)}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No symptoms selected</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="luna-label mb-2">Intensity</h3>
              <RadioGroup value={intensity} onValueChange={(value) => setIntensity(value as any)}>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="intensity-mild" />
                    <Label htmlFor="intensity-mild">Mild</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="intensity-moderate" />
                    <Label htmlFor="intensity-moderate">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="intensity-severe" />
                    <Label htmlFor="intensity-severe">Severe</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <label className="luna-label" htmlFor="symptom-notes">
                Notes (optional)
              </label>
              <Textarea
                id="symptom-notes"
                placeholder="Add any additional details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Save Symptoms</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
