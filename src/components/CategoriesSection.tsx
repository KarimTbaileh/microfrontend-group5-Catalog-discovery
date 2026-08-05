import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Card, CardMedia, CardContent } from '@mui/material';
import type { Category } from '../types/catalog';
import { useCategories } from '../hooks/useCatalog';

const getCategoryPath = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes('living')) return '/living-room';
    if (lower.includes('bedroom')) return '/bedroom';
    if (lower.includes('kitchen') || lower.includes('dining')) return '/kitchen';
    if (lower.includes('decor') || lower.includes('light') || lower.includes('office')) return '/decor';
    return '/search';
};

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
    return (
        <Card
            component={Link}
            to={getCategoryPath(category.name)}
            elevation={0}
            sx={{
                textDecoration: 'none',
                bgcolor: 'transparent',
                '&:hover img': { transform: 'scale(1.05)' },
            }}
        >
            <Box sx={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: 3, bgcolor: 'grey.100' }}>
                <CardMedia
                    component="img"
                    image={category.imageUrl}
                    alt={category.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                />
            </Box>
            <CardContent sx={{ px: 0, pt: 2 }}>
                <Typography variant="h3" color="primary" sx={{ fontSize: '1.25rem' }}>
                    {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {category.subtitle}
                </Typography>
            </CardContent>
        </Card>
    );
};

export const CategoriesSection: React.FC = () => {
    const { data: categories, isLoading, error } = useCategories();

    if (isLoading) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography>Loading Categories...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography color="error">Failed to load categories</Typography>
            </Box>
        );
    }

    return (
        <Box component="section" sx={{ py: 10 }}>
            <Container maxWidth="xl">
                <Typography variant="h2" color="primary" align="center" sx={{ mb: 6 }}>
                    Curated Spaces
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: 3,
                    }}
                >
                    {categories?.slice(0, 4).map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};