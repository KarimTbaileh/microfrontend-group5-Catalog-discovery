import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material';

export const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                bgcolor: 'grey.200',
                borderTop: '1px solid',
                borderColor: 'divider',
                mt: 'auto',
            }}
        >
            <Container maxWidth="xl" sx={{ py: 6 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 4,
                    }}
                >
                    <Box sx={{ mb: { xs: 2, md: 0 } }}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                color: 'primary.main',
                                mb: 2,
                                fontSize: '1.25rem',
                            }}
                        >
                            LUXE INTERIORS
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
                            © 2026 Luxe Interiors. All rights reserved. Crafted for curated living.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: { xs: 4, md: 8 }, flexDirection: { xs: 'column', md: 'row' } }}>
                        <Stack spacing={1.5}>
                            {['Sustainability', 'Contact Us', 'Shipping & Returns'].map((label) => (
                                <MuiLink
                                    key={label}
                                    href="#"
                                    underline="hover"
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
                                >
                                    {label}
                                </MuiLink>
                            ))}
                        </Stack>
                        <Stack spacing={1.5}>
                            {['Privacy Policy', 'Store Locator'].map((label) => (
                                <MuiLink
                                    key={label}
                                    href="#"
                                    underline="hover"
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
                                >
                                    {label}
                                </MuiLink>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};