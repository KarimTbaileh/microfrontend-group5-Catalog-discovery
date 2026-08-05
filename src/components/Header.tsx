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

export const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h3"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            fontSize: '1.25rem',
                        }}
                    >
                        LUXE INTERIORS
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                        <Button
                            component={NavLink}
                            to="/"
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
                                component={NavLink}
                                to={`/${room.key}`}
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
                        <IconButton onClick={() => navigate('/search')} aria-label="Search">
                            <SearchIcon />
                        </IconButton>
                        <IconButton aria-label="Wishlist">
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton aria-label="Account">
                            <PersonOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton aria-label="Cart">
                            <ShoppingCartOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};