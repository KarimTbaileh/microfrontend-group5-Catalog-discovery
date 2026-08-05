import { useQuery } from '@tanstack/react-query';
import { catalogService } from '../services/catalogService';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: catalogService.getCategories,
    });
};

export const useTrendingProducts = () => {
    return useQuery({
        queryKey: ['products', 'trending'],
        queryFn: catalogService.getTrendingProducts,
    });
};