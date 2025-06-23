import {useQuery} from "@tanstack/react-query";
import {getMarketAsset} from "@/services/api/market";


export default function useMarketAsset(symbol: string, type: string) {
  return useQuery({
    queryKey: ['symbol', symbol, 'type', type],
    queryFn: () => getMarketAsset(symbol, type),
    enabled: !!symbol && !!type,
    retry: 2,
    refetchOnWindowFocus: false,
    //staleTime: 1 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000
  })

}