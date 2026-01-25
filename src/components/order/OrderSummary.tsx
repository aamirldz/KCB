'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface OrderSummaryProps {
    onCheckout: () => void;
}

export default function OrderSummary({ onCheckout }: OrderSummaryProps) {
    const { cart, itemCount } = useCart();

    return (
        <div className="bg-charcoal/50 border border-royal-gold/20 rounded-xl p-6">
            <h3 className="font-heading text-lg text-text-primary mb-6 tracking-wider">
                Order Summary
            </h3>

            <div className="space-y-4">
                {/* Items Count */}
                <div className="flex justify-between text-text-secondary">
                    <span>Items ({itemCount})</span>
                    <span className="text-text-primary">{formatPrice(cart.subtotal)}</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-text-secondary">
                    <span>GST (5%)</span>
                    <span className="text-text-primary">{formatPrice(cart.tax)}</span>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between text-text-secondary">
                    <span>Delivery Fee</span>
                    <span className="text-text-primary">
                        {cart.deliveryFee > 0 ? formatPrice(cart.deliveryFee) : 'Free'}
                    </span>
                </div>

                {/* Divider */}
                <div className="divider" />

                {/* Total */}
                <div className="flex justify-between font-heading text-lg">
                    <span className="text-text-primary">Total</span>
                    <span className="text-royal-gold">{formatPrice(cart.total)}</span>
                </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 bg-deep-black/50 border border-royal-gold/20 rounded-lg px-4 py-2 text-text-primary text-sm placeholder:text-text-muted focus:border-royal-gold focus:outline-none"
                    />
                    <button className="px-4 py-2 border border-royal-gold/40 text-royal-gold rounded-lg text-sm font-heading tracking-wider hover:bg-royal-gold hover:text-deep-black transition-all">
                        Apply
                    </button>
                </div>
            </div>

            {/* Checkout Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCheckout}
                disabled={itemCount === 0}
                className="w-full mt-6 bg-gradient-to-r from-imperial-red-dark via-imperial-red to-imperial-red-light text-text-primary py-4 rounded-xl font-heading tracking-wider uppercase transition-all hover:shadow-[0_0_30px_rgba(196,30,58,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Proceed to Checkout
            </motion.button>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-text-muted text-xs">
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Quality Assured</span>
                </div>
            </div>
        </div>
    );
}
