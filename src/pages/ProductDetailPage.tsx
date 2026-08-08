import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Breadcrumbs,
    Button,
    IconButton,
    CircularProgress,
    Divider,
    Chip,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useProduct } from '../hooks/useProduct';
import { RatingStars } from '../components/RatingStars';
import { addToCart, buildCartPayload } from '../contract/luxe-contract';

type Props = {
    forcedProductId?: string;
    shellMode?: boolean;
    hideChrome?: boolean;
};

export const ProductDetailPage: React.FC<Props> = ({
                                                       forcedProductId,
                                                       shellMode = false,
                                                       hideChrome = false,
                                                   }) => {
    const { id: paramId } = useParams<{ id: string }>();
    const id = forcedProductId || paramId;

    const { data: product, isLoading, error } = useProduct(id);

    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedLeg, setSelectedLeg] = useState(0);

    const colors =
        product?.colors ?? ['Charcoal Bouclé', 'Oat Bouclé', 'Espresso Velvet', 'Moss Green Velvet'];
    const colorHex = ['#3d3d3d', '#e6e2db', '#705e4e', '#4a5c53'];
    const legFinishes = product?.legFinishes ?? ['Matte Black', 'Brushed Brass'];

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(buildCartPayload(product, quantity));
    };

    const goHome = (e: React.MouseEvent) => {
        if (shellMode) {
            e.preventDefault();
            window.dispatchEvent(
                new CustomEvent('luxe:navigate', {
                    detail: { path: '/' },
                    bubbles: true,
                    composed: true,
                })
            );
        }
    };

    const goList = (e: React.MouseEvent) => {
        if (shellMode) {
            e.preventDefault();
            window.dispatchEvent(
                new CustomEvent('luxe:navigate', {
                    detail: { path: '/products' },
                    bubbles: true,
                    composed: true,
                })
            );
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ minHeight: hideChrome ? 240 : '100vh', display: 'flex', flexDirection: 'column' }}>
                {!hideChrome && <Header shellMode={shellMode} />}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: 'primary.main' }} />
                </Box>
                {!hideChrome && <Footer />}
            </Box>
        );
    }

    if (error || !product) {
        return (
            <Box sx={{ minHeight: hideChrome ? 240 : '100vh', display: 'flex', flexDirection: 'column' }}>
                {!hideChrome && <Header shellMode={shellMode} />}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <Typography color="error" sx={{ fontWeight: 700 }}>
                        Product not found
                    </Typography>
                    <Button component={Link} to="/" variant="text" onClick={goHome}>
                        Back to Home
                    </Button>
                </Box>
                {!hideChrome && <Footer />}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                minHeight: hideChrome ? 'auto' : '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {!hideChrome && <Header shellMode={shellMode} />}

            <Container maxWidth="xl" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
                    <Typography
                        component="button"
                        onClick={goHome}
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            '&:hover': { color: 'primary.main' },
                        }}
                    >
                        Home
                    </Typography>

                    <Typography
                        component="button"
                        onClick={goList}
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            '&:hover': { color: 'primary.main' },
                        }}
                    >
                        {product.category}
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{ color: 'primary.main', fontWeight: 500 }}
                    >
                        {product.title}
                    </Typography>
                </Breadcrumbs>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            aspectRatio: '4/5',
                            borderRadius: 3,
                            overflow: 'hidden',
                            bgcolor: 'grey.100',
                            '&:hover img': { transform: 'scale(1.05)' },
                        }}
                    >
                        <Box
                            component="img"
                            src={product.imageUrl}
                            alt={product.title}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.7s ease',
                            }}
                        />
                        {(product.isTrending || product.isBestseller) && (
                            <Chip
                                label={product.isBestseller ? 'Bestseller' : 'Trending'}
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    left: 16,
                                    bgcolor: 'background.paper',
                                    textTransform: 'uppercase',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.05em',
                                }}
                            />
                        )}
                    </Box>

                    <Box sx={{ position: { md: 'sticky' }, top: 100, alignSelf: 'start' }}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, mb: 1 }}>
                            {product.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
                                ${product.price.toLocaleString()}
                            </Typography>
                            {product.sku && (
                                <Chip label={`SKU: ${product.sku}`} size="small" variant="outlined" />
                            )}
                        </Box>

                        <RatingStars rating={product.rating ?? 0} reviewsCount={product.reviewsCount} />

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 3, lineHeight: 1.7 }}>
                            {product.description || product.subtitle}
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5 }}>
                            Color:{' '}
                            <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                {colors[selectedColor]}
                            </Box>
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                            {colors.map((color, idx) => (
                                <Box
                                    key={color}
                                    onClick={() => setSelectedColor(idx)}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        bgcolor: colorHex[idx] || '#ccc',
                                        border: selectedColor === idx ? '2px solid' : '1px solid',
                                        borderColor: selectedColor === idx ? 'primary.main' : 'divider',
                                        outline: selectedColor === idx ? '2px solid' : 'none',
                                        outlineColor: 'primary.main',
                                        outlineOffset: 2,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {selectedColor === idx && <CheckIcon sx={{ fontSize: 16, color: '#fff' }} />}
                                </Box>
                            ))}
                        </Box>

                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5 }}>
                            Leg Finish
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 3 }}>
                            {legFinishes.map((finish, idx) => (
                                <Button
                                    key={finish}
                                    variant={selectedLeg === idx ? 'outlined' : 'text'}
                                    onClick={() => setSelectedLeg(idx)}
                                    sx={{
                                        borderWidth: selectedLeg === idx ? 2 : 1,
                                        borderColor: selectedLeg === idx ? 'primary.main' : 'divider',
                                        color: selectedLeg === idx ? 'primary.main' : 'text.secondary',
                                        bgcolor: selectedLeg === idx ? 'action.hover' : 'background.paper',
                                        textTransform: 'uppercase',
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.05em',
                                        py: 1.5,
                                    }}
                                >
                                    {finish}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    px: 1,
                                    minWidth: 120,
                                }}
                            >
                                <IconButton size="small" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 500 }}>
                                    {quantity}
                                </Typography>
                                <IconButton size="small" onClick={() => setQuantity((q) => q + 1)}>
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<ShoppingBagOutlinedIcon />}
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Button startIcon={<FavoriteBorderIcon />} size="small" color="inherit">
                                Add to Wishlist
                            </Button>
                            <Button startIcon={<ShareIcon />} size="small" color="inherit">
                                Share
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 2,
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                <LocalShippingOutlinedIcon color="secondary" />
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600, textTransform: 'uppercase', display: 'block' }}
                                    >
                                        Free White Glove Delivery
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        On orders over $1000
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                <VerifiedOutlinedIcon color="secondary" />
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600, textTransform: 'uppercase', display: 'block' }}
                                    >
                                        5-Year Warranty
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Quality guaranteed
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>

            {!hideChrome && <Footer />}

            <Box
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'background.paper',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    p: 2,
                    zIndex: 50,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
                }}
            >
                <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                        {product.title}
                    </Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                        ${product.price.toLocaleString()}
                    </Typography>
                </Box>
                <Button variant="contained" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </Box>
        </Box>
    );
};