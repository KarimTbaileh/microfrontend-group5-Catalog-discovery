import { useQuery } from '@tanstack/react-query';
import { catalogService } from '../services/catalogService';

export const useProduct = (id: string | undefined) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => catalogService.getProductById(id!),
        enabled: !!id,
    });
};