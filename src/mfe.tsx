import r2wc from '@r2wc/react-to-web-component';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MfeApp
                    route={props.route ?? 'home'}
                    productId={props.productId ?? ''}
                    routing={props.routing ?? 'hash'}
                    hideChrome={Boolean(props.hideChrome)}
                />
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