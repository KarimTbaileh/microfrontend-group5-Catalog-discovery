import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { HomePage } from './pages/HomePage';
import { RoomPage } from './pages/RoomPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SearchPage } from './pages/SearchPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/:roomKey" element={<RoomPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;