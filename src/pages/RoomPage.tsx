import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Breadcrumbs,
    CircularProgress,
    Button,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SidebarFilters, type FilterState } from '../components/SidebarFilters';
import { CatalogProductCard } from '../components/CatalogProductCard';
import { useRoomProducts } from '../hooks/useRoomProducts';
import { ROOMS, type RoomKey } from '../constants/rooms';

type Props = {
    forcedRoomKey?: string;
    shellMode?: boolean;
    hideChrome?: boolean;
};

export const RoomPage: React.FC<Props> = ({
                                              forcedRoomKey,
                                              shellMode = false,
                                              hideChrome = false,
                                          }) => {
    const { roomKey } = useParams<{ roomKey: string }>();
    const key = forcedRoomKey || roomKey;
    const validRoomKey = (key && key in ROOMS ? key : 'living-room') as RoomKey;
    const room = ROOMS[validRoomKey];

    const { data: products, isLoading, error } = useRoomProducts(validRoomKey);

    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        materials: [],
        minPrice: '',
        maxPrice: '',
    });

    const handleResetFilters = () => {
        setFilters({ categories: [], materials: [], minPrice: '', maxPrice: '' });
    };

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter((product) => {
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
            if (filters.materials.length > 0 && !filters.materials.includes(product.material)) return false;
            if (filters.minPrice !== '' && product.price < Number(filters.minPrice)) return false;
            if (filters.maxPrice !== '' && product.price > Number(filters.maxPrice)) return false;
            return true;
        });
    }, [products, filters]);

    const goHome = (e: React.MouseEvent) => {
        if (shellMode) {
            e.preventDefault();
            window.dispatchEvent(
                new CustomEvent('luxe:navigate', {
                    detail: { path: '/' },
                    bubbles: true,
                    composed: true,
                })
            );
        }
    };

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                minHeight: hideChrome ? 'auto' : '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {!hideChrome && <Header shellMode={shellMode} />}

            <Container maxWidth="xl" sx={{ flexGrow: 1, py: 6 }}>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <SidebarFilters
                        filters={filters}
                        onFilterChange={setFilters}
                        onReset={handleResetFilters}
                        availableCategories={room.categories}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
                            <Typography
                                component={Link}
                                to="/"
                                variant="caption"
                                color="text.secondary"
                                onClick={goHome}
                                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                            >
                                Home
                            </Typography>
                            <Typography variant="caption" color="text.primary" sx={{ fontWeight: 500 }}>
                                {room.label}
                            </Typography>
                        </Breadcrumbs>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: 'space-between',
                                alignItems: { sm: 'flex-end' },
                                gap: 1,
                                mb: 4,
                            }}
                        >
                            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                                {room.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Showing {filteredProducts.length} products
                            </Typography>
                        </Box>

                        {isLoading && (
                            <Box sx={{ py: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <CircularProgress sx={{ color: 'primary.main' }} />
                                <Typography color="text.secondary">Loading {room.label} catalog...</Typography>
                            </Box>
                        )}

                        {error && (
                            <Box sx={{ py: 12, textAlign: 'center' }}>
                                <Typography variant="h3" color="error" sx={{ fontWeight: 700 }}>
                                    Failed to load products
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {error.message}
                                </Typography>
                            </Box>
                        )}

                        {!isLoading && !error && filteredProducts.length === 0 && (
                            <Box sx={{ py: 10, textAlign: 'center' }}>
                                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                                    No products match your filter settings.
                                </Typography>
                                <Button variant="contained" onClick={handleResetFilters} sx={{ mt: 2 }}>
                                    Clear All Filters
                                </Button>
                            </Box>
                        )}

                        {!isLoading && !error && filteredProducts.length > 0 && (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        lg: 'repeat(3, 1fr)',
                                    },
                                    gap: 3,
                                }}
                            >
                                {filteredProducts.map((product) => (
                                    <CatalogProductCard
                                        key={product.id}
                                        product={product}
                                        shellMode={shellMode}
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>

            {!hideChrome && <Footer />}
        </Box>
    );
};