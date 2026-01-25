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
        <div className="min-h-screen bg-black pt-20">
            <div className="container section">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="chinese text-gold text-2xl block mb-3">订单</span>
                    <h1 className="text-white mb-4">
                        {step === 'cart' && 'Your Order'}
                        {step === 'checkout' && 'Checkout'}
                        {step === 'confirmation' && 'Order Confirmed'}
                    </h1>

                    {/* Progress */}
                    {step !== 'confirmation' && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                            {[
                                { id: 'cart', label: 'Cart' },
                                { id: 'checkout', label: 'Checkout' },
                                { id: 'confirm', label: 'Confirm' },
                            ].map((s, i) => (
                                <React.Fragment key={s.id}>
                                    <div className={`flex items-center gap-2 ${(s.id === 'cart' && step === 'cart') ||
                                            (s.id === 'checkout' && step === 'checkout')
                                            ? 'text-crimson' : 'text-gray'
                                        }`}>
                                        <span className={`w-8 h-8 flex items-center justify-center text-sm ${(s.id === 'cart' && step === 'cart') ||
                                                (s.id === 'checkout' && step === 'checkout')
                                                ? 'bg-crimson text-white' : 'bg-dark-gray text-gray'
                                            }`}>
                                            {i + 1}
                                        </span>
                                        <span className="hidden sm:inline text-sm">{s.label}</span>
                                    </div>
                                    {i < 2 && <div className="w-12 h-px bg-dark-gray" />}
                                </React.Fragment>
                            ))}
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
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-white font-display">Cart Items ({itemCount})</h3>
                                            <button onClick={clearCart} className="text-sm text-gray hover:text-crimson transition-colors">
                                                Clear All
                                            </button>
                                        </div>

                                        {cart.items.map((item) => (
                                            <CartItemCard key={item.id} item={item} />
                                        ))}

                                        <Link href="/menu">
                                            <div className="border-2 border-dashed border-dark-gray p-6 text-center hover:border-crimson/50 transition-colors cursor-pointer">
                                                <svg className="w-8 h-8 mx-auto text-gray mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span className="text-gray">Add more items</span>
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="bg-charcoal border border-dark-gray p-12 text-center">
                                        <span className="text-6xl mb-6 block">🛒</span>
                                        <h3 className="text-white text-2xl mb-3">Your cart is empty</h3>
                                        <p className="text-gray mb-8">Add some dishes from our menu</p>
                                        <Link href="/menu">
                                            <Button>Browse Menu</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-28 bg-charcoal border border-dark-gray p-6">
                                    <h3 className="text-white font-display text-lg mb-6">Order Summary</h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray">Items ({itemCount})</span>
                                            <span className="text-cream">{formatPrice(cart.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray">GST (5%)</span>
                                            <span className="text-cream">{formatPrice(cart.tax)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray">Delivery</span>
                                            <span className="text-cream">{cart.deliveryFee > 0 ? formatPrice(cart.deliveryFee) : 'Free'}</span>
                                        </div>
                                        <div className="divider my-4" />
                                        <div className="flex justify-between text-lg">
                                            <span className="text-white font-display">Total</span>
                                            <span className="text-gold font-display">{formatPrice(cart.total)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => setStep('checkout')}
                                        disabled={itemCount === 0}
                                        className="w-full mt-6"
                                    >
                                        Proceed to Checkout
                                    </Button>
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
