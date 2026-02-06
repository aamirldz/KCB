'use client';

import React from 'react';
import { MENU_CATEGORIES } from '@/types/menu';

interface MenuFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    vegOnly: boolean;
    onVegOnlyChange: (vegOnly: boolean) => void;
}

export default function MenuFilter({
    activeCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
    vegOnly,
    onVegOnlyChange,
}: MenuFilterProps) {
    const allCategories = [
        { id: 'all', name: 'All', description: 'View all dishes', icon: '🍽️' },
        ...MENU_CATEGORIES,
    ];

    return (
        <div className="relative">
            {/* Glassmorphism Container */}
            <div className="relative bg-gradient-to-br from-charcoal/90 via-dark-gray/80 to-charcoal/90 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/30 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-2xl" />

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto mb-6">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full px-6 py-4 pl-14 bg-black/40 border-2 border-gray/30 rounded-xl text-white text-lg placeholder-gray focus:border-gold focus:outline-none focus:shadow-[0_0_20px_rgba(217,119,6,0.25)] transition-all duration-300"
                        />
                        <svg
                            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gold"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-gray/30 hover:bg-crimson rounded-full text-gray hover:text-white transition-all"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Pills - Horizontally scrollable on mobile */}
                <div className="relative mb-6">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        {allCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onCategoryChange(category.id)}
                                className={`group relative px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 overflow-hidden ${activeCategory === category.id
                                        ? 'bg-gradient-to-r from-crimson via-crimson-dark to-crimson text-white shadow-[0_4px_20px_rgba(185,28,28,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'
                                        : 'bg-black/40 text-light-gray border border-gray/30 hover:border-gold/50 hover:text-white hover:shadow-[0_4px_15px_rgba(217,119,6,0.15)]'
                                    }`}
                            >
                                {/* Active glow effect */}
                                {activeCategory === category.id && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                                )}
                                <span className={`text-xl relative z-10 transition-transform duration-300 ${activeCategory === category.id ? 'scale-110' : 'group-hover:scale-110'
                                    }`}>
                                    {category.icon}
                                </span>
                                <span className="relative z-10 hidden sm:inline">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Vegetarian Toggle & Search Results */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {/* Veg Toggle */}
                    <button
                        onClick={() => onVegOnlyChange(!vegOnly)}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-300 ${vegOnly
                                ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                                : 'bg-black/30 border-gray/30 text-gray hover:border-green-500/50 hover:text-green-400'
                            }`}
                    >
                        <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${vegOnly ? 'bg-green-500' : 'bg-gray/30'
                            }`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${vegOnly ? 'left-7' : 'left-1'
                                }`} />
                        </div>
                        <span className="font-semibold text-sm">🥬 Veg Only</span>
                    </button>

                    {/* Search results indicator */}
                    {searchQuery && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-xl">
                            <span className="text-gold text-sm">
                                Searching: <span className="font-semibold">&quot;{searchQuery}&quot;</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
