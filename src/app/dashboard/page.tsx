'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Bell,
  DollarSign,
  BarChart2,
  AlertTriangle,
  Activity,
  ChevronRight,
  Zap
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import Link from 'next/link';

// Types
interface PortfolioData {
  value: number;
  change: number;
  changePercent: number;
}

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface AIInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'sentiment';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

interface ChartData {
  name: string;
  value: number;
}

interface AssetAllocation {
  name: string;
  value: number;
  color: string;
}

interface Prediction {
  id: string;
  name: string;
  symbol: string;
  direction: 'up' | 'down';
  confidence: number;
  reason: string;
}

interface Alert {
  id: string;
  type: string;
  asset: string | null;
  message: string;
  time: string;
}

interface StockHolding {
  symbol: string;
  name: string;
  price: number;
  change: number;
  holdings: number;
}

interface CryptoHolding {
  symbol: string;
  name: string;
  price: number;
  change: number;
  holdings: number;
}

// Dashboard Component
export default function Dashboard() {
  // State hooks
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    value: 100000,
    change: 2450,
    changePercent: 2.45
  });

  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: 'SPY', name: 'S&P 500 ETF', price: 478.34, change: 1.2 },
    { symbol: 'QQQ', name: 'Nasdaq ETF', price: 387.12, change: 1.5 },
    { symbol: 'BTC', name: 'Bitcoin', price: 67432.18, change: -2.3 },
    { symbol: 'ETH', name: 'Ethereum', price: 2845.67, change: -1.8 },
    { symbol: 'AAPL', name: 'Apple Inc', price: 198.45, change: 0.7 }
  ]);

  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'recommendation',
      title: 'Consider adding tech exposure',
      description: 'Tech sector showing strong momentum based on recent earnings reports',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'alert',
      title: 'Unusual crypto volatility',
      description: 'BTC volatility elevated, consider adjusting position sizes',
      priority: 'high'
    },
    {
      id: '3',
      type: 'sentiment',
      title: 'Market sentiment: Cautiously optimistic',
      description: 'General sentiment positive but watching Fed statements closely',
      priority: 'medium'
    }
  ]);

  // Asset allocation data
  const [assetAllocation, setAssetAllocation] = useState<AssetAllocation[]>([
    { name: "Stocks", value: 65000, color: "#4F46E5" },
    { name: "Crypto", value: 25000, color: "#10B981" },
    { name: "Cash", value: 10000, color: "#F59E0B" }
  ]);

  // Portfolio chart data
  const [portfolioChartData, setPortfolioChartData] = useState<ChartData[]>([
    { name: 'Jan', value: 85000 },
    { name: 'Feb', value: 82000 },
    { name: 'Mar', value: 88000 },
    { name: 'Apr', value: 92000 },
    { name: 'May', value: 95000 },
    { name: 'Jun', value: 98000 },
    { name: 'Jul', value: 100000 }
  ]);

  // AI Predictions
  const [predictions, setPredictions] = useState<Prediction[]>([
    { id: "1", name: "Apple", symbol: "AAPL", direction: "up", confidence: 76, reason: "Strong earnings and product pipeline" },
    { id: "2", name: "Bitcoin", symbol: "BTC", direction: "up", confidence: 82, reason: "Institutional adoption increasing" },
    { id: "3", name: "Nvidia", symbol: "NVDA", direction: "up", confidence: 89, reason: "AI demand continues to grow" },
    { id: "4", name: "Tesla", symbol: "TSLA", direction: "down", confidence: 67, reason: "Increased competition in EV market" }
  ]);

  // Alerts
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "1", type: "price", asset: "BTC", message: "Bitcoin exceeded $58,000", time: "10 minutes ago" },
    { id: "2", type: "signal", asset: "AAPL", message: "Buy signal detected for Apple", time: "1 hour ago" },
    { id: "3", type: "portfolio", asset: null, message: "Portfolio rebalance suggested", time: "3 hours ago" },
    { id: "4", type: "market", asset: null, message: "Market volatility increasing", time: "5 hours ago" }
  ]);

  // Holdings
  const [stockHoldings, setStockHoldings] = useState<StockHolding[]>([
    { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 1.2, holdings: 12500 },
    { symbol: "MSFT", name: "Microsoft Corp", price: 337.18, change: 0.8, holdings: 10800 },
    { symbol: "GOOGL", name: "Alphabet Inc", price: 145.72, change: -0.5, holdings: 8200 },
    { symbol: "AMZN", name: "Amazon.com Inc", price: 178.15, change: 2.1, holdings: 7300 }
  ]);

  const [cryptoHoldings, setCryptoHoldings] = useState<CryptoHolding[]>([
    { symbol: "BTC", name: "Bitcoin", price: 58432.12, change: 3.2, holdings: 12000 },
    { symbol: "ETH", name: "Ethereum", price: 3521.45, change: -1.5, holdings: 8000 },
    { symbol: "SOL", name: "Solana", price: 118.25, change: 5.4, holdings: 3000 },
    { symbol: "USDT", name: "Tether", price: 1.00, change: 0.0, holdings: 2000 }
  ]);

  // Simulate WebSocket connection for real-time data
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate portfolio value updates
      setPortfolioData(prev => {
        const change = (Math.random() * 100 - 50).toFixed(2);
        const newValue = prev.value + parseFloat(change);
        const newChangePercent = parseFloat(((parseFloat(change) / prev.value) * 100).toFixed(2));

        return {
          value: newValue,
          change: parseFloat(change),
          changePercent: newChangePercent
        };
      });

      // Simulate market data updates
      setMarketData(prev =>
          prev.map(item => ({
            ...item,
            price: parseFloat((item.price + (Math.random() * 2 - 1)).toFixed(2)),
            change: parseFloat((item.change + (Math.random() * 0.4 - 0.2)).toFixed(2))
          }))
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
      <div className="w-full py-6 px-4 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Left Column: Portfolio Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Summary Cards - Adjusted to only show Asset Allocation */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Asset Allocation - Now takes full width */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Asset Allocation</h2>
                  <BarChart2 className="text-blue-600" size={20} />
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                          data={assetAllocation}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                      >
                        {assetAllocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {assetAllocation.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium text-gray-600">
                          {item.name}: ${item.value.toLocaleString()} ({((item.value / portfolioData.value) * 100).toFixed(1)}%)
                        </span>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio Summary Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Portfolio Summary</h2>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Quick Trade
                </button>
              </div>

              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold">${portfolioData.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <div className={`ml-4 flex items-center ${portfolioData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {portfolioData.change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span className="ml-1">${Math.abs(portfolioData.change).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({portfolioData.changePercent}%)</span>
                </div>
              </div>

              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} domain={['dataMin - 500', 'dataMax + 500']} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <Link href="/portfolio" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View Details →
                </Link>
                <Link href="/analytics" className="text-right text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Performance Analytics →
                </Link>
              </div>
            </div>

            {/* Market Overview Strip */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Market Overview</h2>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {marketData.map((item) => (
                    <div key={item.symbol} className="flex-shrink-0 bg-gray-50 rounded-md p-3 w-40">
                      <div className="font-medium">{item.symbol}</div>
                      <div className="text-xs text-gray-500">{item.name}</div>
                      <div className="mt-1 font-semibold">${item.price}</div>
                      <div className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                        {item.change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        <span className="ml-1">{Math.abs(item.change)}%</span>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Holdings */}
            <div className="grid grid-cols-1 gap-6">
              {/* Stock Holdings */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-700">Stock Holdings</h2>
                  <button className="text-blue-600 text-sm flex items-center">
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Holdings</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {stockHoldings.map((stock, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{stock.symbol}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-gray-500">{stock.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-gray-900">${stock.price.toLocaleString()}</td>
                          <td className={`px-4 py-3 whitespace-nowrap text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-gray-900">${stock.holdings.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Crypto Holdings */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-700">Crypto Holdings</h2>
                  <button className="text-blue-600 text-sm flex items-center">
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Holdings</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {cryptoHoldings.map((crypto, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{crypto.symbol}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-gray-500">{crypto.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-gray-900">${crypto.price.toLocaleString()}</td>
                          <td className={`px-4 py-3 whitespace-nowrap text-right ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-gray-900">${crypto.holdings.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Insights */}
          <div className="space-y-6">
            {/* AI Insights Panel */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Insights</h2>
              <div className="space-y-4">
                {insights.map((insight) => (
                    <div
                        key={insight.id}
                        className={`p-3 rounded-md ${
                            insight.type === 'recommendation' ? 'bg-indigo-50' :
                                insight.type === 'alert' ? 'bg-amber-50' : 'bg-blue-50'
                        }`}
                    >
                      <div className="flex items-start">
                        {insight.type === 'recommendation' && <TrendingUp size={16} className="text-indigo-600 mt-0.5 mr-2" />}
                        {insight.type === 'alert' && <AlertTriangle size={16} className="text-amber-600 mt-0.5 mr-2" />}
                        {insight.type === 'sentiment' && <BarChart2 size={16} className="text-blue-600 mt-0.5 mr-2" />}
                        <div>
                          <h3 className="font-medium text-sm">{insight.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/insights" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All Insights →
                </Link>
              </div>
            </div>

            {/* AI Market Predictions */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-700">AI Market Predictions</h2>
                <Zap className="text-yellow-500" size={20} />
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {predictions.map((prediction, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${prediction.direction === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {prediction.direction === 'up' ?
                                <TrendingUp className="text-green-500" size={16} /> :
                                <ArrowDown className="text-red-500" size={16} />
                            }
                          </div>
                          <div>
                            <div className="font-medium">{prediction.name} ({prediction.symbol})</div>
                            <div className="text-sm text-gray-500">{prediction.reason}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${prediction.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {prediction.direction === 'up' ? 'Bullish' : 'Bearish'}
                          </div>
                          <div className="text-sm text-gray-500">{prediction.confidence}% confidence</div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts & Notifications */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-700">Alerts & Notifications</h2>
                <Bell className="text-blue-600" size={20} />
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                        <div className={`p-2 rounded-full mt-1 ${
                            alert.type === 'price' ? 'bg-blue-100' :
                                alert.type === 'signal' ? 'bg-green-100' :
                                    alert.type === 'portfolio' ? 'bg-purple-100' : 'bg-yellow-100'
                        }`}>
                          {alert.type === 'price' ? <DollarSign size={16} className="text-blue-600" /> :
                              alert.type === 'signal' ? <Activity size={16} className="text-green-600" /> :
                                  alert.type === 'portfolio' ? <BarChart2 size={16} className="text-purple-600" /> :
                                      <AlertTriangle size={16} className="text-yellow-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{alert.message}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-gray-500">{alert.time}</span>
                            {alert.type === 'signal' && (
                                <button className="text-sm text-blue-600 hover:text-blue-800">Take action</button>
                            )}
                            {alert.type === 'portfolio' && (
                                <button className="text-sm text-blue-600 hover:text-blue-800">Review</button>
                            )}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}