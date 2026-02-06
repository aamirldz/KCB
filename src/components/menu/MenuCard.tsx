'use client';

import React from 'react';
import { MenuItem } from '@/types/menu';
import { formatPrice, getSpiceLevelEmoji } from '@/lib/utils';

interface MenuCardProps {
    item: MenuItem;
    onViewDetails?: () => void;
}

export default function MenuCard({ item, onViewDetails }: MenuCardProps) {
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
        <div className="group relative bg-gradient-to-br from-charcoal via-dark-gray to-charcoal border border-gray/20 rounded-2xl overflow-hidden hover:border-crimson/60 hover:shadow-[0_8px_40px_rgba(185,28,28,0.25)] transition-all duration-500">
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-crimson/10 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-br from-crimson/20 via-dark-gray to-charcoal flex items-center justify-center overflow-hidden">
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <span className="text-7xl drop-shadow-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-3">
                    {getCategoryEmoji(item.category)}
                </span>

                {/* Veg/Non-veg Badge - Top Left */}
                <div className="absolute top-4 left-4">
                    <div className={`w-6 h-6 border-2 rounded ${item.isVeg ? 'border-green-500 bg-green-500/20' : 'border-crimson bg-crimson/20'} backdrop-blur-sm flex items-center justify-center`}>
                        <div className={`w-3 h-3 ${item.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                    </div>
                </div>

                {/* Tags - Top Right */}
                {item.tags.length > 0 && (
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {item.tags.includes('popular') && (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-gold via-gold-light to-gold text-black text-[10px] font-bold uppercase tracking-wider rounded-full shadow-[0_2px_10px_rgba(217,119,6,0.5)]">
                                🔥 Popular
                            </span>
                        )}
                        {item.tags.includes('chef-special') && (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-crimson to-crimson-dark text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-[0_2px_10px_rgba(185,28,28,0.5)]">
                                ⭐ Chef&apos;s Pick
                            </span>
                        )}
                        {item.tags.includes('new') && (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-[0_2px_10px_rgba(34,197,94,0.5)]">
                                ✨ New
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 relative z-10">
                {/* Title & Spice */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="text-white font-semibold text-lg leading-tight group-hover:text-gold transition-colors duration-300 line-clamp-1">
                        {item.name}
                    </h4>
                    {item.spiceLevel > 0 && (
                        <span className="flex-shrink-0 text-lg" title={`Spice Level: ${item.spiceLevel}`}>
                            {getSpiceLevelEmoji(item.spiceLevel)}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray text-sm mb-5 line-clamp-2 leading-relaxed">
                    {item.description}
                </p>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray/15">
                    <span className="text-gold font-display text-2xl drop-shadow-[0_0_10px_rgba(217,119,6,0.3)]">
                        {formatPrice(item.price)}
                    </span>

                    {/* Add Button - Opens Modal */}
                    <button
                        onClick={onViewDetails}
                        className="group/btn relative px-6 py-2.5 bg-gradient-to-r from-crimson to-crimson-dark text-white text-sm font-bold uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_rgba(185,28,28,0.5)] hover:scale-105 active:scale-95"
                    >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
