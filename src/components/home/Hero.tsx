'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-gold/5" />
                <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-crimson/15 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
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
                                    <button className="px-6 md:px-8 py-3 bg-crimson text-white font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-crimson-light hover:shadow-[0_0_20px_rgba(185,28,28,0.5)] transition-all">
                                        Order Now
                                    </button>
                                </Link>
                                <Link href="/reservation">
                                    <button className="px-6 md:px-8 py-3 border-2 border-gold text-gold font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-gold hover:text-black hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all">
                                        Book Table
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right - Enhanced Visual Card with Glow Effects */}
                        <div className="flex justify-center order-1 lg:order-2">
                            <div className="relative w-full max-w-sm">
                                {/* Outer Glow Ring */}
                                <div className="absolute -inset-3 bg-gradient-to-r from-crimson/30 via-gold/20 to-crimson/30 rounded-lg blur-xl opacity-70 animate-pulse" />

                                {/* Inner Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-gold/10 to-crimson/10 rounded-lg blur-md" />

                                {/* Main Card */}
                                <div className="relative bg-gradient-to-br from-charcoal via-dark-gray to-charcoal border-2 border-gold/40 p-8 shadow-[0_0_40px_rgba(217,119,6,0.15)]">
                                    {/* Glowing Corner Decorations */}
                                    <div className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-2 border-l-2 border-gold shadow-[0_0_10px_rgba(217,119,6,0.4)]" />
                                    <div className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-2 border-r-2 border-gold shadow-[0_0_10px_rgba(217,119,6,0.4)]" />
                                    <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-2 border-l-2 border-gold shadow-[0_0_10px_rgba(217,119,6,0.4)]" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-2 border-r-2 border-gold shadow-[0_0_10px_rgba(217,119,6,0.4)]" />

                                    {/* Chinese Title with Glow */}
                                    <div className="text-center mb-3">
                                        <span className="chinese text-gold text-3xl sm:text-4xl font-bold tracking-wider drop-shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                                            国王中国碗
                                        </span>
                                    </div>

                                    {/* Est Badge */}
                                    <div className="text-center mb-5">
                                        <span className="inline-block px-3 py-1 bg-crimson/20 border border-crimson/40 text-crimson text-[10px] tracking-[0.2em] uppercase shadow-[0_0_10px_rgba(185,28,28,0.2)]">
                                            Est. 2019
                                        </span>
                                    </div>

                                    {/* Bowl Emoji with Glow */}
                                    <div className="text-center my-6 relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-24 h-24 bg-crimson/20 rounded-full blur-2xl animate-pulse" />
                                        </div>
                                        <span className="text-7xl sm:text-8xl relative z-10 drop-shadow-[0_0_20px_rgba(185,28,28,0.4)]">🍜</span>
                                    </div>

                                    {/* Cuisine Tags with Hover Glow */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {['Chinese', 'Korean', 'Nepali', 'Tibetan'].map((cuisine) => (
                                            <div
                                                key={cuisine}
                                                className="py-2.5 bg-gradient-to-br from-crimson/15 to-crimson/5 border border-crimson/25 text-center hover:border-crimson/50 hover:shadow-[0_0_12px_rgba(185,28,28,0.3)] transition-all cursor-default"
                                            >
                                                <span className="text-cream text-xs font-medium">{cuisine}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 5+ Years Badge with Glow */}
                                <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-crimson to-crimson-dark px-4 py-2.5 shadow-[0_0_20px_rgba(185,28,28,0.5)] border border-crimson-light/30">
                                    <span className="text-white font-bold text-xl block leading-none">5+</span>
                                    <span className="text-white/70 text-[9px] uppercase tracking-wide">Years</span>
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
                            <div key={stat.label} className="group">
                                <span className="text-gold font-display text-lg md:text-2xl font-bold block group-hover:drop-shadow-[0_0_10px_rgba(217,119,6,0.5)] transition-all">{stat.value}</span>
                                <span className="text-gray text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
