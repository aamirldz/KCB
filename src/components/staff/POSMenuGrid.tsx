'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';
import { formatPrice } from '@/lib/utils';

interface POSMenuGridProps {
    items: MenuItem[];
    onAddItem: (item: MenuItem) => void;
    searchQuery: string;
    activeCategory: string;
}

export default function POSMenuGrid({ items, onAddItem, searchQuery, activeCategory }: POSMenuGridProps) {
    const getCategoryEmoji = (category: string) => {
        switch (category) {
            case 'bowls': return '🍜';
            case 'starters': return '🥟';
            case 'noodles': return '🍝';
            case 'sushi': return '🍣';
            case 'rice': return '🍚';
            case 'drinks': return '🍵';
            default: return '🍽️';
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <span className="text-5xl block mb-4">🔍</span>
                    <p className="text-gray">No items found</p>
                    {searchQuery && (
                        <p className="text-sm text-gray mt-2">Try a different search term</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-4">
            {items.map((item, index) => (
                <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => onAddItem(item)}
                    className="bg-dark-gray border border-gray/20 p-4 text-left hover:border-crimson/50 hover:bg-charcoal active:scale-95 transition-all group"
                >
                    {/* Emoji & Badge */}
                    <div className="flex items-start justify-between mb-3">
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                            {getCategoryEmoji(item.category)}
                        </span>
                        <div className={`w-3 h-3 ${item.isVeg ? 'border-green-500' : 'border-crimson'} border-2 flex items-center justify-center`}>
                            <div className={`w-1.5 h-1.5 ${item.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                        </div>
                    </div>

                    {/* Name */}
                    <h4 className="text-white text-sm font-medium line-clamp-2 mb-2 min-h-[2.5rem]">
                        {item.name}
                    </h4>

                    {/* Price */}
                    <span className="text-gold font-display text-lg">
                        {formatPrice(item.price)}
                    </span>
                </motion.button>
            ))}
        </div>
    );
}
