'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-gold/5" />
                <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-crimson/15 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center relative z-10 pt-20 pb-8">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Left - Text Content */}
                        <div className="text-center lg:text-left order-2 lg:order-1">
                            <span className="inline-block px-3 py-1 bg-crimson/10 border border-crimson/30 text-crimson text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-4">
                                Premium Asian Cuisine
                            </span>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-4">
                                King Chinese
                                <span className="block text-crimson">Bowl</span>
                            </h1>

                            <p className="text-light-gray text-sm md:text-base lg:text-lg mb-6 max-w-md mx-auto lg:mx-0">
                                Authentic Chinese, Korean, Nepalese & Tibetan flavors crafted with passion.
                            </p>

                            {/* Quick Info */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-xs md:text-sm">
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
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                <Link href="/order">
                                    <button className="px-6 md:px-8 py-3 bg-crimson text-white font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-crimson-light transition-all">
                                        Order Now
                                    </button>
                                </Link>
                                <Link href="/reservation">
                                    <button className="px-6 md:px-8 py-3 border-2 border-gold text-gold font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
                                        Book Table
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right - Clean Visual Card */}
                        <div className="flex justify-center order-1 lg:order-2">
                            <div className="relative w-full max-w-sm">
                                {/* Main Card */}
                                <div className="relative bg-gradient-to-br from-charcoal to-dark-gray border border-gold/30 p-8 shadow-lg">
                                    {/* Corner Decorations */}
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold" />
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold" />
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold" />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold" />

                                    {/* Chinese Title */}
                                    <div className="text-center mb-3">
                                        <span className="chinese text-gold text-3xl sm:text-4xl font-bold tracking-wider">
                                            国王中国碗
                                        </span>
                                    </div>

                                    {/* Est Badge */}
                                    <div className="text-center mb-5">
                                        <span className="inline-block px-3 py-1 bg-crimson/20 border border-crimson/40 text-crimson text-[10px] tracking-[0.2em] uppercase">
                                            Est. 2019
                                        </span>
                                    </div>

                                    {/* Bowl Emoji */}
                                    <div className="text-center my-6">
                                        <span className="text-7xl sm:text-8xl">🍜</span>
                                    </div>

                                    {/* Cuisine Tags */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {['Chinese', 'Korean', 'Nepali', 'Tibetan'].map((cuisine) => (
                                            <div
                                                key={cuisine}
                                                className="py-2 bg-crimson/10 border border-crimson/20 text-center"
                                            >
                                                <span className="text-cream text-xs font-medium">{cuisine}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 5+ Years Badge - Bottom Right Corner */}
                                <div className="absolute -bottom-3 -right-3 bg-crimson px-3 py-2 shadow-md">
                                    <span className="text-white font-bold text-lg block leading-none">5+</span>
                                    <span className="text-white/70 text-[9px] uppercase">Years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="border-t border-gold/20 py-5 relative z-10 bg-charcoal/50">
                <div className="container">
                    <div className="grid grid-cols-4 gap-4 text-center">
                        {[
                            { value: '50+', label: 'Dishes' },
                            { value: '4', label: 'Cuisines' },
                            { value: '5+', label: 'Years' },
                            { value: '10K+', label: 'Guests' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <span className="text-gold font-display text-lg md:text-2xl font-bold block">{stat.value}</span>
                                <span className="text-gray text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
