
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { Pill } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function MedicationReminders() {
  const { medications, updateMedication } = useWellness();
  
  const today = new Date().toISOString().split('T')[0];
  
  const handleToggleTaken = (id: string, taken: boolean) => {
    updateMedication(id, {
      taken,
      lastTaken: taken ? today : undefined
    });
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Pill className="h-5 w-5 mr-2" />
          Medication Reminders
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/medications">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {medications.length > 0 ? (
          <ul className="space-y-3">
            {medications.map((med) => (
              <li key={med.id} className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  <Checkbox 
                    id={`med-${med.id}`}
                    checked={med.taken}
                    onCheckedChange={(checked) => handleToggleTaken(med.id, checked === true)}
                    className="mr-3"
                  />
                  <div>
                    <label htmlFor={`med-${med.id}`} className="font-medium text-sm">
                      {med.name}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {med.time} • {med.frequency}
                    </p>
                  </div>
                </div>
                {med.lastTaken && (
                  <span className="text-xs text-muted-foreground">
                    Last taken: {med.lastTaken === today ? 'Today' : med.lastTaken}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-2">No medication reminders</p>
            <Button asChild>
              <Link to="/medications">Add medication</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
