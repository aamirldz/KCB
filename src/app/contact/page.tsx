'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { validateEmail, validatePhone } from '@/lib/utils';
import Button from '@/components/ui/Button';

const contactInfo = [
    { icon: '📍', title: 'Visit Us', content: 'Main Market Road, City Center, New Delhi - 110001' },
    { icon: '📞', title: 'Call Us', content: '+91 98765 43210', link: 'tel:+919876543210' },
    { icon: '✉️', title: 'Email Us', content: 'hello@kingchinesebowl.com', link: 'mailto:hello@kingchinesebowl.com' },
];

const hours = [
    { day: 'Monday - Thursday', time: '12:00 PM - 10:30 PM' },
    { day: 'Friday - Saturday', time: '12:00 PM - 11:00 PM' },
    { day: 'Sunday', time: '12:00 PM - 10:00 PM' },
];

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
        if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = 'Invalid phone';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 1500));
        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="container section">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="chinese text-gold text-2xl block mb-3">联系我们</span>
                    <h1 className="text-white mb-4">Get in Touch</h1>
                    <p className="text-light-gray max-w-xl mx-auto">
                        Have questions? We&apos;d love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {contactInfo.map((info) => (
                            <div key={info.title} className="bg-charcoal border border-dark-gray p-5">
                                <span className="text-2xl block mb-2">{info.icon}</span>
                                <h4 className="text-crimson text-sm uppercase tracking-wider mb-1">{info.title}</h4>
                                {info.link ? (
                                    <a href={info.link} className="text-cream hover:text-gold transition-colors">{info.content}</a>
                                ) : (
                                    <p className="text-cream">{info.content}</p>
                                )}
                            </div>
                        ))}

                        {/* Hours */}
                        <div className="bg-charcoal border border-dark-gray p-5">
                            <h4 className="text-crimson text-sm uppercase tracking-wider mb-4">Opening Hours</h4>
                            <ul className="space-y-2">
                                {hours.map(({ day, time }) => (
                                    <li key={day} className="flex justify-between text-sm">
                                        <span className="text-gray">{day}</span>
                                        <span className="text-cream">{time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-charcoal border border-dark-gray p-8">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-gray mb-2">Name <span className="text-crimson">*</span></label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                placeholder="Your name"
                                                className="input"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-crimson">{errors.name}</p>}
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
                                        <label className="block text-sm text-gray mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="input"
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-crimson">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray mb-2">Message <span className="text-crimson">*</span></label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            placeholder="How can we help you?"
                                            className="input min-h-[150px] resize-none"
                                        />
                                        {errors.message && <p className="mt-1 text-sm text-crimson">{errors.message}</p>}
                                    </div>

                                    <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto">
                                        Send Message
                                    </Button>
                                </form>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto bg-green-600/20 flex items-center justify-center mb-6">
                                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-white text-2xl font-display mb-3">Message Sent!</h3>
                                    <p className="text-gray mb-6">We&apos;ll get back to you soon.</p>
                                    <Button
                                        variant="secondary"
                                        onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
                                    >
                                        Send Another
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
