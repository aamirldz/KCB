'use client';

import React from 'react';
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
        <div className="bg-gradient-to-br from-charcoal to-dark-gray border border-gray/15 overflow-hidden group hover:border-crimson/50 hover:shadow-[0_0_25px_rgba(185,28,28,0.15)] transition-all duration-300">
            {/* Image */}
            <div className="relative h-44 bg-gradient-to-br from-crimson/15 via-dark-gray to-charcoal flex items-center justify-center overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-crimson/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="text-6xl transition-transform duration-500 group-hover:scale-110">
                    {getCategoryEmoji(item.category)}
                </span>

                {/* Veg/Non-veg Badge */}
                <div className="absolute top-3 left-3">
                    <div className={`w-5 h-5 border-2 ${item.isVeg ? 'border-green-500' : 'border-crimson'} flex items-center justify-center bg-black/50`}>
                        <div className={`w-2.5 h-2.5 ${item.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                    </div>
                </div>

                {/* Tags */}
                {item.tags.length > 0 && (
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                        {item.tags.includes('popular') && (
                            <span className="px-2 py-1 bg-gradient-to-r from-gold to-gold-light text-black text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                🔥 Popular
                            </span>
                        )}
                        {item.tags.includes('chef-special') && (
                            <span className="px-2 py-1 bg-crimson text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                Chef&apos;s Pick
                            </span>
                        )}
                        {item.tags.includes('new') && (
                            <span className="px-2 py-1 bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                New
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-white font-semibold text-base group-hover:text-gold transition-colors line-clamp-1">
                        {item.name}
                    </h4>
                    {item.spiceLevel > 0 && (
                        <span className="flex-shrink-0 text-sm" title={`Spice Level: ${item.spiceLevel}`}>
                            {getSpiceLevelEmoji(item.spiceLevel)}
                        </span>
                    )}
                </div>

                <p className="text-gray text-sm mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                </p>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray/10">
                    <span className="text-gold font-display text-xl">
                        {formatPrice(item.price)}
                    </span>

                    <div className="flex gap-2">
                        {onViewDetails && (
                            <button
                                onClick={onViewDetails}
                                className="p-2.5 bg-dark-gray/50 text-gray hover:text-gold hover:bg-dark-gray border border-gray/10 hover:border-gold/30 transition-all"
                                aria-label="View details"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        )}

                        <button
                            onClick={handleAddToCart}
                            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${isAdding
                                    ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                                    : 'bg-crimson text-white hover:bg-crimson-light hover:shadow-[0_0_15px_rgba(185,28,28,0.4)]'
                                }`}
                        >
                            {isAdding ? '✓ Added' : 'Add +'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
