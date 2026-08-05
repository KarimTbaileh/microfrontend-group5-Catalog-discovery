import React from 'react';
import { Box } from '@mui/material';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { TrendingSection } from '../components/TrendingSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                color: 'text.primary',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <HeroSection />
                <CategoriesSection />
                <TrendingSection />
            </Box>
            <Footer />
        </Box>
    );
};