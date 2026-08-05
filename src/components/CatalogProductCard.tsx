import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
    Chip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { Product } from '../types/catalog';
import { RatingStars } from './RatingStars';

export const CatalogProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card
            elevation={0}
            sx={{
                bgcolor: 'transparent',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover .product-image': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <CardActionArea
                component={Link}
                to={`/product/${product.id}`}
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
                <Box sx={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 3, bgcolor: 'grey.100' }}>
                    <CardMedia
                        component="img"
                        image={product.imageUrl}
                        alt={product.title}
                        className="product-image"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.7s ease',
                        }}
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
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'background.paper' },
                            color: isFavorite ? 'error.main' : 'text.primary',
                        }}
                        size="small"
                    >
                        {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </IconButton>

                    {(product.isBestseller || product.isTrending) && (
                        <Chip
                            label={product.isBestseller ? 'Bestseller' : 'Trending'}
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: 12,
                                left: 12,
                                bgcolor: 'background.paper',
                                fontSize: '0.65rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        />
                    )}
                </Box>

                <CardContent sx={{ px: 0, pt: 2, pb: 0, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                        <Box>
                            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.subtitle}
                            </Typography>
                        </Box>

                        <Typography
                            component="span"
                            sx={{
                                fontSize: '1.25rem',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                color: 'text.primary',
                            }}
                        >
                            ${product.price.toLocaleString()}
                        </Typography>
                    </Box>

                    <RatingStars rating={product.rating ?? 0} reviewsCount={product.reviewsCount} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};