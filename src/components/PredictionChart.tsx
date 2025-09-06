import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Target } from "lucide-react";

export function PredictionChart() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Actual vs Predicted
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="linear">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear Regression</SelectItem>
                <SelectItem value="tree">Decision Tree</SelectItem>
                <SelectItem value="forest">Random Forest</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-gradient-card rounded-lg border flex items-center justify-center">
          <div className="text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Model Performance</h3>
            <p className="text-sm text-muted-foreground">
              Comparison of actual vs predicted stock prices
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Interactive chart with model comparison and downloadable predictions
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}