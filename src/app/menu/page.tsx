'use client';

import React, { useState, useMemo } from 'react';
import { menuItems } from '@/data/menu';
import { MenuItem } from '@/types/menu';
import { MenuCard, MenuFilter, MenuItemModal } from '@/components/menu';

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [vegOnly, setVegOnly] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            if (activeCategory !== 'all' && item.category !== activeCategory) return false;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (!item.name.toLowerCase().includes(query) && !item.description.toLowerCase().includes(query)) return false;
            }
            if (vegOnly && !item.isVeg) return false;
            return true;
        });
    }, [activeCategory, searchQuery, vegOnly]);

    return (
        <div className="min-h-screen bg-black pt-28">
            {/* Header with gradient background */}
            <section className="relative py-8 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 bg-gradient-to-b from-crimson/10 via-transparent to-transparent" />
                <div className="absolute top-0 left-1/4 w-80 h-80 bg-crimson/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

                <div className="container relative z-10">
                    {/* Title */}
                    <div className="text-center mb-10 mt-4">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="h-px w-8 bg-gold/50" />
                            <span className="chinese text-gold text-xl">菜单</span>
                            <div className="h-px w-8 bg-gold/50" />
                        </div>
                        <h1 className="text-white text-4xl md:text-5xl font-display mb-4">Our Menu</h1>
                        <p className="text-light-gray max-w-xl mx-auto">
                            Explore our curated selection of authentic Asian dishes
                        </p>
                    </div>

                    {/* Filter Component */}
                    <MenuFilter
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        vegOnly={vegOnly}
                        onVegOnlyChange={setVegOnly}
                    />
                </div>
            </section>

            {/* Menu Grid */}
            <section className="py-12 bg-gradient-to-b from-black to-charcoal">
                <div className="container">
                    {/* Results count */}
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-gray text-sm">
                            Showing <span className="text-gold font-semibold">{filteredItems.length}</span> {filteredItems.length === 1 ? 'dish' : 'dishes'}
                        </p>
                        {(searchQuery || vegOnly || activeCategory !== 'all') && (
                            <button
                                onClick={() => {
                                    setActiveCategory('all');
                                    setSearchQuery('');
                                    setVegOnly(false);
                                }}
                                className="text-crimson text-sm hover:text-crimson-light transition-colors"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map((item) => (
                                <MenuCard key={item.id} item={item} onViewDetails={() => setSelectedItem(item)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <span className="text-6xl mb-6 block">🍜</span>
                            <h3 className="text-white text-2xl mb-3">No dishes found</h3>
                            <p className="text-gray mb-6">Try adjusting your filters</p>
                            <button
                                onClick={() => {
                                    setActiveCategory('all');
                                    setSearchQuery('');
                                    setVegOnly(false);
                                }}
                                className="px-6 py-2 bg-crimson text-white text-sm font-semibold uppercase tracking-wider hover:bg-crimson-light transition-all"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <MenuItemModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />
        </div>
    );
}
