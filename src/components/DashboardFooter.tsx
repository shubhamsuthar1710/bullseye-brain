import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardFooter() {
  return (
    <footer className="mt-8 pt-6 border-t border-border bg-muted/30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 <span className="font-medium">Brainybeam Info-Tech PVT LTD</span>
          </p>
          <div className="h-4 w-px bg-border" />
          <p className="text-xs text-muted-foreground">
            Advanced ML-powered stock prediction platform
          </p>
        </div>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help & Support
        </Button>
      </div>
    </footer>
  );
}