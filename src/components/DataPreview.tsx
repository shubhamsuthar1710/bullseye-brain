import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database, CheckCircle } from "lucide-react";

const sampleData = [
  { date: "2024-01-01", open: 248.42, high: 251.83, low: 247.11, close: 250.08, volume: "25.2M" },
  { date: "2024-01-02", open: 250.08, high: 253.45, low: 249.85, close: 252.17, volume: "27.8M" },
  { date: "2024-01-03", open: 252.17, high: 254.92, low: 251.33, close: 253.18, volume: "24.1M" },
  { date: "2024-01-04", open: 253.18, high: 255.67, low: 252.44, close: 254.25, volume: "26.5M" },
  { date: "2024-01-05", open: 254.25, high: 256.89, low: 253.12, close: 255.73, volume: "28.9M" },
];

export function DataPreview() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Preview
          </CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-success" />
            Data Loaded
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-xs font-medium">Date</TableHead>
                <TableHead className="text-xs font-medium text-right">Open</TableHead>
                <TableHead className="text-xs font-medium text-right">High</TableHead>
                <TableHead className="text-xs font-medium text-right">Low</TableHead>
                <TableHead className="text-xs font-medium text-right">Close</TableHead>
                <TableHead className="text-xs font-medium text-right">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="text-xs font-mono">{row.date}</TableCell>
                  <TableCell className="text-xs font-mono text-right">${row.open}</TableCell>
                  <TableCell className="text-xs font-mono text-right text-success">${row.high}</TableCell>
                  <TableCell className="text-xs font-mono text-right text-destructive">${row.low}</TableCell>
                  <TableCell className="text-xs font-mono text-right font-medium">${row.close}</TableCell>
                  <TableCell className="text-xs font-mono text-right text-muted-foreground">{row.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Showing first 5 rows of 1,247 total records • TSLA stock data from Yahoo Finance
        </p>
      </CardContent>
    </Card>
  );
}