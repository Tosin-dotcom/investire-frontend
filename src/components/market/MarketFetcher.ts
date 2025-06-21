import useMarketAsset from "@/hooks/market/useMarketAsset";
import { useEffect } from "react";
import {MarketAssetFetcherProps} from "@/types/market";


export default function MarketAssetFetcher({
                                             symbol,
                                             type,
                                             setData,
                                             storageKey
                                           }: MarketAssetFetcherProps) {
  const { data: staticData, isSuccess } = useMarketAsset(symbol, type);

  useEffect(() => {
    if (isSuccess && staticData) {
      setData((prev) => {
        const updated = prev.map((item) =>
            item.symbol === symbol
                ? {
                  ...item,
                  name: staticData.companyName || staticData.name,
                  industry: staticData.sector,
                  volume: staticData.mktCap,
                  _needStatic: false
                }
                : item
        );
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    }
  }, [isSuccess, staticData, symbol, setData, storageKey]);

  return null;
}
