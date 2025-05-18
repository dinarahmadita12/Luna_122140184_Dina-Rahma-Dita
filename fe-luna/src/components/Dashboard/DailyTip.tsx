
import { useWellness } from "@/contexts/WellnessContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function DailyTip() {
  const { dailyTip, refreshDailyTip } = useWellness();

  if (!dailyTip) {
    return null;
  }

  let categoryColor = 'text-luna-purple';
  let categoryBg = 'bg-luna-purple/10';
  
  switch (dailyTip.category) {
    case 'nutrition':
      categoryColor = 'text-green-600';
      categoryBg = 'bg-green-50';
      break;
    case 'exercise':
      categoryColor = 'text-blue-600';
      categoryBg = 'bg-blue-50';
      break;
    case 'mental':
      categoryColor = 'text-amber-600';
      categoryBg = 'bg-amber-50';
      break;
    case 'cycle':
      categoryColor = 'text-rose-600';
      categoryBg = 'bg-rose-50';
      break;
  }

  return (
    <Card className="overflow-hidden border-t-4 border-t-primary animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Heart className="h-5 w-5 mr-2 text-luna-rose" />
            Daily Wellness Tip
          </CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${categoryBg} ${categoryColor}`}>
            {dailyTip.category.charAt(0).toUpperCase() + dailyTip.category.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium mb-2">{dailyTip.title}</h3>
        <p className="text-muted-foreground text-sm">{dailyTip.content}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" onClick={refreshDailyTip}>
          Show another tip
        </Button>
      </CardFooter>
    </Card>
  );
}
