import { useState } from "react";
import { Upload, Database, Calendar, Brain, Play, RotateCcw, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function DashboardSidebar() {
  const [dataSource, setDataSource] = useState("fetch");
  const [model, setModel] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunPrediction = () => {
    setIsRunning(true);
    // Simulate API call
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <Sidebar className="w-80 border-r border-border">
      <SidebarContent className="p-6 space-y-6">
        {/* Data Source */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Source
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <RadioGroup value={dataSource} onValueChange={setDataSource} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="local" id="local" />
                <Label htmlFor="local" className="text-sm">Use local CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="upload" />
                <Label htmlFor="upload" className="text-sm">Upload CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fetch" id="fetch" />
                <Label htmlFor="fetch" className="text-sm">Fetch from Yahoo Finance</Label>
              </div>
            </RadioGroup>

            {dataSource === "upload" && (
              <Card className="mt-3 p-4 border-dashed border-2">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <Label htmlFor="file-upload" className="text-sm cursor-pointer text-primary hover:text-primary-glow">
                    Click to upload CSV file
                  </Label>
                  <Input id="file-upload" type="file" accept=".csv" className="hidden" />
                </div>
              </Card>
            )}

            {dataSource === "fetch" && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="start-date" className="text-xs text-muted-foreground">Start Date</Label>
                    <Input id="start-date" type="date" defaultValue="2023-01-01" className="h-8" />
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-xs text-muted-foreground">End Date</Label>
                    <Input id="end-date" type="date" defaultValue="2024-01-01" className="h-8" />
                  </div>
                </div>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Model Selection */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Model Selection
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Choose ML model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear Regression</SelectItem>
                <SelectItem value="tree">Decision Tree</SelectItem>
                <SelectItem value="forest">Random Forest</SelectItem>
              </SelectContent>
            </Select>

            {model === "forest" && (
              <div className="mt-3 space-y-3">
                <div>
                  <Label htmlFor="n-estimators" className="text-xs text-muted-foreground">
                    n_estimators
                  </Label>
                  <Input id="n-estimators" type="number" defaultValue="100" className="h-8" />
                </div>
                <div>
                  <Label htmlFor="max-depth" className="text-xs text-muted-foreground">
                    max_depth
                  </Label>
                  <Input id="max-depth" type="number" defaultValue="10" className="h-8" />
                </div>
              </div>
            )}

            {model === "tree" && (
              <div className="mt-3">
                <Label htmlFor="tree-depth" className="text-xs text-muted-foreground">
                  max_depth
                </Label>
                <Input id="tree-depth" type="number" defaultValue="5" className="h-8" />
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Actions */}
        <SidebarGroup>
          <SidebarGroupContent className="space-y-3">
            <Button 
              onClick={handleRunPrediction}
              disabled={!model || isRunning}
              className="w-full shadow-glow"
              size="lg"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Prediction
                </>
              )}
            </Button>
            
            <Button variant="outline" className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help */}
        <Card className="p-4 bg-gradient-card">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-primary mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-foreground mb-1">Quick Start</p>
              <p className="text-muted-foreground">
                Select data source, choose your ML model, and click Run Prediction to get insights.
              </p>
            </div>
          </div>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
}