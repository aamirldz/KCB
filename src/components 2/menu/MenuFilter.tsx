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
        <div className="flex flex-col items-center gap-8">
            {/* Search Bar - Pill Style */}
            <div className="flex items-center gap-4 px-6 py-4 bg-dark-gray/90 rounded-full border border-gray/15 shadow-lg max-w-md w-full">
                {/* Search Icon */}
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-1 bg-transparent text-white border-none outline-none text-base placeholder:text-gray-500"
                />

                {/* Clear button */}
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Category Pills Row - Horizontal Scrollable */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 px-4 max-w-full scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                {allCategories.map((category) => {
                    const isActive = activeCategory === category.id;
                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${isActive
                                    ? 'bg-crimson border border-crimson/50 text-white shadow-lg shadow-crimson/20'
                                    : 'bg-white/5 border border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10'
                                }`}
                        >
                            <span className="text-base">{category.icon}</span>
                            <span>{category.name}</span>
                        </button>
                    );
                })}

                {/* Veg Only Toggle */}
                <button
                    onClick={() => onVegOnlyChange(!vegOnly)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${vegOnly
                            ? 'bg-green-600/20 border border-green-500/40 text-green-400'
                            : 'bg-white/5 border border-white/10 text-gray-300 hover:border-white/20'
                        }`}
                >
                    <span className="text-base">🥬</span>
                    <span>Veg Only</span>
                    {/* Toggle Switch */}
                    <div className={`relative w-8 h-4 rounded-full transition-colors ${vegOnly ? 'bg-green-500' : 'bg-white/20'}`}>
                        <div
                            className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${vegOnly ? 'left-4' : 'left-0.5'}`}
                        />
                    </div>
                </button>
            </div>
        </div>
    );
}
