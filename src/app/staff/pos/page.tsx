'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '@/data/menu';
import { MENU_CATEGORIES } from '@/types/menu';
import { OrderItem, OrderType } from '@/types/order';
import { useOrders } from '@/context/OrderContext';
import { generateId, formatPrice } from '@/lib/utils';

export default function POSPage() {
    const router = useRouter();
    const { currentStaff, createOrder, getActiveOrders } = useOrders();
    const [cartItems, setCartItems] = useState<OrderItem[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderType, setOrderType] = useState<OrderType>('dine-in');
    const [tableNumber, setTableNumber] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [notes, setNotes] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [lastOrderNumber, setLastOrderNumber] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!currentStaff) router.push('/staff');
    }, [currentStaff, router]);

    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            if (activeCategory !== 'all' && item.category !== activeCategory) return false;
            if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [activeCategory, searchQuery]);

    const handleAddItem = useCallback((item: any) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.menuItemId === item.id);
            if (existing) {
                return prev.map((i) => i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, {
                id: generateId(),
                menuItemId: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                spiceLevel: item.spiceLevel,
                specialInstructions: '',
                isVeg: item.isVeg,
                status: 'pending' as const,
            }];
        });
    }, []);

    const handleUpdateQuantity = useCallback((itemId: string, delta: number) => {
        setCartItems((prev) => prev.map((item) => {
            if (item.id === itemId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        }).filter(Boolean) as OrderItem[]);
    }, []);

    const handleRemoveItem = useCallback((itemId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const handleSubmit = async () => {
        if (cartItems.length === 0) return;
        if (orderType === 'dine-in' && !tableNumber) {
            alert('Please enter table number');
            return;
        }
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 500));
        const order = createOrder(cartItems, orderType, tableNumber, customerName, notes);
        setLastOrderNumber(order.orderNumber);
        setCartItems([]);
        setTableNumber('');
        setCustomerName('');
        setNotes('');
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const allCategories = [{ id: 'all', name: 'All', icon: '🍽️' }, ...MENU_CATEGORIES];

    const getCategoryEmoji = (category: string) => {
        const cat = MENU_CATEGORIES.find(c => c.id === category);
        return cat?.icon || '🍽️';
    };

    if (!currentStaff) return null;

    return (
        <>
            {/* Spacer for fixed staff navbar */}
            <div className="h-16" />
            <div className="min-h-[calc(100vh-5rem)] flex">
                {/* Left: Menu */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Categories */}
                    <div className="p-3 bg-black/30 border-b border-dark-gray flex items-center gap-3">
                        <div className="relative flex-1 max-w-xs">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 pl-9 bg-charcoal border border-gray/20 text-white text-sm placeholder-gray focus:border-crimson/50 outline-none"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div className="flex gap-1 overflow-x-auto flex-1 scrollbar-hide">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${activeCategory === cat.id
                                        ? 'bg-crimson text-white'
                                        : 'bg-charcoal text-gray hover:text-white'
                                        }`}
                                >
                                    {cat.icon} {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="flex-1 overflow-y-auto p-3">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                            {filteredItems.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.02 }}
                                    onClick={() => handleAddItem(item)}
                                    className="bg-charcoal/50 border border-gray/10 p-3 text-left hover:border-crimson/30 hover:bg-charcoal active:scale-95 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-2xl group-hover:scale-110 transition-transform">{getCategoryEmoji(item.category)}</span>
                                        <div className={`w-2.5 h-2.5 ${item.isVeg ? 'border-green-500' : 'border-crimson'} border flex items-center justify-center`}>
                                            <div className={`w-1 h-1 ${item.isVeg ? 'bg-green-500' : 'bg-crimson'} rounded-full`} />
                                        </div>
                                    </div>
                                    <h4 className="text-white text-sm font-medium line-clamp-2 mb-1.5 min-h-[2.25rem]">{item.name}</h4>
                                    <span className="text-gold font-semibold text-sm">{formatPrice(item.price)}</span>
                                </motion.button>
                            ))}
                        </div>
                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <span className="text-4xl block mb-2">🔍</span>
                                <p className="text-gray text-sm">No items found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Cart */}
                <div className="w-80 lg:w-96 flex-shrink-0 flex flex-col bg-black/40 border-l border-dark-gray">
                    {/* Cart Header */}
                    <div className="p-3 border-b border-dark-gray">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold">Current Order</h3>
                            {cartItems.length > 0 && (
                                <button onClick={() => setCartItems([])} className="text-xs text-gray hover:text-crimson">Clear</button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setOrderType('dine-in')}
                                className={`flex-1 py-2 text-xs font-semibold transition-all ${orderType === 'dine-in' ? 'bg-crimson text-white' : 'bg-charcoal text-gray'}`}
                            >
                                🍽️ Dine In
                            </button>
                            <button
                                onClick={() => setOrderType('takeaway')}
                                className={`flex-1 py-2 text-xs font-semibold transition-all ${orderType === 'takeaway' ? 'bg-crimson text-white' : 'bg-charcoal text-gray'}`}
                            >
                                📦 Takeaway
                            </button>
                        </div>
                    </div>

                    {/* Table/Customer */}
                    <div className="p-3 border-b border-dark-gray space-y-2">
                        {orderType === 'dine-in' && (
                            <input
                                type="text"
                                value={tableNumber}
                                onChange={(e) => setTableNumber(e.target.value)}
                                placeholder="Table # *"
                                className="w-full px-3 py-2 bg-charcoal border border-gray/20 text-white text-sm placeholder-gray focus:border-gold/50 outline-none text-center font-bold"
                            />
                        )}
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Customer Name (optional)"
                            className="w-full px-3 py-2 bg-charcoal border border-gray/20 text-white text-sm placeholder-gray focus:border-gold/50 outline-none"
                        />
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-8">
                                <span className="text-3xl block mb-2">🛒</span>
                                <p className="text-gray text-sm">Tap items to add</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-charcoal/50 p-2.5 border border-gray/10"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                                            <span className="text-gold text-sm">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                        <div className="flex items-center gap-1 ml-2">
                                            <button onClick={() => handleUpdateQuantity(item.id, -1)} className="w-6 h-6 bg-dark-gray text-white text-xs flex items-center justify-center hover:bg-crimson">-</button>
                                            <span className="text-white text-sm w-5 text-center">{item.quantity}</span>
                                            <button onClick={() => handleUpdateQuantity(item.id, 1)} className="w-6 h-6 bg-dark-gray text-white text-xs flex items-center justify-center hover:bg-crimson">+</button>
                                            <button onClick={() => handleRemoveItem(item.id)} className="w-6 h-6 text-gray hover:text-crimson text-xs">×</button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Notes & Submit */}
                    {cartItems.length > 0 && (
                        <div className="p-3 border-t border-dark-gray">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Order notes..."
                                className="w-full px-3 py-2 bg-charcoal border border-gray/20 text-white text-sm placeholder-gray focus:border-gold/50 outline-none resize-none h-12"
                            />
                        </div>
                    )}

                    {/* Totals */}
                    <div className="p-3 border-t border-dark-gray bg-black/50">
                        <div className="space-y-1 text-sm mb-3">
                            <div className="flex justify-between"><span className="text-gray">Subtotal</span><span className="text-white">{formatPrice(subtotal)}</span></div>
                            <div className="flex justify-between"><span className="text-gray">GST (5%)</span><span className="text-white">{formatPrice(tax)}</span></div>
                            <div className="flex justify-between text-base font-semibold pt-2 border-t border-dark-gray">
                                <span className="text-white">Total</span>
                                <span className="text-gold">{formatPrice(total)}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={cartItems.length === 0 || isSubmitting}
                            className="w-full py-3 bg-crimson text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-crimson-light transition-colors"
                        >
                            {isSubmitting ? 'Sending...' : 'Send to Kitchen'}
                        </button>
                    </div>
                </div>

                {/* Success Toast */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 shadow-lg flex items-center gap-3"
                        >
                            <span className="text-xl">✓</span>
                            <span className="font-semibold">Order #{lastOrderNumber} sent to kitchen!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
