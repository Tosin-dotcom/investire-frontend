import React from "react";

export type MarketConfig = {
  api: string;
  subscribeMessage: {
    action: string;
    trades: string[];
    quotes: string[];
  };
};


export type MarketConfigMap = {
  [key: string]: MarketConfig;
};

export type MarketItem = {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  name: string;
  industry: string;
  volume: number;
  rank: number;
  mktCap: number
  image? : string
  _needStatic?: boolean;
};

export type MarketAssetFetcherProps = {
  symbol: string;
  type: MarketType
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  storageKey: string;
};

export enum MarketType {
  STOCK = "STOCK",
  CRYPTO = "CRYPTO",
//  COMMODITY = "COMMODITY"
}
