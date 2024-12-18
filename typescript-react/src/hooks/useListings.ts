import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchListings, createListing, updateListing } from '@/libs/api';
import { Listing } from '@/components/ListingCard/ListingCard';

export const useFetchListings = () => {
  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });
};

export const useAddListing = () => {
  return useMutation({
    mutationFn: createListing,
  });
};

export const useUpdateListing = () => {
  return useMutation({
    mutationFn: (variables: { id: number; data: any }) =>
      updateListing(variables.id, variables.data),
    onSuccess: () => {},
  });
};
