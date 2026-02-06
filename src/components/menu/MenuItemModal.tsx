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

    // Reset state when modal opens with new item
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
            onClose(); // Just close modal, cart badge in header shows count
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
        { level: 0 as SpiceLevel, label: 'None', emoji: '❄️' },
        { level: 1 as SpiceLevel, label: 'Mild', emoji: '🌶️' },
        { level: 2 as SpiceLevel, label: 'Medium', emoji: '🌶️🌶️' },
        { level: 3 as SpiceLevel, label: 'Hot', emoji: '🔥' },
    ];

    if (!item) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
            <div className="space-y-5">
                {/* Header with Image */}
                <div className="relative h-44 -mx-6 -mt-6 rounded-t-2xl overflow-hidden bg-gradient-to-br from-crimson/20 via-dark-gray to-charcoal flex items-center justify-center">
                    <span className="text-7xl">{getCategoryEmoji(item.category)}</span>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <div className={`w-6 h-6 border-2 rounded ${item.isVeg ? 'border-green-500' : 'border-crimson'} flex items-center justify-center bg-black/50`}>
                            <div className={`w-3 h-3 ${item.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                        </div>
                    </div>

                    {item.tags.length > 0 && (
                        <div className="absolute top-3 right-3 flex gap-1">
                            {item.tags.slice(0, 1).map((tag) => (
                                <span key={tag} className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${tag === 'popular' ? 'bg-gold text-black' :
                                        tag === 'chef-special' ? 'bg-crimson text-white' :
                                            'bg-green-500 text-white'
                                    }`}>
                                    {tag === 'chef-special' ? "Chef's" : tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Item Details */}
                <div>
                    <h2 className="text-white text-xl font-bold mb-1">{item.name}</h2>
                    <p className="text-gray text-sm mb-3">{item.description}</p>
                    <span className="text-gold font-bold text-2xl">{formatPrice(item.price)}</span>
                </div>

                {/* Spice Level Selector */}
                {!item.category.includes('drinks') && (
                    <div>
                        <label className="text-light-gray text-xs font-semibold uppercase tracking-wider mb-2 block">
                            Spice Level
                        </label>
                        <div className="flex gap-2">
                            {spiceLevels.map((sp) => (
                                <button
                                    key={sp.level}
                                    onClick={() => setSpiceLevel(sp.level)}
                                    className={`flex-1 py-2.5 rounded-lg text-center transition-all text-sm ${spiceLevel === sp.level
                                            ? 'bg-crimson text-white'
                                            : 'bg-dark-gray text-gray hover:text-white'
                                        }`}
                                >
                                    <span className="block text-base mb-0.5">{sp.emoji}</span>
                                    <span className="text-[10px]">{sp.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Special Instructions */}
                <div>
                    <label className="text-light-gray text-xs font-semibold uppercase tracking-wider mb-2 block">
                        Special Instructions (Optional)
                    </label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Any allergies or preferences..."
                        className="w-full bg-dark-gray border border-gray/30 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray/60 focus:border-crimson focus:outline-none resize-none"
                        rows={2}
                    />
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray/20">
                    {/* Quantity */}
                    <div className="flex items-center bg-dark-gray rounded-lg overflow-hidden">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 text-gray hover:text-white hover:bg-gray/20 transition-colors text-lg"
                            disabled={quantity <= 1}
                        >
                            −
                        </button>
                        <span className="w-8 text-center font-bold text-white">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 text-gray hover:text-white hover:bg-gray/20 transition-colors text-lg"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 py-3 bg-crimson text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-crimson-light transition-colors"
                    >
                        Add item — {formatPrice(item.price * quantity)}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
