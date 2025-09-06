import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Activity } from "lucide-react";

export function TradingRecommendation() {
  return (
    <Card className="shadow-soft bg-gradient-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent" />
          Trading Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Signal</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-success text-success-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  BUY
                </Badge>
                <span className="text-lg font-bold text-foreground">$267.50</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">Confidence</p>
              <p className="text-2xl font-bold text-accent mt-1">84%</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Target Price</p>
              <p className="text-sm font-semibold text-success">$275.20</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Stop Loss</p>
              <p className="text-sm font-semibold text-destructive">$258.90</p>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Based on Random Forest model with 84% confidence. Last predicted direction: 
              <span className="font-medium text-success"> +2.9% upward trend</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}