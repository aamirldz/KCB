'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CustomerDetails } from '@/types/cart';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { CartItemCard, CheckoutForm, OrderConfirmation } from '@/components/order';
import Button from '@/components/ui/Button';

type OrderStep = 'cart' | 'checkout' | 'confirmation';

export default function OrderPage() {
    const { cart, itemCount, clearCart } = useCart();
    const [step, setStep] = useState<OrderStep>('cart');
    const [orderDetails, setOrderDetails] = useState<CustomerDetails | null>(null);

    return (
        <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
            {/* Asian-Inspired Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-crimson/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />

                {/* Traditional Pattern Overlays */}
                <div className="absolute top-10 left-10 w-32 h-32 opacity-[0.03]">
                    <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle, rgba(217, 119, 6, 0.4) 1px, transparent 1px)`,
                        backgroundSize: '8px 8px'
                    }} />
                </div>
                <div className="absolute bottom-20 right-20 w-32 h-32 opacity-[0.03]">
                    <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle, rgba(185, 28, 28, 0.4) 1px, transparent 1px)`,
                        backgroundSize: '8px 8px'
                    }} />
                </div>

                {/* Floating Lantern Decorations */}
                <div className="absolute top-40 right-10 text-4xl opacity-10 animate-pulse" style={{ animationDuration: '4s' }}>
                    🏮
                </div>
                <div className="absolute top-60 left-10 text-3xl opacity-10 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                    🏮
                </div>
            </div>

            <div className="container section relative z-10">
                {/* Header with Asian Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    {/* Large Chinese Characters */}
                    <div className="relative inline-block mb-6">
                        {/* Decorative corners around Chinese text */}
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold/40" />
                        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold/40" />
                        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold/40" />
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold/40" />

                        <span className="chinese text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold drop-shadow-[0_0_20px_rgba(217,119,6,0.4)] px-8 py-4 inline-block">
                            订单
                        </span>
                    </div>

                    <h1 className="text-white text-3xl md:text-4xl font-display mb-2">
                        {step === 'cart' && 'Your Order'}
                        {step === 'checkout' && 'Checkout'}
                        {step === 'confirmation' && 'Order Confirmed'}
                    </h1>

                    {/* Decorative divider with Asian motif */}
                    <div className="flex items-center justify-center gap-3 my-6">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                        <span className="text-gold text-xl">◈</span>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    </div>

                    {/* Enhanced Progress Indicator */}
                    {step !== 'confirmation' && (
                        <div className="flex items-center justify-center gap-3 md:gap-6 mt-10">
                            {[
                                { id: 'cart', label: 'Cart', num: 1, char: '一' },
                                { id: 'checkout', label: 'Checkout', num: 2, char: '二' },
                                { id: 'confirm', label: 'Confirm', num: 3, char: '三' },
                            ].map((s, i) => {
                                const isActive = (s.id === 'cart' && step === 'cart') || (s.id === 'checkout' && step === 'checkout');
                                const isPast = (s.id === 'cart' && step === 'checkout');

                                return (
                                    <React.Fragment key={s.id}>
                                        <div className="flex flex-col items-center gap-2">
                                            {/* Circle with Chinese number */}
                                            <div className="relative">
                                                {isActive && (
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-crimson via-crimson-light to-crimson rounded-full blur-md opacity-75 animate-pulse" />
                                                )}
                                                <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all ${isActive
                                                        ? 'bg-gradient-to-br from-crimson to-crimson-dark border-crimson-light text-white shadow-[0_0_20px_rgba(185,28,28,0.5)]'
                                                        : isPast
                                                            ? 'bg-dark-gray border-gold/50 text-gold'
                                                            : 'bg-charcoal border-gray/30 text-gray'
                                                    }`}>
                                                    <div className="text-center">
                                                        <div className={`chinese text-xl md:text-2xl font-bold ${isActive ? 'text-white' : isPast ? 'text-gold' : 'text-gray'}`}>
                                                            {s.char}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Label */}
                                            <span className={`text-xs md:text-sm font-medium ${isActive ? 'text-crimson' : isPast ? 'text-gold' : 'text-gray'
                                                }`}>
                                                {s.label}
                                            </span>
                                        </div>
                                        {i < 2 && (
                                            <div className="relative w-12 md:w-20 mt-[-20px] md:mt-[-24px]">
                                                <div className="h-px bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20" />
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/30 text-xs">
                                                    ◆
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

                <AnimatePresence mode="wait">
                    {step === 'cart' && (
                        <motion.div
                            key="cart"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid lg:grid-cols-3 gap-8"
                        >
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                {itemCount > 0 ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/20">
                                            <h3 className="text-white text-xl md:text-2xl font-display flex items-center gap-3">
                                                <span className="text-2xl">🍜</span>
                                                Cart Items <span className="text-gold">({itemCount})</span>
                                            </h3>
                                            <button
                                                onClick={clearCart}
                                                className="text-sm text-gray hover:text-crimson transition-colors px-3 py-1.5 border border-gray/20 hover:border-crimson/40 hover:bg-crimson/5"
                                            >
                                                Clear All
                                            </button>
                                        </div>

                                        {cart.items.map((item) => (
                                            <CartItemCard key={item.id} item={item} />
                                        ))}

                                        <Link href="/menu">
                                            <div className="group relative border-2 border-dashed border-gold/30 p-8 text-center hover:border-gold/60 hover:bg-gold/5 transition-all cursor-pointer backdrop-blur-sm overflow-hidden">
                                                {/* Asian pattern background */}
                                                <div className="absolute inset-0 opacity-5">
                                                    <div className="w-full h-full" style={{
                                                        backgroundImage: `repeating-linear-gradient(45deg, rgba(217, 119, 6, 0.3) 0px, rgba(217, 119, 6, 0.3) 1px, transparent 1px, transparent 10px)`,
                                                    }} />
                                                </div>

                                                <div className="relative z-10">
                                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-dark-gray border-2 border-gold/30 group-hover:border-gold/60 group-hover:bg-gold/10 transition-all mb-3">
                                                        <span className="text-2xl group-hover:scale-110 transition-transform">➕</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray group-hover:text-gold transition-colors font-medium block">
                                                            Add more delicious dishes
                                                        </span>
                                                        <span className="chinese text-gold/60 text-sm mt-1 block">添加更多</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    // Enhanced Empty Cart State with Asian elements
                                    <div className="relative">
                                        {/* Background with Asian pattern */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 via-transparent to-gold/5 rounded-lg" />
                                        <div className="absolute inset-0 opacity-[0.02]" style={{
                                            backgroundImage: `repeating-linear-gradient(0deg, rgba(217, 119, 6, 0.5) 0px, rgba(217, 119, 6, 0.5) 1px, transparent 1px, transparent 20px),
                                                              repeating-linear-gradient(90deg, rgba(217, 119, 6, 0.5) 0px, rgba(217, 119, 6, 0.5) 1px, transparent 1px, transparent 20px)`,
                                        }} />

                                        <div className="relative bg-gradient-to-br from-charcoal via-dark-gray to-charcoal border-2 border-gold/30 p-16 text-center rounded-lg">
                                            {/* Decorative corner patterns */}
                                            <div className="absolute -top-1 -left-1 w-12 h-12">
                                                <div className="w-full h-full border-t-2 border-l-2 border-gold/60" />
                                                <div className="absolute top-0 left-0 w-3 h-3 bg-gold/60" />
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-12 h-12">
                                                <div className="w-full h-full border-t-2 border-r-2 border-gold/60" />
                                                <div className="absolute top-0 right-0 w-3 h-3 bg-gold/60" />
                                            </div>
                                            <div className="absolute -bottom-1 -left-1 w-12 h-12">
                                                <div className="w-full h-full border-b-2 border-l-2 border-gold/60" />
                                                <div className="absolute bottom-0 left-0 w-3 h-3 bg-gold/60" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-12 h-12">
                                                <div className="w-full h-full border-b-2 border-r-2 border-gold/60" />
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gold/60" />
                                            </div>

                                            {/* Lantern decorations */}
                                            <div className="absolute top-6 left-6 text-3xl opacity-20 animate-pulse" style={{ animationDuration: '3s' }}>🏮</div>
                                            <div className="absolute top-6 right-6 text-3xl opacity-20 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>🏮</div>

                                            {/* Animated Cart Icon */}
                                            <div className="relative inline-block mb-8">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-28 h-28 bg-crimson/20 rounded-full blur-2xl animate-pulse" />
                                                </div>
                                                <span className="text-9xl relative z-10 inline-block animate-bounce" style={{ animationDuration: '3s' }}>
                                                    🛒
                                                </span>
                                            </div>

                                            {/* Chinese text */}
                                            <div className="chinese text-gold/40 text-2xl mb-2">购物车空空如也</div>
                                            <h3 className="text-white text-3xl font-display mb-3">Your cart is empty</h3>
                                            <p className="text-light-gray text-lg mb-10 max-w-md mx-auto">
                                                Add some delicious dishes from our menu to get started
                                            </p>

                                            <Link href="/menu">
                                                <button className="group relative px-12 py-5 bg-gradient-to-r from-crimson to-crimson-dark text-white font-bold text-base tracking-wider uppercase overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(185,28,28,0.6)] border-2 border-crimson-light/30">
                                                    <span className="relative z-10 flex items-center gap-3">
                                                        <span className="text-xl">🍜</span>
                                                        <span>Browse Menu</span>
                                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                    </span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-crimson-light to-crimson opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            </Link>
                                            <div className="chinese text-gold/30 text-sm mt-3">浏览菜单</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Enhanced Order Summary with Asian elements */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-28">
                                    {/* Outer glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-crimson/20 rounded-lg blur-lg opacity-50" />

                                    <div className="relative bg-gradient-to-br from-charcoal via-dark-gray to-charcoal border-2 border-gold/40 p-8 rounded-lg backdrop-blur-sm overflow-hidden">
                                        {/* Asian pattern background */}
                                        <div className="absolute inset-0 opacity-[0.02]">
                                            <div className="w-full h-full" style={{
                                                backgroundImage: `radial-gradient(circle at center, rgba(217, 119, 6, 0.4) 1px, transparent 1px)`,
                                                backgroundSize: '12px 12px'
                                            }} />
                                        </div>

                                        {/* Decorative corner patterns */}
                                        <div className="absolute -top-0.5 -left-0.5 w-8 h-8">
                                            <div className="w-full h-full border-t-2 border-l-2 border-gold" />
                                            <div className="absolute top-0 left-0 w-2 h-2 bg-gold" />
                                        </div>
                                        <div className="absolute -top-0.5 -right-0.5 w-8 h-8">
                                            <div className="w-full h-full border-t-2 border-r-2 border-gold" />
                                            <div className="absolute top-0 right-0 w-2 h-2 bg-gold" />
                                        </div>
                                        <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8">
                                            <div className="w-full h-full border-b-2 border-l-2 border-gold" />
                                            <div className="absolute bottom-0 left-0 w-2 h-2 bg-gold" />
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8">
                                            <div className="w-full h-full border-b-2 border-r-2 border-gold" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-gold" />
                                        </div>

                                        <div className="relative z-10">
                                            {/* Header with icons */}
                                            <div className="text-center mb-6 pb-4 border-b border-gold/20">
                                                <div className="chinese text-gold text-2xl mb-2">订单摘要</div>
                                                <h3 className="text-white text-xl md:text-2xl font-display flex items-center justify-center gap-2">
                                                    <span className="text-2xl">📋</span>
                                                    Order Summary
                                                </h3>
                                            </div>

                                            <div className="space-y-4 text-base">
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-gray flex items-center gap-2">
                                                        <span className="text-lg">🍽️</span>
                                                        Items ({itemCount})
                                                    </span>
                                                    <span className="text-cream font-medium">{formatPrice(cart.subtotal)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-gray flex items-center gap-2">
                                                        <span className="text-lg">💰</span>
                                                        GST (5%)
                                                    </span>
                                                    <span className="text-cream font-medium">{formatPrice(cart.tax)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-gray flex items-center gap-2">
                                                        <span className="text-lg">🚚</span>
                                                        Delivery
                                                    </span>
                                                    <span className={`font-medium ${cart.deliveryFee > 0 ? 'text-cream' : 'text-green-500'}`}>
                                                        {cart.deliveryFee > 0 ? formatPrice(cart.deliveryFee) : 'Free'}
                                                    </span>
                                                </div>

                                                {/* Decorative divider */}
                                                <div className="flex items-center justify-center gap-2 my-4">
                                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                                                    <span className="text-gold/50 text-xs">◆</span>
                                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                                                </div>

                                                <div className="flex justify-between items-center py-4 px-4 bg-gradient-to-r from-dark-gray/80 via-dark-gray/50 to-dark-gray/80 border-2 border-gold/30 rounded">
                                                    <div>
                                                        <div className="chinese text-gold/60 text-sm">总计</div>
                                                        <span className="text-white font-display text-xl">Total</span>
                                                    </div>
                                                    <span className="text-gold font-display text-3xl font-bold drop-shadow-[0_0_15px_rgba(217,119,6,0.6)]">
                                                        {formatPrice(cart.total)}
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setStep('checkout')}
                                                disabled={itemCount === 0}
                                                className="group relative w-full mt-8 px-8 py-5 bg-gradient-to-r from-crimson to-crimson-dark text-white font-bold text-base tracking-wider uppercase overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(185,28,28,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none border-2 border-crimson-light/30"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    <span>Proceed to Checkout</span>
                                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-crimson-light to-crimson opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                            <div className="chinese text-gold/40 text-sm text-center mt-2">继续结账</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'checkout' && (
                        <motion.div
                            key="checkout"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl mx-auto"
                        >
                            <CheckoutForm
                                onBack={() => setStep('cart')}
                                onComplete={(details) => {
                                    setOrderDetails(details);
                                    setStep('confirmation');
                                }}
                            />
                        </motion.div>
                    )}

                    {step === 'confirmation' && orderDetails && (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-xl mx-auto"
                        >
                            <OrderConfirmation orderDetails={orderDetails} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
