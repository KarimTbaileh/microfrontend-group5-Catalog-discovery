import React from 'react';
import { Box } from '@mui/material';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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

    const content = (() => {
        if (route === 'detail') {
            return (
                <ProductDetailPage
                    forcedProductId={productId}
                    shellMode={shellMode}
                    hideChrome={hideChrome}
                />
            );
        }

        if (route === 'search') {
            return <SearchPage shellMode={shellMode} hideChrome={hideChrome} />;
        }

        if (ROOM_ROUTES.has(route)) {
            const roomKey = route === 'list' ? 'living-room' : route;
            return (
                <RoomPage
                    forcedRoomKey={roomKey}
                    shellMode={shellMode}
                    hideChrome={hideChrome}
                />
            );
        }

        // home (default)
        return <HomePage shellMode={shellMode} hideChrome={hideChrome} />;
    })();

    if (hideChrome) {
        return <Box sx={{ minHeight: '100%' }}>{content}</Box>;
    }

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header shellMode={shellMode} />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {content}
            </Box>
            <Footer />
        </Box>
    );
};