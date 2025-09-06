import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export function MarketSentiment() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <PieChart className="h-4 w-4 text-warning" />
          Market Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 bg-gradient-card rounded-lg border flex items-center justify-center">
          <div className="text-center">
            <PieChart className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Up vs Down</p>
            <p className="text-xs text-muted-foreground">Price movement distribution</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}