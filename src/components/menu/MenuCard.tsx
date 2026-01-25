'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/types/menu';
import { formatPrice, getSpiceLevelEmoji } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface MenuCardProps {
    item: MenuItem;
    onViewDetails?: () => void;
}

export default function MenuCard({ item, onViewDetails }: MenuCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = React.useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(item);
        setTimeout(() => setIsAdding(false), 600);
    };

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

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-charcoal border border-dark-gray overflow-hidden group hover:border-crimson/50 transition-all duration-300"
        >
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-crimson/20 via-dark-gray to-charcoal flex items-center justify-center overflow-hidden">
                <span className="text-7xl transition-transform duration-500 group-hover:scale-110">
                    {getCategoryEmoji(item.category)}
                </span>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className={item.isVeg ? 'badge-veg' : 'badge-nonveg'} />
                </div>

                {item.tags.length > 0 && (
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                        {item.tags.includes('popular') && (
                            <span className="badge badge-popular">Popular</span>
                        )}
                        {item.tags.includes('chef-special') && (
                            <span className="badge badge-special">Chef&apos;s Pick</span>
                        )}
                        {item.tags.includes('new') && (
                            <span className="badge badge-new">New</span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-white font-display text-lg group-hover:text-gold transition-colors line-clamp-1">
                        {item.name}
                    </h4>
                    {item.spiceLevel > 0 && (
                        <span className="flex-shrink-0" title={`Spice Level: ${item.spiceLevel}`}>
                            {getSpiceLevelEmoji(item.spiceLevel)}
                        </span>
                    )}
                </div>

                <p className="text-gray text-sm mb-4 line-clamp-2">
                    {item.description}
                </p>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-gray">
                    <span className="text-gold font-display text-xl">
                        {formatPrice(item.price)}
                    </span>

                    <div className="flex gap-2">
                        {onViewDetails && (
                            <button
                                onClick={onViewDetails}
                                className="p-2 text-gray hover:text-gold transition-colors"
                                aria-label="View details"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        )}

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                            className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all ${isAdding
                                    ? 'bg-green-600 text-white'
                                    : 'bg-crimson text-white hover:bg-crimson-light'
                                }`}
                        >
                            {isAdding ? '✓ Added' : 'Add'}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
