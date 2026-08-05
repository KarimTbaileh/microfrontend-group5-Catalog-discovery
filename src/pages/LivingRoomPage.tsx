import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SidebarFilters, type FilterState } from '../components/SidebarFilters';
import { CatalogProductCard } from '../components/CatalogProductCard';
import { useLivingRoomProducts } from '../hooks/useLivingRoomProducts';

export const LivingRoomPage: React.FC = () => {
    const { data: products, isLoading, error } = useLivingRoomProducts();

    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        materials: [],
        minPrice: '',
        maxPrice: '',
    });

    const handleResetFilters = () => {
        setFilters({
            categories: [],
            materials: [],
            minPrice: '',
            maxPrice: '',
        });
    };

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products.filter((product) => {
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
                return false;
            }

            if (filters.materials.length > 0 && !filters.materials.includes(product.material)) {
                return false;
            }

            if (filters.minPrice !== '' && product.price < Number(filters.minPrice)) {
                return false;
            }

            if (filters.maxPrice !== '' && product.price > Number(filters.maxPrice)) {
                return false;
            }

            return true;
        });
    }, [products, filters]);

    return (
        <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col justify-between">
            <Header />

            <div className="flex-grow flex w-full max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 gap-gutter">
                <SidebarFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onReset={handleResetFilters}
                />

                <main className="flex-grow">
                    <div className="mb-8">
                        <nav className="flex text-label-sm font-label-sm text-on-surface-variant mb-4 gap-2 items-center">
                            <a className="hover:text-primary" href="/">Home</a>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="text-on-background font-medium">Living Room</span>
                        </nav>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                            <h1 className="font-display-lg text-display-lg text-on-background">Living Room Furniture</h1>
                            <span className="font-body-md text-on-surface-variant">
                                Showing {filteredProducts.length} products
                            </span>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
                            <span className="material-symbols-outlined text-4xl animate-spin text-[#78350f]">progress_activity</span>
                            <p className="text-on-surface-variant">Loading Living Room catalog...</p>
                        </div>
                    )}

                    {error && (
                        <div className="py-24 text-center text-error">
                            <p className="font-title-lg font-bold">Failed to load products</p>
                            <p className="text-body-md text-on-surface-variant mt-1">{error.message}</p>
                        </div>
                    )}

                    {!isLoading && !error && filteredProducts.length === 0 && (
                        <div className="py-20 text-center text-on-surface-variant">
                            <p className="text-lg font-bold mb-2">No products match your filter settings.</p>
                            <button
                                onClick={handleResetFilters}
                                className="px-4 py-2 bg-[#78350f] text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}

                    {!isLoading && !error && filteredProducts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                            {filteredProducts.map((product) => (
                                <CatalogProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
};