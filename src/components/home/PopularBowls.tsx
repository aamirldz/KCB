'use client';

import React, { useRef } from 'react';
import { getPopularItems } from '@/data/menu';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export default function PopularBowls() {
    const popularItems = getPopularItems().slice(0, 6);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -320 : 320,
                behavior: 'smooth',
            });
        }
    };

    const getCategoryEmoji = (category: string) => {
        switch (category) {
            case 'bowls': return '🍜';
            case 'starters': return '🥟';
            case 'noodles': return '🍝';
            case 'sushi': return '🍣';
            case 'rice': return '🍚';
            default: return '🍽️';
        }
    };

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Top Divider Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[200px] -translate-y-1/2" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="flex items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-px w-8 bg-gold" />
                            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Most Ordered</span>
                        </div>
                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-display">
                            Customer <span className="text-crimson">Favorites</span>
                        </h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 border border-gray/30 flex items-center justify-center text-gray hover:text-white hover:border-gold hover:shadow-[0_0_15px_rgba(217,119,6,0.3)] transition-all"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 border border-gray/30 flex items-center justify-center text-gray hover:text-white hover:border-gold hover:shadow-[0_0_15px_rgba(217,119,6,0.3)] transition-all"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll */}
                <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 scroll-smooth">
                    {popularItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 w-80 bg-charcoal/80 border border-gray/10 group hover:border-gold/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,6,0.1)]"
                        >
                            {/* Image */}
                            <div className="h-40 bg-gradient-to-br from-gold/10 via-dark-gray to-charcoal flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{getCategoryEmoji(item.category)}</span>

                                {/* Popular Badge */}
                                <div className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-gold to-gold-light text-black text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                    🔥 Popular
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h4 className="text-white text-base font-semibold mb-2 line-clamp-1 group-hover:text-gold transition-colors">{item.name}</h4>
                                <p className="text-gray text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

                                <div className="flex items-center justify-between pt-3 border-t border-gray/10">
                                    <span className="text-gold font-display text-xl">{formatPrice(item.price)}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="px-4 py-2 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-black transition-all duration-300"
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
