'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderItem, OrderType } from '@/types/order';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface POSCartProps {
    items: OrderItem[];
    onUpdateQuantity: (itemId: string, delta: number) => void;
    onRemoveItem: (itemId: string) => void;
    onUpdateInstructions: (itemId: string, instructions: string) => void;
    onSubmitOrder: (type: OrderType, tableNumber: string, customerName: string, notes: string) => void;
    onClearCart: () => void;
}

export default function POSCart({
    items,
    onUpdateQuantity,
    onRemoveItem,
    onUpdateInstructions,
    onSubmitOrder,
    onClearCart,
}: POSCartProps) {
    const [orderType, setOrderType] = useState<OrderType>('dine-in');
    const [tableNumber, setTableNumber] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const handleSubmit = async () => {
        if (items.length === 0) return;
        if (orderType === 'dine-in' && !tableNumber) {
            alert('Please enter table number');
            return;
        }

        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 500));
        onSubmitOrder(orderType, tableNumber, customerName, notes);
        setTableNumber('');
        setCustomerName('');
        setNotes('');
        setIsSubmitting(false);
    };

    return (
        <div className="h-full flex flex-col bg-charcoal border-l border-dark-gray">
            {/* Header */}
            <div className="p-4 border-b border-dark-gray">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-display text-lg">Current Order</h3>
                    {items.length > 0 && (
                        <button
                            onClick={onClearCart}
                            className="text-xs text-gray hover:text-crimson transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Order Type Toggle */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setOrderType('dine-in')}
                        className={`flex-1 py-2 text-sm font-semibold transition-all ${orderType === 'dine-in'
                                ? 'bg-crimson text-white'
                                : 'bg-dark-gray text-gray hover:text-white'
                            }`}
                    >
                        🍽️ Dine In
                    </button>
                    <button
                        onClick={() => setOrderType('takeaway')}
                        className={`flex-1 py-2 text-sm font-semibold transition-all ${orderType === 'takeaway'
                                ? 'bg-crimson text-white'
                                : 'bg-dark-gray text-gray hover:text-white'
                            }`}
                    >
                        📦 Takeaway
                    </button>
                </div>
            </div>

            {/* Table/Customer Info */}
            <div className="p-4 border-b border-dark-gray space-y-3">
                {orderType === 'dine-in' && (
                    <div>
                        <label className="text-xs text-gray uppercase tracking-wider">Table Number *</label>
                        <input
                            type="text"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            placeholder="e.g., T1, T5"
                            className="input mt-1 text-center text-lg font-bold"
                        />
                    </div>
                )}
                <div>
                    <label className="text-xs text-gray uppercase tracking-wider">Customer Name</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Optional"
                        className="input mt-1"
                    />
                </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence>
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <span className="text-4xl block mb-3">🛒</span>
                            <p className="text-gray text-sm">No items yet</p>
                            <p className="text-gray text-xs mt-1">Tap items to add</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-dark-gray p-3 border border-gray/20"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <h4 className="text-white text-sm font-medium line-clamp-1">
                                                {item.name}
                                            </h4>
                                            <button
                                                onClick={() => onRemoveItem(item.id)}
                                                className="text-gray hover:text-crimson transition-colors ml-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-gold text-sm">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                                    className="w-7 h-7 bg-charcoal text-white flex items-center justify-center hover:bg-crimson transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                                    className="w-7 h-7 bg-charcoal text-white flex items-center justify-center hover:bg-crimson transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Special Instructions */}
                                        <input
                                            type="text"
                                            value={item.specialInstructions}
                                            onChange={(e) => onUpdateInstructions(item.id, e.target.value)}
                                            placeholder="Special instructions..."
                                            className="w-full mt-2 px-2 py-1 text-xs bg-charcoal border border-gray/20 text-gray focus:text-white focus:border-gold/50 outline-none"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Order Notes */}
            {items.length > 0 && (
                <div className="p-4 border-t border-dark-gray">
                    <label className="text-xs text-gray uppercase tracking-wider">Order Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special requests..."
                        className="input mt-1 text-sm min-h-[60px] resize-none"
                    />
                </div>
            )}

            {/* Summary & Submit */}
            <div className="p-4 border-t border-dark-gray bg-black">
                <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray">Subtotal</span>
                        <span className="text-cream">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray">GST (5%)</span>
                        <span className="text-cream">{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-display pt-2 border-t border-dark-gray">
                        <span className="text-white">Total</span>
                        <span className="text-gold">{formatPrice(total)}</span>
                    </div>
                </div>

                <Button
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={items.length === 0}
                    className="w-full py-4 text-base"
                >
                    Send to Kitchen
                </Button>
            </div>
        </div>
    );
}
