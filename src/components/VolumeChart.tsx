import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function VolumeChart() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-accent" />
          Volume Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 bg-gradient-card rounded-lg border flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Volume Chart</p>
            <p className="text-xs text-muted-foreground">Daily trading volume</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}