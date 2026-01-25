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
        <div className="bg-dark-gray/50 border border-gray/10 p-6 md:p-8">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-5 py-4 pl-14 bg-charcoal border border-gray/20 text-white placeholder-gray focus:border-gold/50 focus:outline-none transition-all"
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

            {/* Category Tabs */}
            <div className="mb-6">
                <div className="flex flex-wrap justify-center gap-2">
                    {allCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${activeCategory === category.id
                                    ? 'bg-crimson text-white'
                                    : 'bg-charcoal text-gray hover:text-white hover:bg-gray/20 border border-gray/10'
                                }`}
                        >
                            <span className="text-base">{category.icon}</span>
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Veg Toggle */}
            <div className="flex items-center justify-center">
                <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={vegOnly}
                            onChange={(e) => onVegOnlyChange(e.target.checked)}
                            className="sr-only"
                        />
                        <div
                            className={`w-12 h-6 transition-colors duration-300 ${vegOnly ? 'bg-green-600' : 'bg-charcoal border border-gray/30'
                                }`}
                        >
                            <div
                                className={`absolute top-0.5 w-5 h-5 bg-white transition-all duration-300 ${vegOnly ? 'left-[26px]' : 'left-0.5'
                                    }`}
                            />
                        </div>
                    </div>
                    <span className={`text-sm ${vegOnly ? 'text-green-400' : 'text-gray'}`}>
                        🥬 Vegetarian Only
                    </span>
                </label>
            </div>
        </div>
    );
}
