
import { MedicationForm } from "@/components/Forms/MedicationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { Button } from "@/components/ui/button";
import { Trash2, Check, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export default function MedicationsPage() {
  const { medications, updateMedication, deleteMedication } = useWellness();
  const { toast } = useToast();
  
  const today = new Date().toISOString().split('T')[0];
  
  const handleToggleTaken = (id: string, taken: boolean) => {
    updateMedication(id, {
      taken,
      lastTaken: taken ? today : undefined
    });
    
    if (taken) {
      toast({ title: "Medication marked as taken" });
    }
  };
  
  const handleDelete = (id: string) => {
    deleteMedication(id);
    toast({ title: "Medication reminder deleted" });
  };
  
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Medication Reminders</h1>
        <p className="text-muted-foreground">Never miss your medications</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <MedicationForm />
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Medications</CardTitle>
            </CardHeader>
            <CardContent>
              {medications.length > 0 ? (
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Checkbox 
                            checked={med.taken}
                            onCheckedChange={(checked) => handleToggleTaken(med.id, checked === true)}
                            className="mr-3"
                            id={`med-${med.id}`}
                          />
                          <div>
                            <label htmlFor={`med-${med.id}`} className="font-medium cursor-pointer">
                              {med.name}
                            </label>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{med.time}</span>
                              <span className="mx-1">•</span>
                              <span className="capitalize">{med.frequency}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {med.lastTaken && (
                            <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              {med.lastTaken === today ? 'Taken today' : `Last: ${med.lastTaken}`}
                            </div>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(med.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No medication reminders set</p>
                  <p className="text-sm">Use the form to add medication reminders</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
