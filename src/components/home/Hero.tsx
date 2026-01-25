'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/15 via-transparent to-gold/10" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-crimson/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gold/15 rounded-full blur-[100px]" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center relative z-10 pt-20 pb-8">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left - Text Content */}
                        <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-in">
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
                                    <span className="text-gold">📍</span> Sector 68, Mohali
                                </span>
                                <span className="flex items-center gap-1.5 text-gray">
                                    <span className="text-gold">🕐</span> 11AM - 2AM
                                </span>
                                <span className="flex items-center gap-1.5 text-gray">
                                    <span className="text-gold">📞</span> +91 75084 50221
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
                        </div>

                        {/* Right - Clean Visual Card */}
                        <div className="flex justify-center order-1 lg:order-2 animate-fade-in">
                            <div className="relative w-full max-w-xs sm:max-w-sm">
                                {/* Subtle Glow */}
                                <div className="absolute -inset-3 bg-gradient-to-r from-crimson/30 via-gold/20 to-crimson/30 rounded-lg blur-xl opacity-50" />

                                {/* Main Card */}
                                <div className="relative bg-gradient-to-br from-charcoal via-dark-gray to-charcoal border border-gold/30 p-6 sm:p-8">
                                    {/* Corner Decorations */}
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold" />
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold" />
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold" />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold" />

                                    {/* Chinese Title */}
                                    <div className="text-center mb-3">
                                        <span className="chinese text-gold text-2xl sm:text-3xl font-bold block tracking-wider">
                                            国王中国碗
                                        </span>
                                    </div>

                                    {/* Est Badge */}
                                    <div className="text-center mb-4">
                                        <span className="inline-block px-3 py-1 bg-crimson/15 border border-crimson/30 text-crimson text-[10px] tracking-[0.2em] uppercase">
                                            Est. 2019
                                        </span>
                                    </div>

                                    {/* Bowl Emoji */}
                                    <div className="text-center my-5">
                                        <span className="text-6xl sm:text-7xl">🍜</span>
                                    </div>

                                    {/* Cuisine Tags */}
                                    <div className="grid grid-cols-4 gap-1.5">
                                        {['Chinese', 'Korean', 'Nepali', 'Tibetan'].map((cuisine) => (
                                            <div
                                                key={cuisine}
                                                className="py-2 bg-crimson/10 border border-crimson/20 text-center"
                                            >
                                                <span className="text-cream text-[10px] sm:text-xs">{cuisine}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 5+ Years - Inside card at bottom right */}
                                    <div className="absolute bottom-2 right-2 bg-crimson px-2 py-1 text-center">
                                        <span className="text-white font-bold text-sm block leading-tight">5+</span>
                                        <span className="text-white/70 text-[8px] uppercase">Yrs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="border-t border-gold/20 py-4 md:py-5 relative z-10 bg-charcoal/50">
                <div className="container">
                    <div className="grid grid-cols-4 gap-2 md:gap-6 text-center">
                        {[
                            { value: '50+', label: 'Dishes' },
                            { value: '4', label: 'Cuisines' },
                            { value: '5+', label: 'Years' },
                            { value: '10K+', label: 'Guests' },
                        ].map((stat) => (
                            <div key={stat.label} className="group">
                                <span className="text-gold font-display text-lg md:text-xl font-bold block">{stat.value}</span>
                                <span className="text-gray text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
