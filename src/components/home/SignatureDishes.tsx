'use client';

import React from 'react';
import Link from 'next/link';
import { getChefSpecials } from '@/data/menu';
import { formatPrice, getSpiceLevelEmoji } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export default function SignatureDishes() {
    const chefSpecials = getChefSpecials().slice(0, 4);
    const { addToCart } = useCart();

    const getCategoryEmoji = (category: string) => {
        switch (category) {
            case 'bowls': return '🍜';
            case 'starters': return '🥟';
            case 'noodles': return '🍝';
            default: return '🍽️';
        }
    };

    return (
        <section className="py-20 bg-charcoal">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <span className="text-crimson text-xs font-semibold tracking-widest uppercase">Chef&apos;s Selection</span>
                        <h2 className="text-white text-3xl md:text-4xl font-display mt-1">Signature Dishes</h2>
                    </div>
                    <Link href="/menu" className="text-gold text-sm hover:text-gold-light transition-colors">
                        View All Menu →
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {chefSpecials.map((dish) => (
                        <div
                            key={dish.id}
                            className="group bg-dark-gray border border-gray/10 hover:border-crimson/40 transition-all animate-fade-in"
                        >
                            {/* Image */}
                            <div className="h-40 bg-gradient-to-br from-crimson/10 to-transparent flex items-center justify-center relative">
                                <span className="text-6xl group-hover:scale-110 transition-transform">{getCategoryEmoji(dish.category)}</span>
                                <span className="absolute top-2 right-2 px-2 py-0.5 bg-crimson text-white text-[10px] font-bold uppercase">
                                    Chef&apos;s Pick
                                </span>
                                <div className={`absolute top-2 left-2 w-3 h-3 border ${dish.isVeg ? 'border-green-500' : 'border-crimson'} flex items-center justify-center`}>
                                    <div className={`w-1.5 h-1.5 ${dish.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-gold transition-colors">
                                        {dish.name}
                                    </h4>
                                    {dish.spiceLevel > 0 && <span className="text-xs">{getSpiceLevelEmoji(dish.spiceLevel)}</span>}
                                </div>
                                <p className="text-gray text-xs mb-4 line-clamp-2">{dish.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-gold font-display text-lg">{formatPrice(dish.price)}</span>
                                    <button
                                        onClick={() => addToCart(dish)}
                                        className="px-4 py-2 bg-crimson/10 text-crimson text-xs font-semibold hover:bg-crimson hover:text-white transition-all"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
