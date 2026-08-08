export const LUXE_EVENTS = {
    CART_ADD: 'luxe:cart:add',
    CART_UPDATED: 'luxe:cart:updated',
    NAVIGATE: 'luxe:navigate',
} as const;

export const KNOWN_CART_IDS = new Set([
    'eira-lounge-chair',
    'lumina-floor-lamp',
    'aura-lounge-chair',
    'artisan-ceramic-vase',
    'woven-linen-pillow',
]);

export type CartAddDetail =
    | { productId: string; quantity: number }
    | {
    item: {
        id: string;
        name: string;
        variant?: string;
        price: number;
        quantity: number;
        image: string;
        alt?: string;
    };
};

export function addToCart(detail: CartAddDetail) {
    window.dispatchEvent(
        new CustomEvent(LUXE_EVENTS.CART_ADD, {
            detail,
            bubbles: true,
            composed: true,
        })
    );
}

export function navigateShell(
    to:
        | 'catalog'
        | 'product'
        | 'orders'
        | 'living-room'
        | 'bedroom'
        | 'kitchen'
        | 'decor'
        | 'search',
    productId?: string
) {
    window.dispatchEvent(
        new CustomEvent(LUXE_EVENTS.NAVIGATE, {
            detail: { to, productId },
            bubbles: true,
            composed: true,
        })
    );
}

export function buildCartPayload(
    product: {
        id: string;
        title: string;
        subtitle?: string;
        price: number;
        imageUrl: string;
    },
    quantity: number
): CartAddDetail {
    if (KNOWN_CART_IDS.has(product.id)) {
        return { productId: product.id, quantity };
    }

    const image = product.imageUrl.startsWith('http')
        ? product.imageUrl
        : new URL(product.imageUrl, window.location.origin).href;

    return {
        item: {
            id: product.id,
            name: product.title,
            variant: product.subtitle,
            price: product.price,
            quantity,
            image,
            alt: product.title,
        },
    };
}