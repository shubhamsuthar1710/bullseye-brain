import { TrendingUp, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
// import logoImage from "@/assets/logo.png";

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-16 bg-gradient-header border-b border-border flex items-center justify-between px-6 shadow-soft">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-primary-foreground hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">
              📈 TSLA Stock Price Prediction Dashboard
            </h1>
            <p className="text-sm text-primary-foreground/80">
              Advanced ML models for data scientists & traders
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-white/10"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </header>
  );
}