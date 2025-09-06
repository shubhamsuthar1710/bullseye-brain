/*
React Component Demo - TSLA Metric Card
For product/design handoff - shows the metric card structure used in the dashboard
*/

import React from 'react';

const TslaMetricCard = ({ 
  title = "R² Score", 
  value = "0.9234", 
  trend = "up",
  description = "Variance explained",
  icon: Icon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
}) => {
  const trendColors = {
    up: "text-emerald-600 bg-emerald-50",
    down: "text-red-600 bg-red-50", 
    neutral: "text-gray-600 bg-gray-50"
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${trendColors[trend]}`}>
          <Icon />
        </div>
      </div>
    </div>
  );
};

// Usage example
const App = () => {
  const TrendingUpIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">TSLA Dashboard - React Components Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <TslaMetricCard
          title="Mean Squared Error"
          value="0.0043"
          trend="down"
          description="Lower is better"
          icon={() => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M13 1v6M13 17v6M21 13h-6M7 13H1M21 6l-4.24 4.24M10.24 10.24 6 6M21 18l-4.24-4.24M10.24 13.76 6 18"/></svg>}
        />
        
        <TslaMetricCard
          title="RMSE"
          value="0.0656"
          trend="down"
          description="Model accuracy"
          icon={() => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
        />
        
        <TslaMetricCard
          title="R² Score"
          value="0.9234"
          trend="up"
          description="Variance explained"
          icon={TrendingUpIcon}
        />
      </div>
      
      <div className="mt-8 p-6 bg-white rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">Header Component Structure</h2>
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                📈
              </div>
              <div>
                <h1 className="text-xl font-bold">TSLA Stock Price Prediction Dashboard</h1>
                <p className="text-sm opacity-80">Advanced ML models for data scientists & traders</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;