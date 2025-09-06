import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, TrendingUp } from "lucide-react";

export function PriceChart() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          TSLA Price Chart with Moving Averages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-gradient-card rounded-lg border flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Price Chart</h3>
            <p className="text-sm text-muted-foreground">
              Line chart showing Close price with MA50 & MA200 overlays
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Features: Tooltip, zoom, crosshair, time range selector
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}