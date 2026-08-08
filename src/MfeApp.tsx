import React from 'react';
import { Box } from '@mui/material';
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

const ROOM_ROUTES = new Set(['living-room', 'bedroom', 'kitchen', 'decor', 'list']);

export const MfeApp: React.FC<MfeProps> = ({
                                               route,
                                               productId,
                                               routing,
                                               hideChrome,
                                           }) => {
    const shellMode = routing === 'none';
    void hideChrome;
    const hide = false;

    const content = (() => {
        if (route === 'detail') {
            return (
                <ProductDetailPage
                    forcedProductId={productId}
                    shellMode={shellMode}
                    hideChrome={hide}
                />
            );
        }
        if (route === 'search') {
            return <SearchPage shellMode={shellMode} hideChrome={hide} />;
        }
        if (ROOM_ROUTES.has(route)) {
            const roomKey = route === 'list' ? 'living-room' : route;
            return (
                <RoomPage
                    forcedRoomKey={roomKey}
                    shellMode={shellMode}
                    hideChrome={hide}
                />
            );
        }
        return <HomePage shellMode={shellMode} hideChrome={hide} />;
    })();

    return <Box sx={{ minHeight: '100%' }}>{content}</Box>;
};