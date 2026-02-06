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
        { id: 'all', name: 'All', icon: '🍽️' },
        ...MENU_CATEGORIES,
    ];

    return (
        <div className="space-y-5">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
                <div className="relative">
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for dishes..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full h-11 pl-11 pr-10 bg-dark-gray border border-gray/30 rounded-full text-white text-sm placeholder-gray focus:border-crimson focus:outline-none transition-colors"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray hover:text-white text-sm"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Categories - Glass containers, horizontal scroll on mobile */}
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex items-center gap-2 min-w-max justify-center">
                    {allCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl backdrop-blur-sm transition-all min-w-[60px] ${activeCategory === category.id
                                    ? 'bg-crimson/90 text-white shadow-lg shadow-crimson/30'
                                    : 'bg-white/5 border border-white/10 text-gray hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{category.icon}</span>
                            <span className="text-[10px] font-medium whitespace-nowrap">{category.name}</span>
                        </button>
                    ))}

                    {/* Divider */}
                    <div className="w-px h-10 bg-gray/30 mx-1" />

                    {/* Veg Toggle Switch */}
                    <button
                        onClick={() => onVegOnlyChange(!vegOnly)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl backdrop-blur-sm transition-all ${vegOnly
                                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                                : 'bg-white/5 border border-white/10 text-gray hover:bg-white/10'
                            }`}
                    >
                        <span className="text-lg">🥬</span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${vegOnly ? 'bg-green-500' : 'bg-gray/40'
                            }`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${vegOnly ? 'left-5' : 'left-0.5'
                                }`} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
