import React from 'react';
import { Box } from '@mui/material';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { TrendingSection } from '../components/TrendingSection';
import { Footer } from '../components/Footer';

type Props = {
    shellMode?: boolean;
    hideChrome?: boolean;
};

export const HomePage: React.FC<Props> = ({
                                              shellMode = false,
                                              hideChrome = false,
                                          }) => {
    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                color: 'text.primary',
                minHeight: hideChrome ? 'auto' : '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {!hideChrome && <Header shellMode={shellMode} />}

            <Box component="main" sx={{ flexGrow: 1 }}>
                <HeroSection shellMode={shellMode} />
                <CategoriesSection shellMode={shellMode} />
                <TrendingSection shellMode={shellMode} />
            </Box>

            {!hideChrome && <Footer />}
        </Box>
    );
};