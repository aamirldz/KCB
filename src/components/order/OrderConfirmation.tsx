'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CustomerDetails } from '@/types/cart';
import { formatPrice, generateId } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';

interface OrderConfirmationProps {
    orderDetails: CustomerDetails;
}

export default function OrderConfirmation({ orderDetails }: OrderConfirmationProps) {
    const { cart, clearCart } = useCart();
    const orderId = React.useMemo(() => generateId().substring(0, 8).toUpperCase(), []);

    React.useEffect(() => {
        // Clear cart after order is placed
        const timer = setTimeout(() => clearCart(), 100);
        return () => clearTimeout(timer);
    }, [clearCart]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-charcoal/50 border border-royal-gold/20 rounded-xl p-8 text-center"
        >
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6"
            >
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </motion.div>

            {/* Heading */}
            <h2 className="font-heading text-2xl text-text-primary mb-2">
                Order Confirmed!
            </h2>
            <p className="text-text-secondary mb-6">
                Thank you for your order, {orderDetails.fullName.split(' ')[0]}!
            </p>

            {/* Order ID */}
            <div className="bg-deep-black/50 border border-royal-gold/20 rounded-lg p-4 mb-6 inline-block">
                <span className="text-text-muted text-sm block mb-1">Order ID</span>
                <span className="font-heading text-royal-gold text-xl tracking-wider">#{orderId}</span>
            </div>

            {/* Order Details */}
            <div className="bg-deep-black/50 border border-royal-gold/10 rounded-xl p-6 text-left mb-6">
                <h3 className="font-heading text-sm text-royal-gold tracking-wider uppercase mb-4">
                    Order Details
                </h3>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Order Type</span>
                        <span className="text-text-primary capitalize">{orderDetails.deliveryType}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Items</span>
                        <span className="text-text-primary">{cart.items.length} items</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Total Amount</span>
                        <span className="text-royal-gold font-heading">{formatPrice(cart.total)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Payment</span>
                        <span className="text-text-primary">Pay on Delivery</span>
                    </div>
                </div>

                <div className="divider my-4" />

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Contact</span>
                        <span className="text-text-primary">{orderDetails.phone}</span>
                    </div>
                    {orderDetails.deliveryType === 'delivery' && orderDetails.address && (
                        <div className="flex justify-between">
                            <span className="text-text-secondary">Delivery to</span>
                            <span className="text-text-primary text-right max-w-[200px]">
                                {orderDetails.address}, {orderDetails.city}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Estimated Time */}
            <div className="bg-imperial-red/10 border border-imperial-red/20 rounded-xl p-4 mb-8">
                <span className="text-imperial-red-light text-sm">
                    {orderDetails.deliveryType === 'delivery'
                        ? '🚚 Estimated delivery: 30-45 minutes'
                        : '📦 Ready for pickup in 15-20 minutes'}
                </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/menu">
                    <Button variant="secondary">
                        Order More
                    </Button>
                </Link>
                <Link href="/">
                    <Button>
                        Back to Home
                    </Button>
                </Link>
            </div>

            {/* Support */}
            <p className="text-text-muted text-xs mt-8">
                Questions about your order? Call us at{' '}
                <a href="tel:+919876543210" className="text-royal-gold hover:underline">
                    +91 98765 43210
                </a>
            </p>
        </motion.div>
    );
}
