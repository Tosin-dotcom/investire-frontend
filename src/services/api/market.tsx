import apiClient from "@/lib/api/client";


export async function getMarketAsset(symbol: string, type: any) {
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


