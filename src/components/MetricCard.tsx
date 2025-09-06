import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  description?: string;
}

export function MetricCard({ title, value, icon: Icon, trend = "neutral", description }: MetricCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive", 
    neutral: "text-muted-foreground"
  };

  const bgColors = {
    up: "bg-success/10",
    down: "bg-destructive/10",
    neutral: "bg-muted/50"
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            bgColors[trend]
          )}>
            <Icon className={cn("h-6 w-6", trendColors[trend])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}