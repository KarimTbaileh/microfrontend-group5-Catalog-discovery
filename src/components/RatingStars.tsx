import React from 'react';
import { Box, Typography, Rating } from '@mui/material';

interface RatingStarsProps {
    rating: number;
    reviewsCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, reviewsCount }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <Rating
                value={rating}
                precision={0.5}
                readOnly
                size="small"
                sx={{
                    color: '#b45309',
                    '& .MuiRating-iconEmpty': {
                        color: '#b45309',
                        opacity: 0.3,
                    },
                }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontWeight: 500 }}>
                {rating > 0 ? rating.toFixed(1) : 'N/A'}
                {reviewsCount !== undefined && ` (${reviewsCount})`}
            </Typography>
        </Box>
    );
};