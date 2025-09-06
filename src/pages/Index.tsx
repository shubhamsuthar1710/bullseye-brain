import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MetricCard } from "@/components/MetricCard";
import { DataPreview } from "@/components/DataPreview";
import { PriceChart } from "@/components/PriceChart";
import { VolumeChart } from "@/components/VolumeChart";
import { MarketSentiment } from "@/components/MarketSentiment";
import { PredictionChart } from "@/components/PredictionChart";
import { TradingRecommendation } from "@/components/TradingRecommendation";
import { DashboardFooter } from "@/components/DashboardFooter";
import { Activity, Target, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <DashboardHeader />
        
        <div className="flex flex-1">
          <DashboardSidebar />
          
          <main className="flex-1 p-6 overflow-auto">
            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard
                title="Mean Squared Error"
                value="0.0043"
                icon={Target}
                trend="down"
                description="Lower is better"
              />
              <MetricCard
                title="Root Mean Squared Error"
                value="0.0656"
                icon={Activity}
                trend="down"
                description="Model accuracy"
              />
              <MetricCard
                title="R² Score"
                value="0.9234"
                icon={TrendingUp}
                trend="up"
                description="Variance explained"
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              {/* Left Column */}
              <div className="lg:col-span-4 space-y-6">
                <DataPreview />
                <TradingRecommendation />
              </div>

              {/* Center Column */}
              <div className="lg:col-span-5">
                <PriceChart />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 space-y-6">
                <VolumeChart />
                <MarketSentiment />
              </div>
            </div>

            {/* Prediction Chart */}
            <div className="mb-6">
              <PredictionChart />
            </div>
          </main>
        </div>

        <DashboardFooter />
      </div>
    </SidebarProvider>
  );
};

export default Index;
