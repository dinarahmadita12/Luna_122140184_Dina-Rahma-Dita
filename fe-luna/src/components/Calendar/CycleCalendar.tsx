
import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWellness } from "@/contexts/WellnessContext";
import { Button } from "@/components/ui/button";

export function CycleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { cycleData, updateCycleDay } = useWellness();

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
  
  const formatDateKey = (date: Date) => format(date, "yyyy-MM-dd");
  
  const handleDayClick = (date: Date) => {
    const dateKey = formatDateKey(date);
    const existingData = cycleData[dateKey] || { date: dateKey, isPeriod: false, isFertile: false, isOvulation: false };
    
    // Toggle period status when a day is clicked
    updateCycleDay(dateKey, { 
      ...existingData,
      isPeriod: !existingData.isPeriod,
      // If we're setting as a period, default to light flow
      flow: !existingData.isPeriod ? 'light' : null
    });
  };

  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4 rounded-lg bg-white border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={prevMonth} size="sm">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-semibold text-lg">{format(currentMonth, "MMMM yyyy")}</h2>
        <Button variant="ghost" onClick={nextMonth} size="sm">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, index) => (
          <div key={`empty-start-${index}`} className="calendar-day opacity-0"></div>
        ))}
        
        {days.map((day) => {
          const dateKey = formatDateKey(day);
          const dayData = cycleData[dateKey] || { isPeriod: false, isFertile: false, isOvulation: false };
          
          const classNames = [
            "calendar-day",
            dayData.isPeriod ? "period" : "",
            dayData.isOvulation ? "ovulation" : "",
            dayData.isFertile && !dayData.isPeriod && !dayData.isOvulation ? "fertile" : "",
            isSameDay(day, new Date()) ? "ring-2 ring-primary" : "",
            !isSameMonth(day, currentMonth) ? "text-muted-foreground opacity-50" : ""
          ].filter(Boolean).join(" ");
          
          return (
            <button 
              key={day.toString()} 
              className={classNames}
              onClick={() => handleDayClick(day)}
              title={dayData.isPeriod ? "Period day" : dayData.isOvulation ? "Ovulation day" : dayData.isFertile ? "Fertile window" : ""}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-luna-rose mr-1"></div>
          <span>Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-luna-blue mr-1"></div>
          <span>Ovulation</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-luna-blue/20 mr-1"></div>
          <span>Fertile</span>
        </div>
      </div>
    </div>
  );
}
