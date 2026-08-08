import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Chip,
    CircularProgress,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CatalogProductCard } from '../components/CatalogProductCard';
import { SidebarFilters, type FilterState } from '../components/SidebarFilters';
import { useAllProducts, filterProducts } from '../hooks/useSearchProducts';

type Props = {
    shellMode?: boolean;
    hideChrome?: boolean;
};

export const SearchPage: React.FC<Props> = ({ shellMode = false, hideChrome = false }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryFromUrl = searchParams.get('q') || '';
    const [searchInput, setSearchInput] = useState(queryFromUrl);

    const { data: products, isLoading, error } = useAllProducts();

    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        materials: [],
        minPrice: '',
        maxPrice: '',
    });

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (searchInput.trim()) params.set('q', searchInput.trim());
        else params.delete('q');
        setSearchParams(params);
    };

    const handleClearSearch = () => {
        setSearchInput('');
        const params = new URLSearchParams(searchParams);
        params.delete('q');
        setSearchParams(params);
    };

    const handleResetFilters = () => {
        setFilters({ categories: [], materials: [], minPrice: '', maxPrice: '' });
    };

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return filterProducts(products, {
            query: queryFromUrl,
            categories: filters.categories,
            materials: filters.materials,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
        });
    }, [products, queryFromUrl, filters]);

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.materials.length > 0 ||
        !!filters.minPrice ||
        !!filters.maxPrice ||
        !!queryFromUrl;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: hideChrome ? 'auto' : '100vh', display: 'flex', flexDirection: 'column' }}>
            {!hideChrome && <Header shellMode={shellMode} />}

            <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Box sx={{ display: { xs: 'none', md: 'block' }, pt: 1 }}>
                        <SidebarFilters
                            filters={filters}
                            onFilterChange={setFilters}
                            onReset={handleResetFilters}
                        />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Box
                            component="form"
                            onSubmit={handleSearchSubmit}
                            sx={{ mb: 3, maxWidth: 720 }}
                        >
                            <TextField
                                fullWidth
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search for 'Sofa', 'Chair', 'Table'..."
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: searchInput ? (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClearSearch} edge="end" size="small">
                                                    <CloseIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null,
                                        sx: {
                                            borderRadius: 999,
                                            bgcolor: 'grey.50',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        {hasActiveFilters && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 3 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                    Active Filters:
                                </Typography>

                                {queryFromUrl && (
                                    <Chip
                                        label={`"${queryFromUrl}"`}
                                        onDelete={handleClearSearch}
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                    />
                                )}

                                {filters.categories.map((cat) => (
                                    <Chip
                                        key={cat}
                                        label={cat}
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                        onDelete={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                categories: prev.categories.filter((c) => c !== cat),
                                            }))
                                        }
                                    />
                                ))}

                                {filters.materials.map((mat) => (
                                    <Chip
                                        key={mat}
                                        label={mat}
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                        onDelete={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                materials: prev.materials.filter((m) => m !== mat),
                                            }))
                                        }
                                    />
                                ))}

                                {(filters.minPrice || filters.maxPrice) && (
                                    <Chip
                                        label={`$${filters.minPrice || '0'} – $${filters.maxPrice || '∞'}`}
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                        onDelete={() => setFilters((prev) => ({ ...prev, minPrice: '', maxPrice: '' }))}
                                    />
                                )}
                            </Box>
                        )}

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2rem' } }}>
                                Search Results
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {isLoading
                                    ? 'Searching...'
                                    : `Showing ${filteredProducts.length} results${
                                        queryFromUrl ? ` for "${queryFromUrl}"` : ''
                                    }`}
                            </Typography>
                        </Box>

                        {isLoading && (
                            <Box sx={{ py: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <CircularProgress sx={{ color: 'primary.main' }} />
                                <Typography color="text.secondary">Searching products...</Typography>
                            </Box>
                        )}

                        {error && (
                            <Box sx={{ py: 12, textAlign: 'center' }}>
                                <Typography color="error" sx={{ fontWeight: 700 }}>
                                    Failed to load products
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {error.message}
                                </Typography>
                            </Box>
                        )}

                        {!isLoading && !error && filteredProducts.length === 0 && (
                            <Box sx={{ py: 10, textAlign: 'center' }}>
                                <Typography sx={{ fontWeight: 700, mb: 1 }}>No products found</Typography>
                                <Typography color="text.secondary" sx={{ mb: 2 }}>
                                    Try different keywords or clear the filters.
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleClearSearch();
                                        handleResetFilters();
                                    }}
                                >
                                    Clear All
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