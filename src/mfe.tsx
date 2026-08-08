import r2wc from '@r2wc/react-to-web-component';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { theme } from './theme';
import { MfeApp } from './MfeApp';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function MfeRoot(props: {
    route?: string;
    productId?: string;
    routing?: string;
    hideChrome?: boolean;
}) {
    const route = props.route ?? 'home';
    const productId = props.productId ?? '';

    const initialPath =
        route === 'detail' && productId
            ? `/product/${productId}`
            : route === 'list'
                ? '/products'
                : route === 'search'
                    ? '/search'
                    : route === 'living-room' ||
                    route === 'bedroom' ||
                    route === 'kitchen' ||
                    route === 'decor'
                        ? `/${route}`
                        : '/';

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MemoryRouter initialEntries={[initialPath]}>
                    <MfeApp
                        route={route}
                        productId={productId}
                        routing={props.routing ?? 'hash'}
                        hideChrome={Boolean(props.hideChrome)}
                    />
                </MemoryRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

const LuxeCatalog = r2wc(MfeRoot, {
    props: {
        route: 'string',
        productId: 'string',
        routing: 'string',
        hideChrome: 'boolean',
    },
});

customElements.define('luxe-catalog', LuxeCatalog);

export default LuxeCatalog;