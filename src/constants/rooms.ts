export type RoomKey = 'living-room' | 'bedroom' | 'kitchen' | 'decor';

export interface RoomConfig {
    key: RoomKey;
    title: string;
    label: string;
    categories: string[];
}

export const ROOMS: Record<RoomKey, RoomConfig> = {
    'living-room': {
        key: 'living-room',
        title: 'Living Room Furniture',
        label: 'Living Room',
        categories: ['Sofas & Sectionals', 'Coffee Tables', 'Accent Chairs', 'TV Stands'],
    },
    bedroom: {
        key: 'bedroom',
        title: 'Bedroom Furniture',
        label: 'Bedroom',
        categories: ['Beds', 'Nightstands', 'Dressers', 'Wardrobes'],
    },
    kitchen: {
        key: 'kitchen',
        title: 'Kitchen & Dining',
        label: 'Kitchen',
        categories: ['Dining Tables', 'Dining Chairs', 'Bar Stools', 'Sideboards'],
    },
    decor: {
        key: 'decor',
        title: 'Home Decor',
        label: 'Decor',
        categories: ['Lighting', 'Rugs', 'Mirrors', 'Wall Art', 'Vases'],
    },
};

export const ROOM_LIST = Object.values(ROOMS);