'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem, SpiceLevel } from '@/types/menu';
import { formatPrice, getSpiceLevelEmoji, getSpiceLevelLabel } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import { useCart } from '@/context/CartContext';

interface MenuItemModalProps {
    item: MenuItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function MenuItemModal({ item, isOpen, onClose }: MenuItemModalProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>(item?.spiceLevel || 1);
    const [instructions, setInstructions] = useState('');
    const [isAdded, setIsAdded] = useState(false);

    // Reset state when modal opens with new item
    useEffect(() => {
        if (item) {
            setQuantity(1);
            setSpiceLevel(item.spiceLevel);
            setInstructions('');
            setIsAdded(false);
        }
    }, [item]);

    const handleAddToCart = () => {
        if (item) {
            addToCart(item, quantity, spiceLevel, instructions);
            setIsAdded(true);

            // Close modal after showing success
            setTimeout(() => {
                onClose();
                setIsAdded(false);
            }, 1500);
        }
    };

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

    const spiceLevels = [
        { level: 0 as SpiceLevel, label: 'No Spice', emoji: '❄️', color: 'from-blue-500 to-blue-600' },
        { level: 1 as SpiceLevel, label: 'Mild', emoji: '🌶️', color: 'from-yellow-500 to-orange-500' },
        { level: 2 as SpiceLevel, label: 'Medium', emoji: '🌶️🌶️', color: 'from-orange-500 to-red-500' },
        { level: 3 as SpiceLevel, label: 'Hot', emoji: '🌶️🌶️🌶️', color: 'from-red-500 to-red-700' },
    ];

    if (!item) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
            {/* Success Overlay */}
            {isAdded && (
                <div className="absolute inset-0 bg-green-500/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fadeIn rounded-2xl">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 animate-scaleIn">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">Added to Cart!</h3>
                    <p className="text-white/80">{item.name} × {quantity}</p>
                </div>
            )}

            <div className="space-y-6 relative">
                {/* Header with Image */}
                <div className="relative h-52 -mx-6 -mt-6 rounded-t-2xl overflow-hidden bg-gradient-to-br from-crimson/30 via-dark-gray to-charcoal flex items-center justify-center">
                    <span className="text-8xl drop-shadow-2xl">{getCategoryEmoji(item.category)}</span>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <div className={`w-7 h-7 border-2 rounded ${item.isVeg ? 'border-green-500 bg-green-500/20' : 'border-crimson bg-crimson/20'} backdrop-blur-sm flex items-center justify-center`}>
                            <div className={`w-3.5 h-3.5 ${item.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                        </div>
                    </div>

                    {item.tags.length > 0 && (
                        <div className="absolute top-4 right-4 flex gap-2">
                            {item.tags.map((tag) => (
                                <span key={tag} className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full ${tag === 'popular' ? 'bg-gradient-to-r from-gold to-gold-light text-black' :
                                        tag === 'chef-special' ? 'bg-crimson text-white' :
                                            'bg-green-500 text-white'
                                    }`}>
                                    {tag === 'chef-special' ? "Chef's Special" : tag.charAt(0).toUpperCase() + tag.slice(1)}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Item Details */}
                <div className="px-1">
                    <h2 className="text-white text-2xl font-bold mb-2">{item.name}</h2>
                    <p className="text-gray text-sm leading-relaxed mb-4">{item.description}</p>

                    <div className="flex items-center gap-4">
                        <span className="text-gold font-display text-3xl">
                            {formatPrice(item.price)}
                        </span>
                        {item.spiceLevel > 0 && (
                            <span className="text-gray text-sm flex items-center gap-1">
                                {getSpiceLevelEmoji(item.spiceLevel)} {getSpiceLevelLabel(item.spiceLevel)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Spice Level Selector */}
                {!item.category.includes('drinks') && (
                    <div className="px-1">
                        <label className="flex items-center gap-2 text-light-gray text-sm font-semibold mb-4">
                            <span className="text-gold">🌶️</span> Spice Level
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {spiceLevels.map((sp) => (
                                <button
                                    key={sp.level}
                                    onClick={() => setSpiceLevel(sp.level)}
                                    className={`relative py-3 px-2 rounded-xl text-center transition-all duration-300 overflow-hidden ${spiceLevel === sp.level
                                            ? `bg-gradient-to-br ${sp.color} text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] scale-105`
                                            : 'bg-dark-gray/80 border border-gray/30 text-gray hover:border-gold/50 hover:text-white'
                                        }`}
                                >
                                    <span className="block text-lg mb-1">{sp.emoji}</span>
                                    <span className="block text-xs font-medium">{sp.label}</span>
                                    {spiceLevel === sp.level && (
                                        <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Special Instructions */}
                <div className="px-1">
                    <label className="flex items-center gap-2 text-light-gray text-sm font-semibold mb-3">
                        <span className="text-gold">📝</span> Special Instructions
                    </label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Any allergies, preferences, or special requests..."
                        className="w-full bg-dark-gray/80 border-2 border-gray/30 rounded-xl px-4 py-4 text-white placeholder:text-gray/60 focus:border-gold focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_rgba(217,119,6,0.15)] resize-none transition-all"
                        rows={2}
                    />
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray/20 px-1">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-dark-gray rounded-xl border border-gray/30 overflow-hidden">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 flex items-center justify-center text-gray hover:text-white hover:bg-crimson transition-all"
                            disabled={quantity <= 1}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <span className="w-12 text-center font-bold text-xl text-white">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 flex items-center justify-center text-gray hover:text-white hover:bg-green-600 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className="flex-1 relative py-4 bg-gradient-to-r from-crimson via-crimson-dark to-crimson text-white font-bold text-lg uppercase tracking-wider rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_6px_30px_rgba(185,28,28,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />

                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to Cart — {formatPrice(item.price * quantity)}
                        </span>
                    </button>
                </div>
            </div>
        </Modal>
    );
}
