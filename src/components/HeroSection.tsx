import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '70vh', md: '80vh' },
                minHeight: 560,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    },
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80"
                    alt="Modern Living Room"
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(253,248,245,0.85), transparent)',
                    }}
                />
            </Box>

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', pt: 10 }}>
                <Typography
                    variant="h1"
                    color="primary"
                    sx={{ mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                >
                    Modern Living Room Collections
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto', mb: 4 }}>
                    Curated pieces designed to elevate your everyday living. Discover our new arrivals
                    featuring sustainable materials and timeless craftsmanship.
                </Typography>
                <Button
                    component={Link}
                    to="/living-room"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ px: 4, py: 1.5 }}
                >
                    Shop the Collection
                </Button>
            </Container>
        </Box>
    );
};