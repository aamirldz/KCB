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
                    <input
                        type="text"
                        placeholder="Search for dishes..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full h-11 pl-11 pr-10 bg-dark-gray border border-gray/30 rounded-full text-white text-sm placeholder-gray focus:border-crimson focus:outline-none transition-colors"
                    />
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
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

            {/* Categories Row + Veg Toggle - All in one line */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
                {/* Category Pills - No box, just text */}
                <div className="flex items-center gap-1">
                    {allCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
                                    ? 'bg-crimson/15 text-crimson border border-crimson/40'
                                    : 'text-gray hover:text-white'
                                }`}
                        >
                            <span className="text-lg">{category.icon}</span>
                            <span className="hidden sm:inline">{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-gray/30 hidden sm:block" />

                {/* Veg Toggle */}
                <button
                    onClick={() => onVegOnlyChange(!vegOnly)}
                    className={`flex items-center gap-2 text-sm font-medium transition-all ${vegOnly ? 'text-green-400' : 'text-gray hover:text-white'
                        }`}
                >
                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${vegOnly ? 'border-green-500 bg-green-500/20' : 'border-gray/50'
                        }`}>
                        {vegOnly && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                    </div>
                    <span>Veg</span>
                </button>
            </div>
        </div>
    );
}
