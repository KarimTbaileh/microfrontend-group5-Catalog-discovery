export interface Category {
    id: string;
    name: string;
    subtitle: string;
    imageUrl: string;
}

export interface Product {
    id: string;
    createdAt?: number;
    title: string;
    subtitle: string;
    price: number;
    category: string;
    material: string;
    imageUrl: string;
    isTrending?: boolean;
    isBestseller?: boolean;
    description?: string;
    rating?: number;
    reviewsCount?: number;
    sku?: string;
    colors?: string[];
    legFinishes?: string[];
}

export type CatalogProduct = Product;