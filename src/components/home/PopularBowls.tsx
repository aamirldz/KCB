'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
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
                left: direction === 'left' ? -300 : 300,
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
        <section className="py-16 bg-black">
            <div className="container">
                {/* Header */}
                <div className="flex items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="text-gold text-xs font-semibold tracking-widest uppercase">Most Ordered</span>
                        <h2 className="text-white text-3xl md:text-4xl font-display mt-1">Customer Favorites</h2>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => scroll('left')} className="w-10 h-10 border border-gray/30 flex items-center justify-center text-gray hover:text-white hover:border-crimson transition-all">
                            ←
                        </button>
                        <button onClick={() => scroll('right')} className="w-10 h-10 border border-gray/30 flex items-center justify-center text-gray hover:text-white hover:border-crimson transition-all">
                            →
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll */}
                <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                    {popularItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex-shrink-0 w-64 bg-charcoal border border-gray/10 group hover:border-gold/30 transition-all"
                        >
                            <div className="h-32 bg-gradient-to-br from-gold/10 to-transparent flex items-center justify-center relative">
                                <span className="text-5xl group-hover:scale-110 transition-transform">{getCategoryEmoji(item.category)}</span>
                                <span className="absolute top-2 right-2 px-2 py-0.5 bg-gold text-black text-[10px] font-bold uppercase">
                                    Popular
                                </span>
                            </div>
                            <div className="p-4">
                                <h4 className="text-white text-sm font-semibold mb-1 line-clamp-1">{item.name}</h4>
                                <p className="text-gray text-xs mb-3 line-clamp-1">{item.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-gold font-display">{formatPrice(item.price)}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="px-3 py-1.5 bg-crimson text-white text-xs font-semibold hover:bg-crimson-light transition-all"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
