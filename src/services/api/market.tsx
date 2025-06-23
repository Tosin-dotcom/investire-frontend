import apiClient from "@/lib/api/client";
import {MarketType} from "@/types/market";


export async function getMarketAsset(symbol: string, type: MarketType) {
  try {
    const response = await apiClient.get(`/market/asset/${symbol}`, {
      params: {
        type: type,
      }
    });
    return response.data.body;
  } catch (error) {
    console.log("Market Asset Failed :" + error);
    throw error
  }
}


export async function getMarketCap(type: MarketType) {
  try {
    const response = await apiClient.get(`/market/cap`, {
      params : {
        type: type,
      }
    })
    return response.data.body;
  } catch (e) {
    throw e;
  }
}


