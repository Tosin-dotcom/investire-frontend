import {useQuery} from "@tanstack/react-query";
import {getMarketAsset} from "@/services/api/market";


export default function useMarketAsset(symbol: string, type: string) {
  return useQuery({
    queryKey: ['symbol', symbol, 'type', type],
    queryFn: () => getMarketAsset(symbol, type),
    enabled: !!symbol && !!type,
    retry: 2,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  })

}