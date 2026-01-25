'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col bg-black relative overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/15 via-transparent to-gold/10" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-crimson/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gold/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center relative z-10 pt-20 pb-8">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left - Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center lg:text-left order-2 lg:order-1"
                        >
                            <span className="inline-block px-3 py-1 bg-crimson/10 border border-crimson/30 text-crimson text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-4">
                                Premium Asian Cuisine
                            </span>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-3">
                                King Chinese
                                <span className="block text-crimson">Bowl</span>
                            </h1>

                            <p className="text-light-gray text-sm md:text-base lg:text-lg mb-5 max-w-md mx-auto lg:mx-0">
                                Authentic Chinese, Korean, Nepalese & Tibetan flavors crafted with passion.
                            </p>

                            {/* Quick Info */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mb-6 text-xs md:text-sm">
                                <span className="flex items-center gap-1.5 text-gray">
                                    <span className="text-gold">📍</span> New Delhi
                                </span>
                                <span className="flex items-center gap-1.5 text-gray">
                                    <span className="text-gold">🕐</span> 12-10:30 PM
                                </span>
                                <span className="flex items-center gap-1.5 text-gray">
                                    <span className="text-gold">📞</span> +91 98765 43210
                                </span>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                                <Link href="/order">
                                    <button className="px-5 md:px-7 py-3 bg-crimson text-white font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-crimson-light hover:shadow-[0_0_25px_rgba(185,28,28,0.5)] transition-all">
                                        Order Now
                                    </button>
                                </Link>
                                <Link href="/reservation">
                                    <button className="px-5 md:px-7 py-3 border-2 border-gold text-gold font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
                                        Book Table
                                    </button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right - Enhanced Visual Card - ALWAYS VISIBLE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center order-1 lg:order-2"
                        >
                            <div className="relative w-full max-w-xs sm:max-w-sm">
                                {/* Outer Glow Ring */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-crimson/40 via-gold/30 to-crimson/40 rounded-lg blur-2xl opacity-60 animate-pulse" />

                                {/* Secondary Glow */}
                                <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 to-crimson/20 rounded-lg blur-xl" />

                                {/* Main Card */}
                                <div className="relative bg-gradient-to-br from-charcoal via-dark-gray to-charcoal border-2 border-gold/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(217,119,6,0.2),0_0_40px_rgba(185,28,28,0.15)]">
                                    {/* Animated Corner Decorations */}
                                    <motion.div
                                        className="absolute -top-1 -left-1 w-8 h-8 border-t-3 border-l-3 border-gold"
                                        animate={{ boxShadow: ['0 0 10px rgba(217,119,6,0.3)', '0 0 25px rgba(217,119,6,0.7)', '0 0 10px rgba(217,119,6,0.3)'] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ borderTopWidth: '3px', borderLeftWidth: '3px' }}
                                    />
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-8 h-8 border-t-3 border-r-3 border-gold"
                                        animate={{ boxShadow: ['0 0 10px rgba(217,119,6,0.3)', '0 0 25px rgba(217,119,6,0.7)', '0 0 10px rgba(217,119,6,0.3)'] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        style={{ borderTopWidth: '3px', borderRightWidth: '3px' }}
                                    />
                                    <motion.div
                                        className="absolute -bottom-1 -left-1 w-8 h-8 border-b-3 border-l-3 border-gold"
                                        animate={{ boxShadow: ['0 0 10px rgba(217,119,6,0.3)', '0 0 25px rgba(217,119,6,0.7)', '0 0 10px rgba(217,119,6,0.3)'] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                        style={{ borderBottomWidth: '3px', borderLeftWidth: '3px' }}
                                    />
                                    <motion.div
                                        className="absolute -bottom-1 -right-1 w-8 h-8 border-b-3 border-r-3 border-gold"
                                        animate={{ boxShadow: ['0 0 10px rgba(217,119,6,0.3)', '0 0 25px rgba(217,119,6,0.7)', '0 0 10px rgba(217,119,6,0.3)'] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                        style={{ borderBottomWidth: '3px', borderRightWidth: '3px' }}
                                    />

                                    {/* Chinese Title with Strong Glow */}
                                    <motion.div
                                        className="text-center mb-4"
                                        animate={{
                                            textShadow: [
                                                '0 0 20px rgba(217,119,6,0.5), 0 0 40px rgba(217,119,6,0.3)',
                                                '0 0 30px rgba(217,119,6,0.8), 0 0 60px rgba(217,119,6,0.5)',
                                                '0 0 20px rgba(217,119,6,0.5), 0 0 40px rgba(217,119,6,0.3)'
                                            ]
                                        }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                    >
                                        <span className="chinese text-gold text-3xl sm:text-4xl md:text-5xl font-bold block tracking-wider">
                                            国王中国碗
                                        </span>
                                    </motion.div>

                                    {/* Est Badge */}
                                    <div className="text-center mb-4">
                                        <motion.span
                                            className="inline-block px-4 py-1 bg-crimson/20 border border-crimson/40 text-crimson text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                                            animate={{ boxShadow: ['0 0 10px rgba(185,28,28,0.2)', '0 0 20px rgba(185,28,28,0.5)', '0 0 10px rgba(185,28,28,0.2)'] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            Est. 2019
                                        </motion.span>
                                    </div>

                                    {/* Animated Bowl with Multiple Glow Layers */}
                                    <motion.div
                                        className="text-center my-6 relative"
                                        animate={{
                                            y: [0, -15, 0],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        {/* Glow behind emoji */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.div
                                                className="w-24 h-24 sm:w-32 sm:h-32 bg-crimson/30 rounded-full blur-2xl"
                                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </div>
                                        <span className="text-7xl sm:text-8xl md:text-9xl relative z-10 drop-shadow-[0_0_30px_rgba(185,28,28,0.6)]">🍜</span>
                                    </motion.div>

                                    {/* Cuisine Tags with Glow */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {['Chinese', 'Korean', 'Nepali', 'Tibetan'].map((cuisine, index) => (
                                            <motion.div
                                                key={cuisine}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(185,28,28,0.5)' }}
                                                className="py-2.5 bg-gradient-to-br from-crimson/20 to-crimson/5 border border-crimson/30 text-center cursor-default transition-all"
                                            >
                                                <span className="text-cream text-xs sm:text-sm font-medium">{cuisine}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Badge with Strong Glow */}
                                <motion.div
                                    className="absolute -bottom-4 -right-4 bg-gradient-to-br from-crimson to-crimson-dark px-4 py-3 border border-crimson-light/50"
                                    animate={{
                                        boxShadow: [
                                            '0 0 20px rgba(185,28,28,0.5), 0 0 40px rgba(185,28,28,0.3)',
                                            '0 0 40px rgba(185,28,28,0.8), 0 0 60px rgba(185,28,28,0.5)',
                                            '0 0 20px rgba(185,28,28,0.5), 0 0 40px rgba(185,28,28,0.3)'
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-white font-bold text-xl sm:text-2xl block">5+</span>
                                    <span className="text-white/80 text-[10px] uppercase tracking-wider">Years</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="border-t border-gold/20 py-4 md:py-6 relative z-10 bg-charcoal/50"
            >
                <div className="container">
                    <div className="grid grid-cols-4 gap-2 md:gap-6 text-center">
                        {[
                            { value: '50+', label: 'Dishes' },
                            { value: '4', label: 'Cuisines' },
                            { value: '5+', label: 'Years' },
                            { value: '10K+', label: 'Guests' },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="group"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-gold font-display text-lg md:text-2xl font-bold block group-hover:drop-shadow-[0_0_15px_rgba(217,119,6,0.6)] transition-all">{stat.value}</span>
                                <span className="text-gray text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
