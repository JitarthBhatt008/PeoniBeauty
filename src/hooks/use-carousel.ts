import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carouselApi } from '@/services/api';

// Query keys
export const carouselKeys = {
  all: ['carousel'] as const,
  lists: () => [...carouselKeys.all, 'list'] as const,
  list: () => [...carouselKeys.lists()] as const,
};

// Get all carousel images
export const useCarouselImages = () => {
  return useQuery({
    queryKey: carouselKeys.list(),
    queryFn: () => carouselApi.getCarouselImages(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create carousel image mutation
export const useCreateCarouselImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carouselApi.createCarouselImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carouselKeys.lists() });
    },
  });
};

// Update carousel image mutation
export const useUpdateCarouselImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      carouselApi.updateCarouselImage(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carouselKeys.lists() });
    },
  });
};

// Delete carousel image mutation
export const useDeleteCarouselImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carouselApi.deleteCarouselImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carouselKeys.lists() });
    },
  });
}; 