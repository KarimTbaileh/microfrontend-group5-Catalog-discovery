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
import { navigateShell } from '../contract/luxe-contract';

type ShellDest =
    | 'catalog'
    | 'product'
    | 'orders'
    | 'living-room'
    | 'bedroom'
    | 'kitchen'
    | 'decor'
    | 'search';

type Props = {
    shellMode?: boolean;
};

export const Header: React.FC<Props> = ({ shellMode = false }) => {
    const navigate = useNavigate();
    const go = (path: string, shellTo: ShellDest) => {
        if (shellMode) {
            navigateShell(shellTo);
            return;
        }
        navigate(path);
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
                    {/* 1. اللوجو ثابت تماماً (بدون Link أو onClick) */}
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            fontSize: '1.25rem',
                            fontFamily: 'inherit',
                            userSelect: 'none', // لمنع تحديد النص عند النقر المتكرر
                        }}
                    >
                        LUXE INTERIORS
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                        {/* 2. Shop All يوجه للـ Home Page (/) */}
                        <Button
                            component={shellMode ? 'button' : NavLink}
                            to={shellMode ? undefined : '/'}
                            onClick={
                                shellMode
                                    ? (e) => {
                                        e.preventDefault();
                                        window.dispatchEvent(
                                            new CustomEvent('luxe:navigate', {
                                                detail: { path: '/' },
                                                bubbles: true,
                                                composed: true,
                                            })
                                        );
                                    }
                                    : undefined
                            }
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
                                onClick={
                                    shellMode
                                        ? () =>
                                            navigateShell(
                                                room.key as 'living-room' | 'bedroom' | 'kitchen' | 'decor'
                                            )
                                        : undefined
                                }
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
                        <IconButton
                            onClick={() => go('/search', 'search')}
                            aria-label="Search"
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton aria-label="Wishlist">
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Account"
                            onClick={() => {
                                if (shellMode) navigateShell('orders');
                            }}
                        >
                            <PersonOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Cart"
                            onClick={() => {
                                if (shellMode) {
                                    window.dispatchEvent(
                                        new CustomEvent('luxe:navigate', {
                                            detail: { path: '/cart' },
                                            bubbles: true,
                                            composed: true,
                                        })
                                    );
                                }
                            }}
                        >
                            <ShoppingCartOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};