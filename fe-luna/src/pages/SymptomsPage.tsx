
import { SymptomForm } from "@/components/Forms/SymptomForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SymptomsPage() {
  const { symptoms, deleteSymptom } = useWellness();
  const { toast } = useToast();
  
  const sortedSymptoms = [...symptoms].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleDelete = (id: string) => {
    deleteSymptom(id);
    toast({ title: "Symptom entry deleted" });
  };
  
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Symptom Tracker</h1>
        <p className="text-muted-foreground">Monitor physical symptoms and patterns</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <SymptomForm />
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Symptom History</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedSymptoms.length > 0 ? (
                <div className="space-y-4">
                  {sortedSymptoms.map((entry) => (
                    <div key={entry.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="font-medium">
                            {new Date(entry.date).toLocaleDateString()}
                          </p>
                          <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${
                            entry.intensity === 'mild' 
                              ? 'bg-green-100 text-green-800'
                              : entry.intensity === 'moderate'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {entry.intensity}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(entry.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {entry.symptoms.map((symptom, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-secondary px-2 py-0.5 rounded-full"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                      {entry.notes && (
                        <p className="text-sm bg-secondary/50 p-2 rounded-md mt-2">{entry.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No symptom entries yet</p>
                  <p className="text-sm">Use the form to start tracking your symptoms</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
