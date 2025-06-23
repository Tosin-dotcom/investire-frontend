import {MarketConfigMap} from "@/types/market";

export const MARKET_CONFIG : MarketConfigMap = {
  stocks: {
    api: process.env.NEXT_PUBLIC_STOCK_API as string,
    subscribeMessage: {
      action: "subscribe",
      trades: ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "WMT", "V", "PG", "DIS", "JPM"],
      quotes: ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "WMT", "V", "PG", "DIS", "JPM"]
    }
  },
  crypto: {
    api: process.env.NEXT_PUBLIC_CRYPTO_API as string,
    subscribeMessage: {
      action: "subscribe",
      trades: ["BTC/USD", "ETH/USD", "SOL/USD", "ADA/USD", "LINK/USD", "MATIC/USD", "AAVE/USD", "USDT/USD", "BNB/USD", "DOGE/USD", "XRP/USD","TRX/USD","USDC/USD"],
      quotes: ["BTC/USD", "ETH/USD", "SOL/USD", "ADA/USD", "LINK/USD", "MATIC/USD", "AAVE/USD", "USDT/USD", "BNB/USD", "DOGE/USD", "XRP/USD", "TRX/USD","USDC/USD"]
      //"UNI/USD", "DOT/USD", "AVAX/USD",
    }
  },
  commodities: {
    api: process.env.NEXT_PUBLIC_STOCK_API as string,
    subscribeMessage: {
      action: "subscribe",
      trades: [],
      quotes: []
    }
  }
};
