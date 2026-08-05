import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../ApiBase';
import type { Product } from '../types/catalog';
import { ROOMS, type RoomKey } from '../constants/rooms';

const fetchRoomProducts = async (roomKey: RoomKey): Promise<Product[]> => {
    const { data } = await axiosClient.get<Product[]>('/products');
    const allowedCategories = ROOMS[roomKey].categories;

    return data.filter((product) => allowedCategories.includes(product.category));
};

export const useRoomProducts = (roomKey: RoomKey) => {
    return useQuery<Product[], Error>({
        queryKey: ['products', 'room', roomKey],
        queryFn: () => fetchRoomProducts(roomKey),
    });
};