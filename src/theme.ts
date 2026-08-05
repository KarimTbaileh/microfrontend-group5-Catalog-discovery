import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4A3728',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#7D6355',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#BA1A1A',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FDF8F5',
            paper: '#FEFCFB',
        },
        text: {
            primary: '#1C1917',
            secondary: '#6B5E57',
        },
        divider: '#CFC5BF',
    },
    typography: {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        h1: {
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 400,
            fontSize: '3.5625rem',
            lineHeight: 1.12,
            letterSpacing: '-0.016em',
        },
        h2: {
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 400,
            fontSize: '2rem',
            lineHeight: 1.25,
        },
        h3: {
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '1.375rem',
            lineHeight: 1.27,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0.031em',
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.016em',
        },
        button: {
            fontWeight: 500,
            fontSize: '0.875rem',
            letterSpacing: '0.006em',
            textTransform: 'none',
        },
        caption: {
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.031em',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    boxShadow: 'none',
                    textTransform: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    backgroundColor: '#4A3728',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#3d2e22',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 1px 3px rgba(28,28,26,0.06)',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#4A3728',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 9999,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FEFCFB',
                    color: '#1C1917',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                },
            },
        },
    },
});