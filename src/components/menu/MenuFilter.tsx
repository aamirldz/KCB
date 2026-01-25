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
        <div className="space-y-6">
            {/* Search Bar - Enhanced */}
            <div className="relative max-w-lg mx-auto">
                <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-5 py-4 pl-14 bg-dark-gray/80 border border-gray/20 text-white placeholder-gray focus:border-gold/50 focus:outline-none focus:shadow-[0_0_15px_rgba(217,119,6,0.15)] transition-all"
                />
                <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray"
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

            {/* Category Tabs - Enhanced with scrollable on mobile */}
            <div className="relative">
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {allCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`group px-4 md:px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 border ${activeCategory === category.id
                                    ? 'bg-gradient-to-r from-crimson to-crimson-dark text-white border-crimson shadow-[0_0_20px_rgba(185,28,28,0.3)]'
                                    : 'bg-dark-gray/50 text-light-gray border-gray/20 hover:border-gold/40 hover:text-white hover:shadow-[0_0_15px_rgba(217,119,6,0.1)]'
                                }`}
                        >
                            <span className={`text-lg transition-transform ${activeCategory === category.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                {category.icon}
                            </span>
                            <span className="hidden sm:inline">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Veg Toggle - Enhanced */}
            <div className="flex items-center justify-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer group px-5 py-3 bg-dark-gray/30 border border-gray/10 hover:border-green-500/30 transition-all">
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={vegOnly}
                            onChange={(e) => onVegOnlyChange(e.target.checked)}
                            className="sr-only"
                        />
                        <div
                            className={`w-14 h-7 rounded-full transition-colors duration-300 ${vegOnly ? 'bg-green-600 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-dark-gray border border-gray/30'
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${vegOnly ? 'left-8' : 'left-1'
                                    }`}
                            />
                        </div>
                    </div>
                    <span className={`text-sm font-medium transition-colors ${vegOnly ? 'text-green-400' : 'text-light-gray group-hover:text-white'}`}>
                        🥬 Vegetarian Only
                    </span>
                </label>

                {searchQuery && (
                    <span className="text-gray text-sm px-4 py-2 bg-dark-gray/30 border border-gray/10">
                        Results for &quot;{searchQuery}&quot;
                    </span>
                )}
            </div>
        </div>
    );
}
