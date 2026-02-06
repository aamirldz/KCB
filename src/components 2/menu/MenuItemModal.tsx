'use client';

import React, { useState } from 'react';
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
    const [isAdding, setIsAdding] = useState(false);

    // Reset state when modal opens with new item
    React.useEffect(() => {
        if (item) {
            setQuantity(1);
            setSpiceLevel(item.spiceLevel);
            setInstructions('');
        }
    }, [item]);

    const handleAddToCart = () => {
        if (item) {
            setIsAdding(true);
            addToCart(item, quantity, spiceLevel, instructions);
            setTimeout(() => {
                setIsAdding(false);
                onClose();
            }, 500);
        }
    };

    if (!item) return null;

    const spiceLevels = [
        { level: 0, label: 'No Spice', emoji: '🚫', color: 'bg-gray-600' },
        { level: 1, label: 'Mild', emoji: '🌶️', color: 'bg-yellow-600' },
        { level: 2, label: 'Medium', emoji: '🌶️🌶️', color: 'bg-orange-600' },
        { level: 3, label: 'Hot', emoji: '🌶️🌶️🌶️', color: 'bg-red-600' },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
            <div className="relative">
                {/* Hero Image */}
                <div className="relative h-56 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badges on image */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {/* Veg/Non-Veg */}
                        <div className={`w-6 h-6 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center bg-white rounded`}>
                            <div className={`w-3 h-3 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                        </div>

                        {item.tags.includes('popular') && (
                            <span className="px-2 py-1 bg-gold text-black text-xs font-bold rounded">
                                🔥 Bestseller
                            </span>
                        )}
                        {item.tags.includes('chef-special') && (
                            <span className="px-2 py-1 bg-crimson text-white text-xs font-bold rounded">
                                ⭐ Chef's Special
                            </span>
                        )}
                    </div>

                    {/* Name & Price overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-white text-2xl font-bold mb-1">{item.name}</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-gold text-xl font-bold">{formatPrice(item.price)}</span>
                            {item.spiceLevel > 0 && (
                                <span className="text-white/80 text-sm">
                                    {getSpiceLevelEmoji(item.spiceLevel)} {getSpiceLevelLabel(item.spiceLevel)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="px-1 mb-6">
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* Spice Level Selector */}
                {!item.category.includes('drinks') && (
                    <div className="mb-6">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                            🌶️ Customize Spice Level
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {spiceLevels.map(({ level, label, emoji, color }) => (
                                <button
                                    key={level}
                                    onClick={() => setSpiceLevel(level as SpiceLevel)}
                                    className={`relative py-3 px-2 rounded-lg border-2 text-center transition-all ${spiceLevel === level
                                            ? `${color} border-transparent text-white shadow-lg scale-105`
                                            : 'bg-dark-gray border-gray/30 text-gray-400 hover:border-gray/50'
                                        }`}
                                >
                                    <span className="block text-lg mb-1">{emoji}</span>
                                    <span className="block text-xs font-medium">{label}</span>
                                    {spiceLevel === level && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Special Instructions */}
                <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                        📝 Special Instructions
                        <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                    </h3>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="E.g., No onions, extra spicy, less salt..."
                        className="w-full bg-dark-gray border border-gray/30 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none resize-none text-sm"
                        rows={2}
                    />
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray/20">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-dark-gray rounded-lg overflow-hidden border border-gray/30">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors disabled:opacity-50"
                            disabled={quantity <= 1}
                        >
                            <span className="text-2xl font-light">−</span>
                        </button>
                        <span className="w-12 text-center font-bold text-xl text-white">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                        >
                            <span className="text-2xl font-light">+</span>
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`flex-1 py-4 rounded-lg font-bold text-base uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${isAdding
                                ? 'bg-green-600 text-white'
                                : 'bg-gradient-to-r from-crimson to-red-600 text-white hover:from-red-600 hover:to-crimson shadow-lg hover:shadow-crimson/30'
                            }`}
                    >
                        {isAdding ? (
                            <>
                                <span className="text-xl">✓</span>
                                Added to Cart!
                            </>
                        ) : (
                            <>
                                <span className="text-lg">🛒</span>
                                Add {quantity > 1 ? `${quantity} items` : 'to Cart'} • {formatPrice(item.price * quantity)}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
