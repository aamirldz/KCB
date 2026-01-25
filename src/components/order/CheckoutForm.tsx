'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomerDetails, DeliveryType } from '@/types/cart';
import { formatPrice, validateEmail, validatePhone } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface CheckoutFormProps {
    onBack: () => void;
    onComplete: (orderDetails: CustomerDetails) => void;
}

export default function CheckoutForm({ onBack, onComplete }: CheckoutFormProps) {
    const { cart, itemCount } = useCart();
    const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState<CustomerDetails>({
        fullName: '',
        phone: '',
        email: '',
        deliveryType: 'delivery',
        address: '',
        city: '',
        pincode: '',
        landmark: '',
    });

    const handleChange = (field: keyof CustomerDetails, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (deliveryType === 'delivery') {
            if (!formData.address?.trim()) {
                newErrors.address = 'Delivery address is required';
            }
            if (!formData.city?.trim()) {
                newErrors.city = 'City is required';
            }
            if (!formData.pincode?.trim()) {
                newErrors.pincode = 'Pincode is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        onComplete({ ...formData, deliveryType });
        setIsSubmitting(false);
    };

    return (
        <div className="bg-charcoal/50 border border-royal-gold/20 rounded-xl p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="font-heading text-xl text-text-primary tracking-wider">
                    Checkout
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Delivery Type */}
                <div>
                    <label className="block text-sm text-text-secondary mb-3">Order Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setDeliveryType('delivery');
                                setFormData((prev) => ({ ...prev, deliveryType: 'delivery' }));
                            }}
                            className={`p-4 rounded-xl border text-left transition-all ${deliveryType === 'delivery'
                                    ? 'bg-imperial-red/20 border-imperial-red text-text-primary'
                                    : 'border-royal-gold/20 text-text-secondary hover:border-royal-gold/40'
                                }`}
                        >
                            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                            <span className="font-heading text-sm tracking-wider">Delivery</span>
                            <p className="text-xs text-text-muted mt-1">30-45 mins</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setDeliveryType('pickup');
                                setFormData((prev) => ({ ...prev, deliveryType: 'pickup' }));
                            }}
                            className={`p-4 rounded-xl border text-left transition-all ${deliveryType === 'pickup'
                                    ? 'bg-imperial-red/20 border-imperial-red text-text-primary'
                                    : 'border-royal-gold/20 text-text-secondary hover:border-royal-gold/40'
                                }`}
                        >
                            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="font-heading text-sm tracking-wider">Pickup</span>
                            <p className="text-xs text-text-muted mt-1">15-20 mins</p>
                        </button>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                    <h3 className="font-heading text-sm text-royal-gold tracking-wider uppercase">
                        Contact Details
                    </h3>
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        error={errors.fullName}
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Phone Number"
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            error={errors.phone}
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            error={errors.email}
                            required
                        />
                    </div>
                </div>

                {/* Delivery Address */}
                {deliveryType === 'delivery' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                    >
                        <h3 className="font-heading text-sm text-royal-gold tracking-wider uppercase">
                            Delivery Address
                        </h3>
                        <Textarea
                            label="Address"
                            placeholder="House/Flat No., Building, Street"
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            error={errors.address}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="City"
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                error={errors.city}
                                required
                            />
                            <Input
                                label="Pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={(e) => handleChange('pincode', e.target.value)}
                                error={errors.pincode}
                                required
                            />
                        </div>
                        <Input
                            label="Landmark (Optional)"
                            placeholder="Nearby landmark"
                            value={formData.landmark}
                            onChange={(e) => handleChange('landmark', e.target.value)}
                        />
                    </motion.div>
                )}

                {/* Pickup Info */}
                {deliveryType === 'pickup' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-deep-black/50 border border-royal-gold/10 rounded-xl p-4"
                    >
                        <h4 className="font-heading text-sm text-text-primary mb-2">Pickup Location</h4>
                        <p className="text-text-secondary text-sm">
                            King Chinese Bowl<br />
                            Main Market Road, City Center<br />
                            New Delhi
                        </p>
                        <p className="text-royal-gold text-sm mt-2">Ready in 15-20 minutes</p>
                    </motion.div>
                )}

                {/* Order Summary Mini */}
                <div className="bg-deep-black/50 border border-royal-gold/10 rounded-xl p-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-text-secondary">Items ({itemCount})</span>
                        <span className="text-text-primary">{formatPrice(cart.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-text-secondary">GST + Delivery</span>
                        <span className="text-text-primary">{formatPrice(cart.tax + cart.deliveryFee)}</span>
                    </div>
                    <div className="divider my-3" />
                    <div className="flex justify-between font-heading">
                        <span className="text-text-primary">Total</span>
                        <span className="text-royal-gold">{formatPrice(cart.total)}</span>
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <h3 className="font-heading text-sm text-royal-gold tracking-wider uppercase mb-3">
                        Payment Method
                    </h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 p-4 border border-royal-gold/20 rounded-xl cursor-pointer hover:border-royal-gold/40 transition-colors">
                            <input type="radio" name="payment" defaultChecked className="accent-imperial-red" />
                            <span className="text-text-primary text-sm">Pay on Delivery (Cash/Card/UPI)</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-royal-gold/20 rounded-xl cursor-pointer hover:border-royal-gold/40 transition-colors opacity-50">
                            <input type="radio" name="payment" disabled />
                            <span className="text-text-secondary text-sm">Pay Online (Coming Soon)</span>
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-full py-4"
                >
                    Place Order - {formatPrice(cart.total)}
                </Button>

                {/* Terms */}
                <p className="text-text-muted text-xs text-center">
                    By placing this order, you agree to our Terms of Service and Privacy Policy
                </p>
            </form>
        </div>
    );
}
