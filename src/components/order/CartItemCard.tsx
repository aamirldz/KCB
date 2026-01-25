'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CartItem } from '@/types/cart';
import { formatPrice, getSpiceLevelEmoji } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CartItemCardProps {
    item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
    const { updateQuantity, removeFromCart, updateInstructions } = useCart();
    const [showInstructions, setShowInstructions] = React.useState(!!item.specialInstructions);

    const getCategoryEmoji = (category: string) => {
        switch (category) {
            case 'bowls': return '🍜';
            case 'starters': return '🥟';
            case 'noodles': return '🍝';
            case 'sushi': return '🍣';
            case 'rice': return '🍚';
            case 'drinks': return '🍵';
            default: return '🍽️';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-charcoal/50 border border-royal-gold/10 rounded-xl p-4 hover:border-royal-gold/20 transition-colors"
        >
            <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-imperial-red/20 flex items-center justify-center">
                    <span className="text-3xl">{getCategoryEmoji(item.menuItem.category)}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-heading text-text-primary text-sm line-clamp-1">
                                {item.menuItem.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                {item.spiceLevel > 0 && (
                                    <span className="text-xs">{getSpiceLevelEmoji(item.spiceLevel)}</span>
                                )}
                                <span className={`text-xs ${item.menuItem.isVeg ? 'text-green-500' : 'text-imperial-red'}`}>
                                    {item.menuItem.isVeg ? 'Veg' : 'Non-Veg'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-text-muted hover:text-imperial-red transition-colors"
                            aria-label="Remove item"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-royal-gold font-heading">
                            {formatPrice(item.menuItem.price * item.quantity)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-deep-black rounded-lg p-1">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors rounded hover:bg-charcoal"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="w-6 text-center text-sm text-text-primary">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors rounded hover:bg-charcoal"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Special Instructions */}
            {showInstructions && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-royal-gold/10"
                >
                    <textarea
                        value={item.specialInstructions}
                        onChange={(e) => updateInstructions(item.id, e.target.value)}
                        placeholder="Special instructions..."
                        className="w-full bg-deep-black/50 border border-royal-gold/10 rounded-lg px-3 py-2 text-text-primary text-xs placeholder:text-text-muted focus:border-royal-gold focus:outline-none resize-none"
                        rows={2}
                    />
                </motion.div>
            )}

            {!showInstructions && (
                <button
                    onClick={() => setShowInstructions(true)}
                    className="mt-2 text-xs text-text-muted hover:text-royal-gold transition-colors"
                >
                    + Add special instructions
                </button>
            )}
        </motion.div>
    );
}
