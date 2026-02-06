'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem, SpiceLevel } from '@/types/menu';
import { formatPrice } from '@/lib/utils';
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

    useEffect(() => {
        if (item) {
            setQuantity(1);
            setSpiceLevel(item.spiceLevel);
            setInstructions('');
        }
    }, [item]);

    const handleAddToCart = () => {
        if (item) {
            addToCart(item, quantity, spiceLevel, instructions);
            onClose();
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
        { level: 0 as SpiceLevel, label: 'None', emoji: '❄️', color: 'from-blue-500 to-blue-600' },
        { level: 1 as SpiceLevel, label: 'Mild', emoji: '🌶️', color: 'from-yellow-500 to-orange-500' },
        { level: 2 as SpiceLevel, label: 'Medium', emoji: '🌶️🌶️', color: 'from-orange-500 to-red-500' },
        { level: 3 as SpiceLevel, label: 'Hot', emoji: '🔥', color: 'from-red-500 to-red-700' },
    ];

    if (!item) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
            <div className="space-y-6">
                {/* Header with Image */}
                <div className="relative h-40 -mx-6 -mt-6 rounded-t-2xl overflow-hidden bg-gradient-to-br from-crimson/25 via-dark-gray to-charcoal flex items-center justify-center">
                    <span className="text-8xl drop-shadow-2xl">{getCategoryEmoji(item.category)}</span>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <div className={`w-7 h-7 border-2 rounded-md ${item.isVeg ? 'border-green-500 bg-green-500/30' : 'border-crimson bg-crimson/30'} backdrop-blur-sm flex items-center justify-center`}>
                            <div className={`w-3.5 h-3.5 ${item.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                        </div>
                    </div>

                    {item.tags.length > 0 && (
                        <div className="absolute top-4 right-4">
                            {item.tags.slice(0, 1).map((tag) => (
                                <span key={tag} className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full ${tag === 'popular' ? 'bg-gold text-black' :
                                        tag === 'chef-special' ? 'bg-crimson text-white' :
                                            'bg-green-500 text-white'
                                    }`}>
                                    {tag === 'chef-special' ? "⭐ Chef's" : tag === 'popular' ? '🔥 Popular' : '✨ New'}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Item Details */}
                <div className="pt-2">
                    <h2 className="text-white text-2xl font-bold mb-2">{item.name}</h2>
                    <p className="text-light-gray text-sm leading-relaxed mb-4">{item.description}</p>
                    <span className="text-gold font-display text-3xl drop-shadow-[0_0_10px_rgba(217,119,6,0.3)]">{formatPrice(item.price)}</span>
                </div>

                {/* Spice Level Selector */}
                {!item.category.includes('drinks') && (
                    <div className="bg-dark-gray/50 rounded-xl p-4 border border-gray/20">
                        <label className="text-white text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span>🌶️</span> Spice Level
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {spiceLevels.map((sp) => (
                                <button
                                    key={sp.level}
                                    onClick={() => setSpiceLevel(sp.level)}
                                    className={`py-3 rounded-xl text-center transition-all duration-300 ${spiceLevel === sp.level
                                            ? `bg-gradient-to-br ${sp.color} text-white shadow-lg`
                                            : 'bg-charcoal text-gray hover:text-white hover:bg-charcoal/80'
                                        }`}
                                >
                                    <span className="block text-xl mb-1">{sp.emoji}</span>
                                    <span className="text-xs font-medium">{sp.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Special Instructions */}
                <div className="bg-dark-gray/50 rounded-xl p-4 border border-gray/20">
                    <label className="text-white text-sm font-semibold mb-3 block flex items-center gap-2">
                        <span>📝</span> Special Instructions
                        <span className="text-gray text-xs font-normal">(Optional)</span>
                    </label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g., No onions, extra spicy, allergies..."
                        className="w-full bg-charcoal border border-gray/30 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray/60 focus:border-gold/50 focus:outline-none resize-none"
                        rows={2}
                    />
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray/20">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-charcoal rounded-xl overflow-hidden border border-gray/30">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 text-white hover:bg-crimson/20 transition-colors text-xl font-bold flex items-center justify-center"
                            disabled={quantity <= 1}
                        >
                            −
                        </button>
                        <span className="w-12 text-center font-bold text-white text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 text-white hover:bg-crimson/20 transition-colors text-xl font-bold flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 py-4 bg-gradient-to-r from-crimson to-crimson-dark text-white font-bold text-base uppercase tracking-wider rounded-xl hover:shadow-[0_4px_30px_rgba(185,28,28,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        Add to Cart — {formatPrice(item.price * quantity)}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
