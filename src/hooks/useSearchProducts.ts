import { useQuery } from '@tanstack/react-query';
import { catalogService } from '../services/catalogService';
import type { Product } from '../types/catalog';

export const useAllProducts = () => {
    return useQuery({
        queryKey: ['products', 'all'],
        queryFn: catalogService.getAllProducts,
    });
};

export interface SearchFilters {
    query: string;
    categories: string[];
    materials: string[];
    minPrice: string;
    maxPrice: string;
}

export const filterProducts = (products: Product[], filters: SearchFilters): Product[] => {
    return products.filter((product) => {
        if (filters.query) {
            const q = filters.query.toLowerCase();
            const matchesText =
                product.title.toLowerCase().includes(q) ||
                product.subtitle.toLowerCase().includes(q) ||
                product.category.toLowerCase().includes(q) ||
                product.material.toLowerCase().includes(q) ||
                (product.description?.toLowerCase().includes(q) ?? false);

            if (!matchesText) return false;
        }

        if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
            return false;
        }

        if (filters.materials.length > 0 && !filters.materials.includes(product.material)) {
            return false;
        }

        if (filters.minPrice !== '' && product.price < Number(filters.minPrice)) return false;
        if (filters.maxPrice !== '' && product.price > Number(filters.maxPrice)) return false;

        return true;
    });
};