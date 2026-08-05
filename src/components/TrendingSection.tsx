import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Product } from '../types/catalog';
import { useTrendingProducts } from '../hooks/useCatalog';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card
            component={Link}
            to={`/product/${product.id}`}
            elevation={0}
            sx={{
                textDecoration: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: 3 },
                '&:hover img': { transform: 'scale(1.05)' },
            }}
        >
            <Box sx={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', bgcolor: 'grey.100' }}>
                <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                />
                <IconButton
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                    }}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        color: isFavorite ? 'error.main' : 'text.primary',
                        '&:hover': { bgcolor: 'background.paper' },
                    }}
                    size="small"
                >
                    {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                </IconButton>
            </Box>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h3" color="primary" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
                        {product.subtitle}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'primary.main' }}>
                        ${product.price.toLocaleString()}
                    </Typography>
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Add to cart:', product.id);
                        }}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': { bgcolor: 'secondary.main' },
                        }}
                        size="small"
                    >
                        <AddShoppingCartIcon fontSize="small" />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export const TrendingSection: React.FC = () => {
    const { data: products, isLoading, error } = useTrendingProducts();

    if (isLoading) {
        return (
            <Box sx={{ py: 10, textAlign: 'center' }}>
                <Typography>Loading Trending Products...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 10, textAlign: 'center' }}>
                <Typography color="error">Failed to load products</Typography>
            </Box>
        );
    }

    return (
        <Box component="section" sx={{ py: 8, bgcolor: 'grey.50' }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                    <Box>
                        <Typography variant="h2" color="primary" sx={{ fontWeight: 600 }}>
                            Trending Now
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Our most coveted pieces this season
                        </Typography>
                    </Box>
                    <Button
                        component={Link}
                        to="/living-room"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ color: 'secondary.main' }}
                    >
                        View All
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 3,
                    }}
                >
                    {products?.map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};