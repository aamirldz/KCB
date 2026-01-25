'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, SpiceLevel } from '@/types/menu';
import { formatPrice, getSpiceLevelEmoji, getSpiceLevelLabel } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
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
    React.useEffect(() => {
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

    if (!item) return null;

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
        <Modal isOpen={isOpen} onClose={onClose} title={item.name} size="lg">
            <div className="space-y-6">
                {/* Image */}
                <div className="relative h-48 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-imperial-red/20 flex items-center justify-center">
                        <span className="text-7xl">{getCategoryEmoji(item.category)}</span>
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant={item.isVeg ? 'veg' : 'nonveg'} />
                        {item.tags.map((tag) => (
                            <Badge key={tag} variant={tag as 'popular' | 'chef-special' | 'new'}>
                                {tag === 'chef-special' ? "Chef's Special" : tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div>
                    <p className="text-text-secondary mb-4">{item.description}</p>
                    <div className="flex items-center gap-4">
                        <span className="text-royal-gold font-heading text-2xl">
                            {formatPrice(item.price)}
                        </span>
                        {item.spiceLevel > 0 && (
                            <span className="text-text-secondary text-sm">
                                {getSpiceLevelEmoji(item.spiceLevel)} {getSpiceLevelLabel(item.spiceLevel)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Spice Level Selector */}
                {!item.category.includes('drinks') && (
                    <div>
                        <label className="block text-sm text-text-secondary mb-3">Spice Level</label>
                        <div className="flex gap-2">
                            {[0, 1, 2, 3].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setSpiceLevel(level as SpiceLevel)}
                                    className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-all ${spiceLevel === level
                                            ? 'bg-imperial-red border-imperial-red text-white'
                                            : 'border-royal-gold/20 text-text-secondary hover:border-royal-gold/50'
                                        }`}
                                >
                                    {level === 0 ? 'No Spice' : getSpiceLevelEmoji(level)}
                                    <span className="block text-xs mt-1">{getSpiceLevelLabel(level)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Special Instructions */}
                <div>
                    <label className="block text-sm text-text-secondary mb-3">Special Instructions</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Any allergies or preferences..."
                        className="w-full bg-charcoal/80 border border-royal-gold/20 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 focus:outline-none resize-none"
                        rows={2}
                    />
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 pt-4 border-t border-royal-gold/10">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 bg-charcoal rounded-lg p-1">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                            disabled={quantity <= 1}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <span className="w-10 text-center font-heading text-lg text-text-primary">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <Button onClick={handleAddToCart} className="flex-1">
                        Add to Cart - {formatPrice(item.price * quantity)}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
