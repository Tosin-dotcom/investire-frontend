'use client'

import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, BarChart2, Settings, Star, Clock, ArrowUpRight, ArrowDownRight, Filter, ChevronDown, Layers, Award, Activity } from 'lucide-react';

export default function Market() {
  const [activeTab, setActiveTab] = useState('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activeSection, setActiveSection] = useState('all');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  // Sample data - would come from your Alpaca/Binance APIs
  const stockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 187.62, change: 1.24, percentChange: 0.67, industry: 'Technology', popularity: 98, volume: '146.2M' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 421.90, change: 5.32, percentChange: 1.28, industry: 'Technology', popularity: 96, volume: '24.5M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 164.35, change: -2.41, percentChange: -1.45, industry: 'Technology', popularity: 95, volume: '32.7M' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 182.50, change: 0.75, percentChange: 0.41, industry: 'Retail', popularity: 97, volume: '53.8M' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 177.90, change: -5.63, percentChange: -3.07, industry: 'Automotive', popularity: 99, volume: '125.4M' },
    { symbol: 'WMT', name: 'Walmart Inc.', price: 68.42, change: 0.37, percentChange: 0.54, industry: 'Retail', popularity: 87, volume: '12.3M' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 196.76, change: -1.53, percentChange: -0.77, industry: 'Financial', popularity: 85, volume: '9.8M' },
    { symbol: 'V', name: 'Visa Inc.', price: 275.38, change: 3.21, percentChange: 1.18, industry: 'Financial', popularity: 88, volume: '7.4M' },
    { symbol: 'PG', name: 'Procter & Gamble Co.', price: 165.27, change: 0.82, percentChange: 0.50, industry: 'Consumer Goods', popularity: 79, volume: '5.6M' },
    { symbol: 'DIS', name: 'Walt Disney Co.', price: 102.65, change: -0.42, percentChange: -0.41, industry: 'Entertainment', popularity: 91, volume: '10.2M' }
  ];

  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 65423.78, change: 1243.50, percentChange: 1.94, industry: 'Currency', popularity: 100, volume: '$42.5B' },
    { symbol: 'ETH', name: 'Ethereum', price: 3562.45, change: -85.30, percentChange: -2.34, industry: 'Smart Contracts', popularity: 98, volume: '$21.8B' },
    { symbol: 'SOL', name: 'Solana', price: 148.62, change: 5.68, percentChange: 3.97, industry: 'Smart Contracts', popularity: 94, volume: '$6.2B' },
    { symbol: 'ADA', name: 'Cardano', price: 0.42, change: 0.02, percentChange: 4.99, industry: 'Smart Contracts', popularity: 88, volume: '$1.5B' },
    { symbol: 'DOT', name: 'Polkadot', price: 6.18, change: -0.24, percentChange: -3.74, industry: 'Interoperability', popularity: 84, volume: '$752M' },
    { symbol: 'LINK', name: 'Chainlink', price: 15.32, change: 0.87, percentChange: 6.02, industry: 'Oracle', popularity: 86, volume: '$895M' },
    { symbol: 'AVAX', name: 'Avalanche', price: 37.25, change: -1.23, percentChange: -3.19, industry: 'Smart Contracts', popularity: 89, volume: '$1.2B' },
    { symbol: 'MATIC', name: 'Polygon', price: 0.67, change: 0.03, percentChange: 4.68, industry: 'Layer 2', popularity: 90, volume: '$975M' },
    { symbol: 'UNI', name: 'Uniswap', price: 8.24, change: 0.14, percentChange: 1.73, industry: 'DEX', popularity: 85, volume: '$652M' },
    { symbol: 'AAVE', name: 'Aave', price: 96.15, change: -3.45, percentChange: -3.46, industry: 'DeFi', popularity: 82, volume: '$486M' }
  ];

  const commodityData = [
    { symbol: 'GC', name: 'Gold', price: 2376.50, change: 15.30, percentChange: 0.65, industry: 'Precious Metals', popularity: 95, volume: '224K' },
    { symbol: 'SI', name: 'Silver', price: 28.12, change: 0.32, percentChange: 1.15, industry: 'Precious Metals', popularity: 89, volume: '86K' },
    { symbol: 'CL', name: 'Crude Oil', price: 78.54, change: -1.28, percentChange: -1.60, industry: 'Energy', popularity: 94, volume: '312K' },
    { symbol: 'NG', name: 'Natural Gas', price: 2.15, change: 0.09, percentChange: 4.37, industry: 'Energy', popularity: 88, volume: '108K' },
    { symbol: 'HG', name: 'Copper', price: 4.36, change: -0.05, percentChange: -1.13, industry: 'Base Metals', popularity: 85, volume: '61K' },
    { symbol: 'ZC', name: 'Corn', price: 438.25, change: 4.75, percentChange: 1.10, industry: 'Agriculture', popularity: 82, volume: '132K' },
    { symbol: 'ZW', name: 'Wheat', price: 586.50, change: -7.25, percentChange: -1.22, industry: 'Agriculture', popularity: 80, volume: '85K' },
    { symbol: 'ZS', name: 'Soybeans', price: 1180.75, change: 12.25, percentChange: 1.05, industry: 'Agriculture', popularity: 79, volume: '97K' },
    { symbol: 'KC', name: 'Coffee', price: 192.35, change: 5.65, percentChange: 3.03, industry: 'Agriculture', popularity: 81, volume: '38K' },
    { symbol: 'PL', name: 'Platinum', price: 960.80, change: -8.40, percentChange: -0.87, industry: 'Precious Metals', popularity: 84, volume: '29K' }
  ];

  let activeData;
  switch(activeTab) {
    case 'stocks':
      activeData = stockData;
      break;
    case 'crypto':
      activeData = cryptoData;
      break;
    case 'commodities':
      activeData = commodityData;
      break;
    default:
      activeData = stockData;
  }

  // Filter by search query
  let filteredData = searchQuery
      ? activeData.filter(asset =>
          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : activeData;

  // Filter by industry if not showing all
  if (activeIndustry !== 'all') {
    filteredData = filteredData.filter(asset => asset.industry === activeIndustry);
  }

  // Filter by section if not showing all
  if (activeSection === 'most-popular') {
    filteredData = [...filteredData].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
  } else if (activeSection === 'most-active') {
    // This would ideally be based on actual volume data
    filteredData = [...filteredData].sort((a, b) => {
      const volumeA = typeof a.volume === 'string' ? parseFloat(a.volume.replace(/[^0-9.]/g, '')) : a.volume;
      const volumeB = typeof b.volume === 'string' ? parseFloat(b.volume.replace(/[^0-9.]/g, '')) : b.volume;
      return volumeB - volumeA;
    }).slice(0, 5);
  } else if (activeSection === 'biggest-gainers') {
    filteredData = [...filteredData].sort((a, b) => b.percentChange - a.percentChange).slice(0, 5);
  } else if (activeSection === 'biggest-losers') {
    filteredData = [...filteredData].sort((a, b) => a.percentChange - b.percentChange).slice(0, 5);
  }

  // Get unique industries for the current asset type
  const industries = ['all', ...new Set(activeData.map(asset => asset.industry))];

  // Sections for filtering
  const sections = [
    { id: 'all', name: 'All Assets' },
    { id: 'most-popular', name: 'Most Popular' },
    { id: 'most-active', name: 'Most Active' },
    { id: 'biggest-gainers', name: 'Biggest Gainers' },
    { id: 'biggest-losers', name: 'Biggest Losers' }
  ];

  return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Market Explorer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Explore real-time market data across stocks, cryptocurrencies, and commodities</p>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Search and filters */}
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex flex-col space-y-4">
              {/* Search Input - Full width */}
              <div className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="Search assets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Tab Buttons - Underneath the search */}
              <div className="flex flex-wrap gap-2 w-full">
                <button
                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer  ${
                        activeTab === 'stocks'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {setActiveTab('stocks'); setActiveIndustry('all'); setActiveSection('all');}}
                >
                  Stocks
                </button>
                <button
                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
                        activeTab === 'crypto'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {setActiveTab('crypto'); setActiveIndustry('all'); setActiveSection('all');}}
                >
                  Crypto
                </button>
                <button
                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
                        activeTab === 'commodities'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {setActiveTab('commodities'); setActiveIndustry('all'); setActiveSection('all');}}
                >
                  Commodities
                </button>
              </div>
            </div>

            {/* Additional filters row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Industry filter */}
              <div className="relative inline-block">
                <button
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                >
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  Industry: {activeIndustry === 'all' ? 'All' : activeIndustry}
                  <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                </button>
                <div className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10 ${showIndustryDropdown ? 'block' : 'hidden'}`}>
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {industries.map((industry) => (
                        <button
                            key={industry}
                            className={`block px-4 py-2 text-sm w-full text-left ${
                                activeIndustry === industry
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => {
                              setActiveIndustry(industry);
                              setShowIndustryDropdown(false);
                            }}
                        >
                          {industry === 'all' ? 'All Industries' : industry}
                        </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sections filter */}
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer ${
                            activeSection === section.id
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setActiveSection(section.id)}
                    >
                      {section.id === 'most-popular' && <Award className="h-3 w-3 mr-1" />}
                      {section.id === 'most-active' && <Activity className="h-3 w-3 mr-1" />}
                      {section.id === 'biggest-gainers' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {section.id === 'biggest-losers' && <TrendingDown className="h-3 w-3 mr-1" />}
                      {section.name}
                    </button>
                ))}
              </div>
            </div>
          </div>

          {/* Market overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Cap</h3>
                <BarChart2 className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                {activeTab === 'stocks' ? '$42.3T' : activeTab === 'crypto' ? '$2.58T' : '$8.7T'}
              </p>
              <div className="flex items-center mt-2 text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+1.2% today</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Volume</h3>
                <Settings className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                {activeTab === 'stocks' ? '$186B' : activeTab === 'crypto' ? '$78.4B' : '$124.2B'}
              </p>
              <div className="flex items-center mt-2 text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Updated just now</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Sentiment</h3>
                <Star className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                {activeTab === 'stocks' ? 'Bullish' : activeTab === 'crypto' ? 'Neutral' : 'Cautious'}
              </p>
              <div className="flex items-center mt-2 text-blue-500">
                <Layers className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Based on latest data</span>
              </div>
            </div>
          </div>

          {/* Market data table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {activeSection === 'all' ?
                    (activeIndustry === 'all' ? `All ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` : `${activeIndustry} ${activeTab}`) :
                    sections.find(s => s.id === activeSection)?.name}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Industry</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Volume</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.length > 0 ? (
                    filteredData.map((asset) => (
                        <tr key={asset.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                                <span className="font-medium text-xs">{asset.symbol.slice(0, 2)}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{asset.symbol}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{asset.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          {asset.industry}
                        </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              ${asset.price.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className={`flex items-center justify-end ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {asset.change >= 0 ? (
                                  <ArrowUpRight className="h-4 w-4 mr-1" />
                              ) : (
                                  <ArrowDownRight className="h-4 w-4 mr-1" />
                              )}
                              <span className="text-sm font-medium">{asset.percentChange >= 0 ? '+' : ''}{asset.percentChange.toFixed(2)}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {asset.volume}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              Add to Portfolio
                            </button>
                            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                              Watch
                            </button>
                          </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No assets found matching your criteria. Try adjusting your filters.
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}