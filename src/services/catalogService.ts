import { axiosClient } from '../ApiBase';
import type {Category, Product} from '../types/catalog.ts';

export const catalogService = {
    getCategories: async (): Promise<Category[]> => {
        const { data } = await axiosClient.get<Category[]>('/categories');
        return data;
    },

    getTrendingProducts: async (): Promise<Product[]> => {
        const { data } = await axiosClient.get<Product[]>('/products', {
            params: { isTrending: true }
        });
        return data;
    },

    getAllProducts: async (): Promise<Product[]> => {
        const { data } = await axiosClient.get<Product[]>('/products');
        return data;
    },
    getProductById: async (id: string): Promise<Product> => {
        const { data } = await axiosClient.get<Product>(`/products/${id}`);
        return data;
    },
};