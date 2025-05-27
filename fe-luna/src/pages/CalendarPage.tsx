
import { CycleCalendar } from "@/components/Calendar/CycleCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { useWellness } from "@/contexts/WellnessContext";

export default function CalendarPage() {
  const { cycleData } = useWellness();
  
  // Calculate cycle stats
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");
  const currentCycleDay = Object.values(cycleData).find(day => day.date === today);
  
  // Find most recent period start date
  const periodDays = Object.values(cycleData)
    .filter(day => day.isPeriod)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const lastPeriodStart = periodDays.length > 0 ? periodDays[0].date : null;

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Cycle Calendar</h1>
        <p className="text-muted-foreground">Track and predict your menstrual cycle</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <CycleCalendar />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary border">
              <h3 className="text-lg font-medium mb-1">Cycle Insights</h3>
              <p className="text-sm text-muted-foreground">
                Track your period regularly to get more accurate predictions for your next cycle.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary border">
              <h3 className="text-lg font-medium mb-1">Tracking Tips</h3>
              <p className="text-sm text-muted-foreground">
                Click on days to mark or unmark period days. Your data helps create more accurate predictions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Today's Status</h3>
              {currentCycleDay ? (
                <div className="space-y-2">
                  {currentCycleDay.isPeriod && (
                    <div className="flex items-center p-2 bg-rose-50 text-rose-700 rounded-md">
                      <div className="w-3 h-3 rounded-full bg-luna-rose mr-2"></div>
                      <span>Period day</span>
                    </div>
                  )}
                  
                  {currentCycleDay.isOvulation && (
                    <div className="flex items-center p-2 bg-blue-50 text-blue-700 rounded-md">
                      <div className="w-3 h-3 rounded-full bg-luna-blue mr-2"></div>
                      <span>Ovulation day</span>
                    </div>
                  )}
                  
                  {currentCycleDay.isFertile && !currentCycleDay.isOvulation && (
                    <div className="flex items-center p-2 bg-blue-50/50 text-blue-700 rounded-md">
                      <div className="w-3 h-3 rounded-full bg-luna-blue/20 mr-2"></div>
                      <span>Fertile window</span>
                    </div>
                  )}
                  
                  {!currentCycleDay.isPeriod && !currentCycleDay.isFertile && (
                    <div className="flex items-center p-2 bg-green-50 text-green-700 rounded-md">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Regular day</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No data for today</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Cycle Information</h3>
              
              {lastPeriodStart ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-muted-foreground">Last period started</h4>
                    <p>{new Date(lastPeriodStart).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-muted-foreground">Average cycle length</h4>
                    <p>28 days</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-muted-foreground">Average period length</h4>
                    <p>6 days</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No period data recorded yet. Mark your period days on the calendar to see predictions.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
