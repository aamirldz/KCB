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
        <section className="pt-20 pb-24 bg-charcoal relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-crimson/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px]" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-px w-8 bg-crimson" />
                            <span className="text-crimson text-xs font-semibold tracking-[0.2em] uppercase">Chef&apos;s Selection</span>
                        </div>
                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-display">
                            Signature <span className="text-gold">Dishes</span>
                        </h2>
                    </div>
                    <Link href="/menu" className="group flex items-center gap-2 text-gold text-sm hover:text-gold-light transition-colors">
                        View All Menu
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {chefSpecials.map((dish, index) => (
                        <div
                            key={dish.id}
                            className="group relative bg-dark-gray/80 border border-gray/10 hover:border-crimson/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(185,28,28,0.15)] overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image Area */}
                            <div className="h-44 bg-gradient-to-br from-crimson/15 via-dark-gray to-charcoal flex items-center justify-center relative overflow-hidden">
                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-crimson/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{getCategoryEmoji(dish.category)}</span>

                                {/* Chef's Pick Badge */}
                                <div className="absolute top-3 right-3 px-2.5 py-1 bg-crimson text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                    Chef&apos;s Pick
                                </div>

                                {/* Veg/Non-veg indicator */}
                                <div className={`absolute top-3 left-3 w-4 h-4 border-2 ${dish.isVeg ? 'border-green-500' : 'border-crimson'} flex items-center justify-center bg-black/50`}>
                                    <div className={`w-2 h-2 ${dish.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="text-white text-base font-semibold line-clamp-1 group-hover:text-gold transition-colors">
                                        {dish.name}
                                    </h4>
                                    {dish.spiceLevel > 0 && (
                                        <span className="text-sm flex-shrink-0">{getSpiceLevelEmoji(dish.spiceLevel)}</span>
                                    )}
                                </div>
                                <p className="text-gray text-sm mb-4 line-clamp-2 leading-relaxed">{dish.description}</p>

                                <div className="flex items-center justify-between pt-3 border-t border-gray/10">
                                    <span className="text-gold font-display text-xl">{formatPrice(dish.price)}</span>
                                    <button
                                        onClick={() => addToCart(dish)}
                                        className="px-4 py-2 bg-crimson/10 text-crimson text-xs font-semibold uppercase tracking-wider hover:bg-crimson hover:text-white transition-all duration-300"
                                    >
                                        Add +
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
