'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
        <div className="space-y-8">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="input pl-12"
                />
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
                {allCategories.map((category) => (
                    <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onCategoryChange(category.id)}
                        className={`px-5 py-3 text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${activeCategory === category.id
                                ? 'bg-crimson text-white shadow-lg'
                                : 'bg-dark-gray text-light-gray hover:bg-gray hover:text-white'
                            }`}
                    >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                    </motion.button>
                ))}
            </div>

            {/* Veg Toggle */}
            <div className="flex items-center justify-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={vegOnly}
                            onChange={(e) => onVegOnlyChange(e.target.checked)}
                            className="sr-only"
                        />
                        <div
                            className={`w-12 h-6 transition-colors duration-300 ${vegOnly ? 'bg-green-600' : 'bg-dark-gray'
                                }`}
                        >
                            <motion.div
                                layout
                                className="absolute top-0.5 w-5 h-5 bg-white"
                                animate={{ left: vegOnly ? '26px' : '2px' }}
                            />
                        </div>
                    </div>
                    <span className="text-light-gray text-sm group-hover:text-white transition-colors">
                        🥬 Vegetarian Only
                    </span>
                </label>

                {searchQuery && (
                    <span className="text-gray text-sm">
                        Showing results for &quot;{searchQuery}&quot;
                    </span>
                )}
            </div>
        </div>
    );
}
