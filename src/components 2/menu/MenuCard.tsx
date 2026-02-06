'use client';

import React from 'react';
import { MenuItem } from '@/types/menu';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface MenuCardProps {
    item: MenuItem;
    onAddClick?: () => void;
}

export default function MenuCard({ item, onAddClick }: MenuCardProps) {
    const { cart, updateQuantity } = useCart();

    // Find this item in cart
    const cartItem = cart.items.find(ci => ci.menuItem.id === item.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onAddClick) {
            onAddClick();
        }
    };

    const handleIncrease = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (cartItem) {
            updateQuantity(cartItem.id, cartItem.quantity + 1);
        }
    };

    const handleDecrease = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (cartItem && cartItem.quantity > 0) {
            updateQuantity(cartItem.id, cartItem.quantity - 1);
        }
    };

    return (
        <div
            onClick={onAddClick}
            className={`relative bg-charcoal border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] ${quantityInCart > 0
                ? 'border-gold/40 shadow-[0_4px_20px_rgba(217,119,6,0.15)]'
                : 'border-gray/10 hover:border-crimson/30 hover:shadow-[0_4px_20px_rgba(185,28,28,0.1)]'
                }`}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-dark-gray overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Veg/Non-Veg Badge - Top Left */}
                <div className="absolute top-2 left-2">
                    <div className={`w-5 h-5 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center bg-white rounded`}>
                        <div className={`w-2.5 h-2.5 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                    </div>
                </div>

                {/* Quantity Badge - Top Right */}
                {quantityInCart > 0 && (
                    <div className="absolute top-2 right-2 bg-gold text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                        {quantityInCart} added
                    </div>
                )}

                {/* Tags - Bottom Left */}
                {item.tags.length > 0 && (
                    <div className="absolute bottom-2 left-2 flex gap-1.5">
                        {item.tags.includes('popular') && (
                            <span className="px-2 py-1 bg-gold text-black text-[10px] font-bold uppercase rounded shadow-lg">
                                🔥 Bestseller
                            </span>
                        )}
                        {item.tags.includes('chef-special') && (
                            <span className="px-2 py-1 bg-crimson text-white text-[10px] font-bold uppercase rounded shadow-lg">
                                ⭐ Special
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Name */}
                <h4 className={`font-semibold text-sm leading-snug line-clamp-2 mb-2 ${quantityInCart > 0 ? 'text-gold' : 'text-white'
                    }`}>
                    {item.name}
                </h4>

                {/* Price & Add Button Row */}
                <div className="flex items-center justify-between">
                    <span className="text-gold font-bold text-lg">
                        {formatPrice(item.price)}
                    </span>

                    {/* Add/Quantity Controls */}
                    {quantityInCart > 0 ? (
                        <div className="flex items-center bg-dark-gray rounded-lg overflow-hidden border border-gold/30">
                            <button
                                onClick={handleDecrease}
                                className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                            >
                                <span className="text-lg font-medium">−</span>
                            </button>
                            <span className="w-7 text-center text-gold font-bold text-sm">{quantityInCart}</span>
                            <button
                                onClick={handleIncrease}
                                className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                            >
                                <span className="text-lg font-medium">+</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddClick}
                            className="px-4 py-2 bg-crimson text-white text-xs font-bold uppercase rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-crimson/20"
                        >
                            ADD
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
