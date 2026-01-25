'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReservationDetails, TIME_SLOTS, GUEST_OPTIONS } from '@/types/reservation';
import { validateEmail, validatePhone, getMinDate, getMaxDate, formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

type ReservationStep = 'form' | 'confirmation';

export default function ReservationPage() {
    const [step, setStep] = useState<ReservationStep>('form');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [confirmedReservation, setConfirmedReservation] = useState<ReservationDetails | null>(null);

    const [formData, setFormData] = useState<ReservationDetails>({
        fullName: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: '',
    });

    const handleChange = (field: keyof ReservationDetails, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.date) newErrors.date = 'Select a date';
        if (!formData.time) newErrors.time = 'Select a time';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 1500));
        setConfirmedReservation(formData);
        setStep('confirmation');
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="container section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="chinese text-gold text-2xl block mb-3">预订</span>
                    <h1 className="text-white mb-4">Reserve a Table</h1>
                    <p className="text-light-gray max-w-xl mx-auto">
                        Book your table and let us prepare something special for you
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {step === 'form' && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-charcoal border border-dark-gray p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Date & Time */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray mb-2">Date <span className="text-crimson">*</span></label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => handleChange('date', e.target.value)}
                                                min={getMinDate()}
                                                max={getMaxDate()}
                                                className="input"
                                            />
                                            {errors.date && <p className="mt-1 text-sm text-crimson">{errors.date}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray mb-2">Time <span className="text-crimson">*</span></label>
                                            <select
                                                value={formData.time}
                                                onChange={(e) => handleChange('time', e.target.value)}
                                                className="input"
                                            >
                                                <option value="">Select time</option>
                                                {TIME_SLOTS.map((slot) => (
                                                    <option key={slot.time} value={slot.time}>{slot.time}</option>
                                                ))}
                                            </select>
                                            {errors.time && <p className="mt-1 text-sm text-crimson">{errors.time}</p>}
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label className="block text-sm text-gray mb-2">Number of Guests <span className="text-crimson">*</span></label>
                                        <select
                                            value={formData.guests}
                                            onChange={(e) => handleChange('guests', parseInt(e.target.value))}
                                            className="input"
                                        >
                                            {GUEST_OPTIONS.map((num) => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="divider" />

                                    {/* Contact */}
                                    <h3 className="text-crimson text-sm uppercase tracking-wider">Contact Details</h3>

                                    <div>
                                        <label className="block text-sm text-gray mb-2">Full Name <span className="text-crimson">*</span></label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => handleChange('fullName', e.target.value)}
                                            placeholder="Your name"
                                            className="input"
                                        />
                                        {errors.fullName && <p className="mt-1 text-sm text-crimson">{errors.fullName}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray mb-2">Phone <span className="text-crimson">*</span></label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                placeholder="10-digit number"
                                                className="input"
                                            />
                                            {errors.phone && <p className="mt-1 text-sm text-crimson">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray mb-2">Email <span className="text-crimson">*</span></label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                placeholder="your@email.com"
                                                className="input"
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-crimson">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray mb-2">Special Requests</label>
                                        <textarea
                                            value={formData.specialRequests}
                                            onChange={(e) => handleChange('specialRequests', e.target.value)}
                                            placeholder="Any special occasions or dietary requirements..."
                                            className="input min-h-[100px] resize-none"
                                        />
                                    </div>

                                    <Button type="submit" isLoading={isSubmitting} className="w-full py-4">
                                        Confirm Reservation
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {step === 'confirmation' && confirmedReservation && (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto"
                        >
                            <div className="bg-charcoal border border-dark-gray p-8 text-center">
                                <div className="w-16 h-16 mx-auto bg-green-600/20 flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                <h2 className="text-white text-2xl font-display mb-3">Reservation Confirmed!</h2>
                                <p className="text-gray mb-8">We look forward to seeing you, {confirmedReservation.fullName.split(' ')[0]}!</p>

                                <div className="bg-dark-gray p-6 text-left mb-8 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray">Date</span>
                                        <span className="text-cream">{formatDate(new Date(confirmedReservation.date))}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray">Time</span>
                                        <span className="text-cream">{confirmedReservation.time}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray">Guests</span>
                                        <span className="text-cream">{confirmedReservation.guests}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <Button variant="secondary" onClick={() => window.location.href = '/'}>
                                        Back Home
                                    </Button>
                                    <Button onClick={() => { setStep('form'); setFormData({ fullName: '', phone: '', email: '', date: '', time: '', guests: 2, specialRequests: '' }); }}>
                                        New Booking
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
