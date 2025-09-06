# 📈 TSLA Stock Price Prediction Dashboard

A modern, clean, and visually engaging dashboard for stock prediction using machine learning models. Designed for data scientists and retail traders who want a quick upload → predict → insight flow.

## 🚀 Features

### Frontend (React/TypeScript)
- **Modern Dashboard UI**: Clean financial theme with blue/green accents
- **Collapsible Sidebar**: Data source selection, model configuration, hyperparameters
- **Responsive Grid Layout**: Metric cards, interactive charts, data preview
- **Real-time Metrics**: MSE, RMSE, R² score with color-coded status indicators
- **Interactive Charts**: Price trends with moving averages, volume analysis, market sentiment
- **Trading Recommendations**: AI-powered buy/hold/sell signals with confidence indicators

### Backend (Streamlit/Python)
- **Multiple Data Sources**: Local CSV upload, Yahoo Finance API integration
- **Feature Engineering**: Moving averages, technical indicators, lag features
- **ML Models**: Linear Regression, Decision Tree, Random Forest with hyperparameter tuning
- **Model Performance**: Comprehensive metrics and visualizations
- **Export Capabilities**: Downloadable predictions and datasets

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS with custom design system
- Shadcn/ui components
- Lucide React icons
- Vite build system

**Backend:**
- Streamlit for web interface
- Pandas for data processing
- Scikit-learn for ML models
- yfinance for real-time data
- Plotly for interactive charts

## 🏃‍♂️ Quick Start

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Python Backend
```bash
# Install Python dependencies
pip install -r src/python-backend/requirements.txt

# Run Streamlit app
streamlit run src/python-backend/streamlit_app.py
```

## 📊 Usage Flow

1. **Data Selection**: Choose between local CSV, file upload, or Yahoo Finance API
2. **Model Configuration**: Select ML algorithm and tune hyperparameters
3. **Feature Engineering**: Automatic technical indicators and lag features
4. **Training & Prediction**: One-click model training with progress indicators
5. **Analysis**: Interactive charts, performance metrics, and trading signals
6. **Export**: Download predictions and datasets for further analysis

## 🎨 Design System

The dashboard uses a professional financial design system with:

- **Colors**: Primary blue (#3b82f6), Success green (#10b981), Warning amber (#f59e0b)
- **Gradients**: Subtle header and card gradients for depth
- **Typography**: Modern sans-serif with proper hierarchy
- **Shadows**: Soft shadows with hover effects
- **Responsive**: Mobile-first grid system

## 📱 Components

### Core Components
- `DashboardHeader`: App branding with gradient background
- `DashboardSidebar`: Model configuration and data source selection
- `MetricCard`: Financial metrics with trend indicators
- `PriceChart`: Interactive stock price visualization
- `TradingRecommendation`: AI-powered trading signals

### React Demo
A minimal React component (`src/components/react-demo/TslaMetricCard.jsx`) is included for design handoff and integration reference.

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. Yahoo Finance data is fetched directly through the yfinance library.

### Customization
- Update design tokens in `src/index.css`
- Modify component variants in individual component files
- Extend ML models in the Streamlit backend

## 📈 ML Models

**Supported Algorithms:**
- **Linear Regression**: Fast baseline model
- **Decision Tree**: Interpretable non-linear model  
- **Random Forest**: Ensemble method with hyperparameter tuning

**Feature Engineering:**
- Moving averages (5, 20, 50 day)
- Price change percentages
- High-low volatility indicators
- Volume-based features
- Lag features (1, 2, 3, 5 days)

**Performance Metrics:**
- Mean Squared Error (MSE)
- Root Mean Squared Error (RMSE)
- R² Score (coefficient of determination)

## 🏢 About

Developed by **Brainybeam Info-Tech PVT LTD**

This dashboard provides a professional-grade interface for stock prediction analysis, combining modern web technologies with robust machine learning capabilities.

## 📄 License

This project is provided as a reference implementation for stock prediction dashboards. Modify and adapt according to your specific requirements.

---

**Note**: This dashboard is for educational and research purposes. Always consult with financial advisors before making investment decisions.