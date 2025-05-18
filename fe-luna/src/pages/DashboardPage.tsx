
import { CycleCalendar } from "@/components/Calendar/CycleCalendar";
import { DailyTip } from "@/components/Dashboard/DailyTip";
import { MoodSummary } from "@/components/Dashboard/MoodSummary";
import { MedicationReminders } from "@/components/Dashboard/MedicationReminders";
import { SymptomSummary } from "@/components/Dashboard/SymptomSummary";

export default function Dashboard() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your wellness journey</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <MoodSummary />
            <MedicationReminders />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SymptomSummary />
            <DailyTip />
          </div>
        </div>
        
        <div>
          <CycleCalendar />
        </div>
      </div>
    </div>
  );
}
