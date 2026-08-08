import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ROOM_LIST } from '../constants/rooms';
import { navigateShellPath } from '../contract/luxe-contract';

type Props = {
    shellMode?: boolean;
};

export const Header: React.FC<Props> = ({ shellMode = false }) => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        if (shellMode) {
            navigateShellPath(path);
        } else {
            navigate(path);
        }
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
                    <Typography
                        component={shellMode ? 'button' : Link}
                        to={shellMode ? undefined : '/'}
                        onClick={shellMode ? (e) => { e.preventDefault(); handleNavigate('/'); } : undefined}
                        variant="h3"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            fontSize: '1.25rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                    >
                        LUXE INTERIORS
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                        <Button
                            component={shellMode ? 'button' : NavLink}
                            to={shellMode ? undefined : '/products'}
                            onClick={shellMode ? (e) => { e.preventDefault(); handleNavigate('/products'); } : undefined}
                            sx={{
                                color: 'text.secondary',
                                '&.active': { color: 'primary.main', fontWeight: 700 },
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            Shop All
                        </Button>
                        {ROOM_LIST.map((room) => (
                            <Button
                                key={room.key}
                                component={shellMode ? 'button' : NavLink}
                                to={shellMode ? undefined : `/${room.key}`}
                                onClick={shellMode ? (e) => { e.preventDefault(); handleNavigate(`/${room.key}`); } : undefined}
                                sx={{
                                    color: 'text.secondary',
                                    '&.active': { color: 'primary.main', fontWeight: 700 },
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                {room.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton onClick={() => handleNavigate('/search')} aria-label="Search">
                            <SearchIcon />
                        </IconButton>
                        <IconButton aria-label="Wishlist">
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton aria-label="Account" onClick={() => handleNavigate('/account/orders')}>
                            <PersonOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton aria-label="Cart" onClick={() => handleNavigate('/cart')}>
                            <ShoppingCartOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};