'use client'

import {useEffect, useState} from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart2,
  ChevronDown,
  Clock,
  Filter,
  Layers,
  Search,
  Settings,
  Star,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import MarketAssetFetcher from "@/components/market/MarketFetcher";
import {MARKET_CONFIG} from "@/config/marketConfig";
import {MarketConfig, MarketItem, MarketType} from "@/types/market";
import {formatLargeNumber} from "@/config/util";
import useMarketCap from "@/hooks/market/useMarketCap";


export default function Market() {

  const [activeTab, setActiveTab] = useState('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activeSection, setActiveSection] = useState('all');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const [stocks, setStocks] = useState<MarketItem[]>(() => {
    const saved = localStorage.getItem("stocks");
    return saved ? JSON.parse(saved) : [];
  });
  const [cryptos, setCryptos] = useState<MarketItem[]>(() => {
    const saved = localStorage.getItem("cryptos");
    return saved ? JSON.parse(saved) : [];
  });
  const [commodities, setCommodities] = useState<MarketItem[]>(() => {
    const saved = localStorage.getItem("commodities");
    return saved ? JSON.parse(saved) : [];
  });


  const commodityData = [
    {
      symbol: 'GC',
      name: 'Gold',
      price: 2376.50,
      change: 15.30,
      percentChange: 0.65,
      industry: 'Precious Metals',
      popularity: 95,
      volume: '224K'
    },
    {
      symbol: 'SI',
      name: 'Silver',
      price: 28.12,
      change: 0.32,
      percentChange: 1.15,
      industry: 'Precious Metals',
      popularity: 89,
      volume: '86K'
    },
    {
      symbol: 'CL',
      name: 'Crude Oil',
      price: 78.54,
      change: -1.28,
      percentChange: -1.60,
      industry: 'Energy',
      popularity: 94,
      volume: '312K'
    },
    {
      symbol: 'NG',
      name: 'Natural Gas',
      price: 2.15,
      change: 0.09,
      percentChange: 4.37,
      industry: 'Energy',
      popularity: 88,
      volume: '108K'
    },
    {
      symbol: 'HG',
      name: 'Copper',
      price: 4.36,
      change: -0.05,
      percentChange: -1.13,
      industry: 'Base Metals',
      popularity: 85,
      volume: '61K'
    },
    {
      symbol: 'ZC',
      name: 'Corn',
      price: 438.25,
      change: 4.75,
      percentChange: 1.10,
      industry: 'Agriculture',
      popularity: 82,
      volume: '132K'
    },
    {
      symbol: 'ZW',
      name: 'Wheat',
      price: 586.50,
      change: -7.25,
      percentChange: -1.22,
      industry: 'Agriculture',
      popularity: 80,
      volume: '85K'
    },
    {
      symbol: 'ZS',
      name: 'Soybeans',
      price: 1180.75,
      change: 12.25,
      percentChange: 1.05,
      industry: 'Agriculture',
      popularity: 79,
      volume: '97K'
    },
    {
      symbol: 'KC',
      name: 'Coffee',
      price: 192.35,
      change: 5.65,
      percentChange: 3.03,
      industry: 'Agriculture',
      popularity: 81,
      volume: '38K'
    },
    {
      symbol: 'PL',
      name: 'Platinum',
      price: 960.80,
      change: -8.40,
      percentChange: -0.87,
      industry: 'Precious Metals',
      popularity: 84,
      volume: '29K'
    }
  ];

  let activeData: MarketItem[];
  let activeConfig: MarketConfig = MARKET_CONFIG["stocks"]
  switch (activeTab) {
    case 'stocks':
      activeConfig = MARKET_CONFIG["stocks"];
      activeData = stocks
      break;
    case 'crypto':
      activeConfig = MARKET_CONFIG["crypto"]
      activeData = cryptos
      break;
    case 'commodities':
      activeData = commodityData;
      activeConfig = MARKET_CONFIG["commodities"];
      break;
    default:
      activeData = stocks;
  }

  const tabToType: Record<string, MarketType> = {
    stocks: MarketType.STOCK,
    crypto: MarketType.CRYPTO
    //commodities: Ma
  };
  const activeType = tabToType[activeTab];
  const { data: marketCapData, isLoading: isCapLoading } = useMarketCap(activeType);

  useEffect(() => {
    const socket = new WebSocket(activeConfig.api);
    socket.onopen = () => {
      console.log('Connected! to ' + activeConfig.api);
      socket.send(JSON.stringify({
        action: "auth",
        key: process.env.NEXT_PUBLIC_ALPACA_KEY,
        secret: process.env.NEXT_PUBLIC_ALPACA_SECRET
      }));
      socket.send(JSON.stringify(activeConfig.subscribeMessage))
      console.log('WebSocket connected');
    };
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (activeTab === "stocks") {
          setStocks((prevStocks) => {
            const updatedStocks = [...prevStocks];
            data.forEach((incomingStock: any) => {
              if (!incomingStock.S) return;
              const symbol = incomingStock.S;
              const ap = incomingStock.ap ?? incomingStock.p;
              const bp = incomingStock.bp ?? incomingStock.p;
              const avgPrice = (ap + bp) / 2;
              const index = updatedStocks.findIndex(s => s.symbol === symbol);
              if (index !== -1) {
                updatedStocks[index] = {
                  ...updatedStocks[index],
                  price: avgPrice
                };
              } else {
                updatedStocks.push({
                  symbol,
                  price: avgPrice,
                  change: 0,
                  percentChange: 0,
                  name: '',
                  industry: '',
                  volume: 0,
                  rank: 0,
                  mktCap: 0,
                  _needStatic: true
                });
              }
            });

            localStorage.setItem("stocks", JSON.stringify(updatedStocks));
            return updatedStocks;
          });
        } else if (activeTab == "crypto") {
          setCryptos((prevCryptos) => {
            const updatedCryptos = [...prevCryptos];

            data.forEach((incomingCrypto: any) => {
              if (!incomingCrypto.S) return;

              const symbol = incomingCrypto.S.split('/')[0];
              const ap = incomingCrypto.ap ?? 0;
              const bp = incomingCrypto.bp ?? 0;
              const avgPrice = (ap + bp) / 2;

              const index = updatedCryptos.findIndex(c => c.symbol === symbol);

              if (index !== -1) {
                // Update existing crypto
                updatedCryptos[index] = {
                  ...updatedCryptos[index],
                  price: avgPrice
                };
              } else {
                updatedCryptos.push({
                  symbol,
                  price: avgPrice,
                  change: 0,
                  percentChange: 0,
                  name: '',
                  industry: '',
                  volume: 0,
                  rank: 0,
                  mktCap: 0,
                  _needStatic: true
                });
              }
            });
            localStorage.setItem("cryptos", JSON.stringify(updatedCryptos));
            return updatedCryptos;
          });
        }
      } catch (err) {
        console.error('Error parsing WebSocket data', err);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [activeConfig.api, activeConfig.subscribeMessage, activeTab]);


  // Filter by search query
  let filteredData = searchQuery
      ? activeData.filter(asset =>
          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : activeData;
  filteredData = filteredData.sort((a, b) => a.rank - b.rank);

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
    {id: 'all', name: 'All Assets'},
    {id: 'most-popular', name: 'Most Popular'},
    {id: 'most-active', name: 'Most Active'},
    {id: 'biggest-gainers', name: 'Biggest Gainers'},
    {id: 'biggest-losers', name: 'Biggest Losers'}
  ];

  return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Market Explorer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Explore real-time market data across stocks,
            cryptocurrencies, and commodities</p>
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
                    <Search className="h-5 w-5 text-gray-400"/>
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
                    onClick={() => {
                      setActiveTab('stocks');
                      setActiveIndustry('all');
                      setActiveSection('all');
                    }}
                >
                  Stocks
                </button>
                <button
                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
                        activeTab === 'crypto'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      setActiveTab('crypto');
                      setActiveIndustry('all');
                      setActiveSection('all');
                    }}
                >
                  Crypto
                </button>
                <button
                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
                        activeTab === 'commodities'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      setActiveTab('commodities');
                      setActiveIndustry('all');
                      setActiveSection('all');
                    }}
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
                  <Filter className="h-4 w-4 mr-2 text-gray-500"/>
                  Industry: {activeIndustry === 'all' ? 'All' : activeIndustry}
                  <ChevronDown className="h-4 w-4 ml-2 text-gray-500"/>
                </button>
                <div
                    className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10 ${showIndustryDropdown ? 'block' : 'hidden'}`}>
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
                      {section.id === 'most-popular' && <Award className="h-3 w-3 mr-1"/>}
                      {section.id === 'most-active' && <Activity className="h-3 w-3 mr-1"/>}
                      {section.id === 'biggest-gainers' && <TrendingUp className="h-3 w-3 mr-1"/>}
                      {section.id === 'biggest-losers' && <TrendingDown className="h-3 w-3 mr-1"/>}
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
                <BarChart2 className="h-5 w-5 text-gray-400"/>
              </div>


              {!isCapLoading && marketCapData && (
                  <div>
                    <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                      $
                      {Number(marketCapData.marketCap).toLocaleString(undefined, {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 2
                      })}
                    </p>

                    <div
                        className={`flex items-center mt-2 ${
                            marketCapData.percentChange >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                      {marketCapData.percentChange >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1"/>
                      ) : (
                          <TrendingDown className="h-4 w-4 mr-1"/>
                      )}

                      <span className="text-sm font-medium">
        {marketCapData.percentChange >= 0 ? '+' : ''}
                        {marketCapData.percentChange.toFixed(2)}% today
      </span>
                    </div>
                  </div>
              )}


            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Volume</h3>
                <Settings className="h-5 w-5 text-gray-400"/>
              </div>
              <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                {activeTab === 'stocks' ? '$186B' : activeTab === 'crypto' ? '$78.4B' : '$124.2B'}
              </p>
              <div className="flex items-center mt-2 text-gray-500">
                <Clock className="h-4 w-4 mr-1"/>
                <span className="text-sm font-medium">Updated just now</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Sentiment</h3>
                <Star className="h-5 w-5 text-gray-400"/>
              </div>
              <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                {activeTab === 'stocks' ? 'Bullish' : activeTab === 'crypto' ? 'Neutral' : 'Cautious'}
              </p>
              <div className="flex items-center mt-2 text-blue-500">
                <Layers className="h-4 w-4 mr-1"/>
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
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Industry
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h
                    Change
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Volume
                    (24H)
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market
                    Cap
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.length > 0 ? (
                    filteredData.map((asset: MarketItem) => (
                        <tr key={asset.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full p-2 flex items-center justify-center mr-3 overflow-hidden">
                                {asset.image ? (
                                    <img
                                        src={asset.image}
                                        alt={asset.symbol}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="font-medium text-xs">{asset.symbol.slice(0, 2)}</span>
                                )}
                              </div>

                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{asset.symbol}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{asset.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                        <span
                            className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          {asset.industry}
                        </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              ${asset.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div
                                className={`flex items-center justify-end ${asset.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {asset.percentChange >= 0 ? (
                                  <ArrowUpRight className="h-4 w-4 mr-1"/>
                              ) : (
                                  <ArrowDownRight className="h-4 w-4 mr-1"/>
                              )}
                              <span
                                  className="text-sm font-medium">{asset.percentChange >= 0 ? '+' : ''}{asset.percentChange.toFixed(2)}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ${formatLargeNumber(asset.volume)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ${formatLargeNumber(asset.mktCap)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              Add to Portfolio
                            </button>
                            <button
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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


        {activeTab === "crypto" && cryptos.map(c => (
            <MarketAssetFetcher
                key={c.symbol}
                symbol={c.symbol}
                type="CRYPTO"
                storageKey="cryptos"
                setData={setCryptos}
            />
        ))}

        {activeTab === "stocks" && stocks
        // .filter(s => s._needStatic)
        .map(s => (
            <MarketAssetFetcher
                key={s.symbol}
                symbol={s.symbol}
                type={"STOCK"}
                storageKey="stocks"
                setData={setStocks}
            />
        ))}

      </div>
  );
}