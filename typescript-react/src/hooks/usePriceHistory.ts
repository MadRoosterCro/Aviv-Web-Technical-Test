import { fetchPriceHistory } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

export const useFetchPriceHistory = (id: number) => {
  return useQuery({
    queryKey: ['priceHistory', id],
    queryFn: () => fetchPriceHistory(id),
    enabled: !!id,
  });
};
