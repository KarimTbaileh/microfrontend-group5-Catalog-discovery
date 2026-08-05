import React from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Button,
    Stack,
    Chip,
} from '@mui/material';

export interface FilterState {
    categories: string[];
    materials: string[];
    minPrice: string;
    maxPrice: string;
}

interface SidebarFiltersProps {
    filters: FilterState;
    onFilterChange: (newFilters: FilterState) => void;
    onReset: () => void;
    availableCategories?: string[];
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
                                                                  filters,
                                                                  onFilterChange,
                                                                  onReset,
                                                                  availableCategories,
                                                              }) => {
    const categoriesList =
        availableCategories && availableCategories.length > 0
            ? availableCategories
            : ['Sofas & Sectionals', 'Coffee Tables', 'Accent Chairs', 'TV Stands'];

    const materialsList = ['Leather', 'Velvet', 'Oak', 'Walnut'];

    const handleCategoryToggle = (category: string) => {
        const updated = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];
        onFilterChange({ ...filters, categories: updated });
    };

    const handleMaterialToggle = (material: string) => {
        const updated = filters.materials.includes(material)
            ? filters.materials.filter((m) => m !== material)
            : [...filters.materials, material];
        onFilterChange({ ...filters, materials: updated });
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.materials.length > 0 ||
        filters.minPrice ||
        filters.maxPrice;

    return (
        <Box sx={{ width: 256, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" sx={{ fontSize: '1.25rem' }}>
                    Filters
                </Typography>
                {hasActiveFilters && (
                    <Button size="small" onClick={onReset} sx={{ color: 'primary.main', fontWeight: 700 }}>
                        Reset
                    </Button>
                )}
            </Box>

            {/* Category */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}
                >
                    Category
                </Typography>
                <FormGroup>
                    {categoriesList.map((cat) => (
                        <FormControlLabel
                            key={cat}
                            control={
                                <Checkbox
                                    size="small"
                                    checked={filters.categories.includes(cat)}
                                    onChange={() => handleCategoryToggle(cat)}
                                    sx={{
                                        color: 'primary.main',
                                        '&.Mui-checked': { color: 'primary.main' },
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    variant="body2"
                                    color={filters.categories.includes(cat) ? 'primary.main' : 'text.secondary'}
                                    sx={{ fontWeight: filters.categories.includes(cat) ? 700 : 400 }}
                                >
                                    {cat}
                                </Typography>
                            }
                        />
                    ))}
                </FormGroup>
            </Box>

            {/* Price */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}
                >
                    Price Range ($)
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <TextField
                        size="small"
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
                        fullWidth
                    />
                    <Typography color="text.secondary">–</Typography>
                    <TextField
                        size="small"
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
                        fullWidth
                    />
                </Stack>
            </Box>

            {/* Material */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}
                >
                    Material
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {materialsList.map((mat) => {
                        const selected = filters.materials.includes(mat);
                        return (
                            <Chip
                                key={mat}
                                label={mat}
                                onClick={() => handleMaterialToggle(mat)}
                                variant={selected ? 'filled' : 'outlined'}
                                color={selected ? 'primary' : 'default'}
                                sx={{
                                    fontWeight: selected ? 700 : 400,
                                    cursor: 'pointer',
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};