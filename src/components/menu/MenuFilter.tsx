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
        <div className="space-y-6">
            {/* Search Bar - Clean minimal design */}
            <div className="max-w-md mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for dishes..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full h-12 pl-12 pr-10 bg-dark-gray border border-gray/30 rounded-full text-white text-sm placeholder-gray focus:border-crimson focus:outline-none transition-colors"
                    />
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Category Pills - 6 in a row, Swiggy/Zomato style */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 md:gap-4 flex-wrap justify-center">
                    {allCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl transition-all duration-200 min-w-[70px] ${activeCategory === category.id
                                    ? 'bg-crimson text-white shadow-lg shadow-crimson/30'
                                    : 'bg-dark-gray/60 text-gray hover:bg-dark-gray hover:text-white'
                                }`}
                        >
                            <span className="text-2xl">{category.icon}</span>
                            <span className="text-[11px] font-medium whitespace-nowrap">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Veg Toggle - Compact */}
            <div className="flex justify-center">
                <button
                    onClick={() => onVegOnlyChange(!vegOnly)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${vegOnly
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                            : 'bg-dark-gray/50 text-gray border border-gray/20 hover:text-white'
                        }`}
                >
                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${vegOnly ? 'border-green-500 bg-green-500/20' : 'border-gray/50'
                        }`}>
                        {vegOnly && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                    </div>
                    Veg Only
                </button>
            </div>
        </div>
    );
}
