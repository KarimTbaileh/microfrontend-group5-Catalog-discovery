import React from 'react';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RoomPage } from './pages/RoomPage';
import { SearchPage } from './pages/SearchPage';

export type MfeProps = {
    route: string;
    productId: string;
    routing: string;
    hideChrome: boolean;
};

export const MfeApp: React.FC<MfeProps> = ({
                                               route,
                                               productId,
                                               routing,
                                               hideChrome,
                                           }) => {
    const shellMode = routing === 'none';

    const content = (() => {
        switch (route) {
            case 'list':
                return <RoomPage forcedRoomKey="living-room" shellMode={shellMode} hideChrome={hideChrome} />;
            case 'detail':
                return <ProductDetailPage forcedProductId={productId} shellMode={shellMode} hideChrome={hideChrome} />;
            case 'search':
                return <SearchPage shellMode={shellMode} hideChrome={hideChrome} />;
            case 'home':
            default:
                return <HomePage shellMode={shellMode} hideChrome={hideChrome} />;
        }
    })();

    return <>{content}</>;
};