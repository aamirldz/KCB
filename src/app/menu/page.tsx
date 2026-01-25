'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
        <div className="min-h-screen bg-black pt-20">
            {/* Header */}
            <section className="section pb-8">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="chinese text-gold text-2xl block mb-3">菜单</span>
                        <h1 className="text-white mb-4">Our Menu</h1>
                        <p className="text-light-gray max-w-xl mx-auto text-lg">
                            Explore our curated selection of authentic Asian dishes
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <MenuFilter
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            vegOnly={vegOnly}
                            onVegOnlyChange={setVegOnly}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Menu Grid */}
            <section className="section pt-8 bg-charcoal">
                <div className="container">
                    {filteredItems.length > 0 ? (
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                >
                                    <MenuCard item={item} onViewDetails={() => setSelectedItem(item)} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <span className="text-6xl mb-6 block">🍜</span>
                            <h3 className="text-white text-2xl mb-3">No dishes found</h3>
                            <p className="text-gray mb-6">Try adjusting your filters</p>
                            <button
                                onClick={() => {
                                    setActiveCategory('all');
                                    setSearchQuery('');
                                    setVegOnly(false);
                                }}
                                className="text-crimson hover:text-crimson-light transition-colors font-medium"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            <MenuItemModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />
        </div>
    );
}
