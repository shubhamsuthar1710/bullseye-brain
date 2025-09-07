"""
📈 TSLA Stock Price Prediction Dashboard - Streamlit Backend

REQUIREMENTS:
pip install streamlit pandas scikit-learn yfinance plotly

RUN COMMAND:
streamlit run streamlit_app.py

DESCRIPTION:
This Streamlit app provides a complete stock prediction pipeline with:
- Data loading (CSV upload or Yahoo Finance fetching)
- Feature engineering (moving averages, technical indicators)
- Multiple ML models (Linear Regression, Decision Tree, Random Forest)
- Interactive visualizations and model performance metrics
- Downloadable predictions and trading recommendations
"""
# PS C:\Users\shubham\Documents\GitHub\bullseye-brain> cd "C:\Users\shubham\Documents\GitHub\bullseye-brain\src\python-backend"
# PS C:\Users\shubham\Documents\GitHub\bullseye-brain\src\python-backend> py -m streamlit run streamlit_app.py

import streamlit as st
import pandas as pd
import numpy as np
import yfinance as yf
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# Page configuration
st.set_page_config(
    page_title="TSLA Stock Price Prediction Dashboard",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for financial styling
st.markdown("""
<style>
  .main {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); /* dark navy tones */
}

.metric-card {
    background: #1e293b; /* navy background */
    color: #f8fafc; /* light text for contrast */
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    border: 1px solid #334155;
}

.sidebar .sidebar-content {
    background: linear-gradient(135deg, #000000 0%, #1e40af 100%); /* black to deep navy */
    color: #f8fafc;
}

.recommendation-box {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 1.5rem;
    border-radius: 12px;
    border: 2px solid #2563eb; /* bright blue accent */
    margin: 1rem 0;
    color: #f8fafc;
}

</style>
""", unsafe_allow_html=True)

# Header
st.markdown("""
<div style='background: linear-gradient(135deg, #1e40af 0%, #059669 100%); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;'>
    <h1 style='color: white; margin: 0; font-size: 2.5rem;'>TSLA Stock Price Prediction Dashboard</h1>
    <p style='color: rgba(255,255,255,0.8); margin: 0.5rem 0 0 0; font-size: 1.1rem;'>Advanced ML models for data scientists & traders</p>
</div>
""", unsafe_allow_html=True)

# Sidebar Configuration
st.sidebar.markdown("## Configuration")

# Data Source Selection
data_source = st.sidebar.radio(
    "📊 Data Source",
    ["Use Sample Data", "Upload CSV", "Fetch from Yahoo Finance"],
    help="Choose how to load TSLA stock data"
)

# File upload or date range based on selection
uploaded_file = None
start_date = datetime(2023, 1, 1)
end_date = datetime(2024, 1, 1)

if data_source == "Upload CSV":
    uploaded_file = st.sidebar.file_uploader(
        "Upload TSLA CSV file",
        type=['csv'],
        help="CSV should contain Date, Open, High, Low, Close, Volume columns"
    )
elif data_source == "Fetch from Yahoo Finance":
    col1, col2 = st.sidebar.columns(2)
    with col1:
        start_date = st.date_input("Start Date", value=start_date)
    with col2:
        end_date = st.date_input("End Date", value=end_date)

# Model Selection
st.sidebar.markdown("### 🧠 Model Selection")
model_type = st.sidebar.selectbox(
    "Choose ML Model",
    ["Linear Regression", "Decision Tree", "Random Forest"],
    help="Select the machine learning model for prediction"
)

# Hyperparameters based on model
if model_type == "Random Forest":
    n_estimators = st.sidebar.number_input("n_estimators", min_value=10, max_value=500, value=100)
    max_depth = st.sidebar.number_input("max_depth", min_value=3, max_value=50, value=10)
elif model_type == "Decision Tree":
    max_depth = st.sidebar.number_input("max_depth", min_value=3, max_value=50, value=5)

# Action buttons
run_prediction = st.sidebar.button("🚀 Run Prediction", type="primary")
reset_data = st.sidebar.button("🔄 Reset")

# Helper function to load and prepare data
@st.cache_data
def load_data(source, file=None, start=None, end=None):
    """Load TSLA stock data from various sources"""
    if source == "Use Sample Data":
        # Generate sample TSLA-like data
        dates = pd.date_range(start='2023-01-01', end='2024-01-01', freq='D')
        dates = dates[dates.dayofweek < 5]  # Remove weekends
        
        np.random.seed(42)
        price = 250
        data = []
        
        for date in dates:
            price += np.random.normal(0, 5)
            high = price + abs(np.random.normal(0, 3))
            low = price - abs(np.random.normal(0, 3))
            volume = np.random.randint(20000000, 35000000)
            
            data.append({
                'Date': date,
                'Open': price + np.random.normal(0, 2),
                'High': high,
                'Low': low,
                'Close': price,
                'Volume': volume
            })
        
        df = pd.DataFrame(data)
        
    elif source == "Upload CSV" and file is not None:
        df = pd.read_csv(file)
        df['Date'] = pd.to_datetime(df['Date'])
        
    elif source == "Fetch from Yahoo Finance":
        ticker = yf.Ticker("TSLA")
        df = ticker.history(start=start, end=end)
        df.reset_index(inplace=True)
        df.columns = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'Dividends', 'Stock Splits']
        df = df[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']]
    
    return df

def prepare_features(df):
    """Engineer features for ML models"""
    df = df.copy()
    df = df.sort_values('Date')
    
    # Technical indicators
    df['MA_5'] = df['Close'].rolling(window=5).mean()
    df['MA_20'] = df['Close'].rolling(window=20).mean()
    df['MA_50'] = df['Close'].rolling(window=50).mean()
    
    # Price features
    df['Price_Change'] = df['Close'].pct_change()
    df['High_Low_Pct'] = (df['High'] - df['Low']) / df['Close']
    df['Volume_MA'] = df['Volume'].rolling(window=10).mean()
    
    # Lag features
    for i in [1, 2, 3, 5]:
        df[f'Close_Lag_{i}'] = df['Close'].shift(i)
    
    # Target variable (next day's close price)
    df['Target'] = df['Close'].shift(-1)
    
    return df.dropna()

def train_model(df, model_type, **kwargs):
    """Train the selected ML model"""
    feature_cols = [col for col in df.columns if col not in ['Date', 'Target', 'Close']]
    X = df[feature_cols]
    y = df['Target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    if model_type == "Linear Regression":
        model = LinearRegression()
    elif model_type == "Decision Tree":
        model = DecisionTreeRegressor(max_depth=kwargs.get('max_depth', 5), random_state=42)
    elif model_type == "Random Forest":
        model = RandomForestRegressor(
            n_estimators=kwargs.get('n_estimators', 100),
            max_depth=kwargs.get('max_depth', 10),
            random_state=42
        )
    
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)
    
    return model, X_test, y_test, y_pred, mse, rmse, r2

# Main Application Logic
if run_prediction or 'data' not in st.session_state:
    try:
        # Load data
        with st.spinner("Loading data..."):
            if data_source == "Upload CSV" and uploaded_file is None:
                st.error("Please upload a CSV file")
                st.stop()
            
            df = load_data(data_source, uploaded_file, start_date, end_date)
            
        if len(df) < 100:
            st.error("Need at least 100 data points for reliable predictions")
            st.stop()
            
        # Prepare features
        with st.spinner("Engineering features..."):
            df_features = prepare_features(df)
            
        # Train model
        with st.spinner("Training model..."):
            kwargs = {}
            if model_type == "Random Forest":
                kwargs = {'n_estimators': n_estimators, 'max_depth': max_depth}
            elif model_type == "Decision Tree":
                kwargs = {'max_depth': max_depth}
                
            model, X_test, y_test, y_pred, mse, rmse, r2 = train_model(df_features, model_type, **kwargs)
        
        # Store in session state
        st.session_state.data = df
        st.session_state.features = df_features
        st.session_state.model = model
        st.session_state.metrics = {'mse': mse, 'rmse': rmse, 'r2': r2}
        st.session_state.predictions = {'y_test': y_test, 'y_pred': y_pred}
        
        st.success("✅ Model trained successfully!")
        
    except Exception as e:
        st.error(f"Error in model training: {str(e)}")

# Display results if data is available
if 'data' in st.session_state:
    df = st.session_state.data
    metrics = st.session_state.metrics
    
    # Metrics row
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown(f"""
        <div class="metric-card">
            <h3 style="color: #ef4444; margin: 0;">Mean Squared Error</h3>
            <h2 style="margin: 0.5rem 0;">{metrics['mse']:.4f}</h2>
            <p style="color: #6b7280; margin: 0;">Lower is better</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
        <div class="metric-card">
            <h3 style="color: #f59e0b; margin: 0;">RMSE</h3>
            <h2 style="margin: 0.5rem 0;">{metrics['rmse']:.4f}</h2>
            <p style="color: #6b7280; margin: 0;">Model accuracy</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown(f"""
        <div class="metric-card">
            <h3 style="color: #10b981; margin: 0;">R² Score</h3>
            <h2 style="margin: 0.5rem 0;">{metrics['r2']:.4f}</h2>
            <p style="color: #6b7280; margin: 0;">Variance explained</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Main dashboard
    col1, col2 = st.columns([1, 2])
    
    with col1:
        # Data preview
        st.subheader("📊 Data Preview")
        st.dataframe(df.head(), use_container_width=True)
        st.caption(f"Showing first 5 rows of {len(df)} total records")
        
        # Trading recommendation
        last_prediction = st.session_state.predictions['y_pred'][-1]
        last_actual = df['Close'].iloc[-1]
        direction = "📈 BUY" if last_prediction > last_actual else "📉 SELL"
        confidence = min(95, metrics['r2'] * 100)
        
        st.markdown(f"""
        <div class="recommendation-box">
            <h3 style="margin: 0; color: #1e40af;">🎯 Trading Recommendation</h3>
            <div style="display: flex; justify-content: space-between; margin: 1rem 0;">
                <div>
                    <p style="margin: 0; color: #6b7280;">Signal</p>
                    <h2 style="margin: 0; color: {'#10b981' if 'BUY' in direction else '#ef4444'};">{direction}</h2>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; color: #6b7280;">Confidence</p>
                    <h2 style="margin: 0; color: #1e40af;">{confidence:.0f}%</h2>
                </div>
            </div>
            <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">
                Predicted price: ${last_prediction:.2f} | Current: ${last_actual:.2f}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        # Price chart
        st.subheader("📈 TSLA Price Chart")
        
        fig = go.Figure()
        
        # Add price line
        fig.add_trace(go.Scatter(
            x=df['Date'],
            y=df['Close'],
            mode='lines',
            name='Close Price',
            line=dict(color='#1e40af', width=2)
        ))
        
        # Add moving averages if available
        if 'MA_20' in st.session_state.features.columns:
            df_ma = st.session_state.features
            fig.add_trace(go.Scatter(
                x=df_ma['Date'],
                y=df_ma['MA_20'],
                mode='lines',
                name='MA20',
                line=dict(color='#f59e0b', width=1, dash='dash')
            ))
            
            fig.add_trace(go.Scatter(
                x=df_ma['Date'],
                y=df_ma['MA_50'],
                mode='lines',
                name='MA50',
                line=dict(color='#10b981', width=1, dash='dash')
            ))
        
        fig.update_layout(
            template='plotly_white',
            height=400,
            showlegend=True,
            title="TSLA Stock Price with Moving Averages"
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    # Prediction visualization
    st.subheader("🎯 Actual vs Predicted Prices")
    
    y_test = st.session_state.predictions['y_test']
    y_pred = st.session_state.predictions['y_pred']
    
    fig_pred = go.Figure()
    
    fig_pred.add_trace(go.Scatter(
        x=list(range(len(y_test))),
        y=y_test,
        mode='lines+markers',
        name='Actual',
        line=dict(color='#1e40af')
    ))
    
    fig_pred.add_trace(go.Scatter(
        x=list(range(len(y_pred))),
        y=y_pred,
        mode='lines+markers',
        name='Predicted',
        line=dict(color='#ef4444', dash='dash')
    ))
    
    fig_pred.update_layout(
        template='plotly_white',
        height=400,
        title=f"Model Performance: {model_type}",
        xaxis_title="Test Samples",
        yaxis_title="Price ($)"
    )
    
    st.plotly_chart(fig_pred, use_container_width=True)
    
    # Download section
    st.subheader("💾 Download Results")
    
    col1, col2 = st.columns(2)
    
    with col1:
        if st.button("📊 Download Predictions CSV"):
            predictions_df = pd.DataFrame({
                'Actual': y_test,
                'Predicted': y_pred,
                'Error': y_test - y_pred
            })
            csv = predictions_df.to_csv(index=False)
            st.download_button(
                label="📥 Download CSV",
                data=csv,
                file_name=f"tsla_predictions_{model_type.lower().replace(' ', '_')}.csv",
                mime="text/csv"
            )
    
    with col2:
        if st.button("📈 Download Full Dataset"):
            csv_full = st.session_state.features.to_csv(index=False)
            st.download_button(
                label="📥 Download Full Data",
                data=csv_full,
                file_name="tsla_dataset_with_features.csv",
                mime="text/csv"
            )

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #6b7280; padding: 2rem;'>
    <p>© 2024 <strong>Brainybeam Info-Tech PVT LTD</strong> | Advanced ML-powered stock prediction platform</p>
    
</div>
""", unsafe_allow_html=True)

# Help section in sidebar
st.sidebar.markdown("---")
st.sidebar.markdown("### 💡 Quick Help")
st.sidebar.info("""
**How to use:**
1. Select your data source
2. Choose ML model & parameters  
3. Click 'Run Prediction'
4. Analyze results & download

**Features:**
- Real-time TSLA data from Yahoo Finance
- Multiple ML models comparison
- Interactive charts with zoom & tooltips
- Downloadable predictions
- Trading recommendations with confidence scores
""")