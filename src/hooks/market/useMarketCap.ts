import {MarketType} from "@/types/market";
import {useQuery} from "@tanstack/react-query";
import {getMarketCap} from "@/services/api/market";

export default function useMarketCap(type: MarketType) {
  return useQuery({
    queryKey: ['type', type],
    queryFn: () => getMarketCap(type),
    enabled: !!type,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchInterval: 6000 * 5  // five minutes
  })

}