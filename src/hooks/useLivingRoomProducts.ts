import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../ApiBase';
import type { Product } from '../types/catalog';

const LIVING_ROOM_CATEGORIES = [
    'Sofas & Sectionals',
    'Coffee Tables',
    'Accent Chairs',
    'TV Stands',
];

const fetchLivingRoomProducts = async (): Promise<Product[]> => {
    const { data } = await axiosClient.get<Product[]>('/products');

    return data.filter((product) =>
        LIVING_ROOM_CATEGORIES.includes(product.category)
    );
};

export const useLivingRoomProducts = () => {
    return useQuery<Product[], Error>({
        queryKey: ['products', 'living-room'],
        queryFn: fetchLivingRoomProducts,
    });
};