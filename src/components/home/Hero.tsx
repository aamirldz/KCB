'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col bg-black relative overflow-hidden">
            {/* Background Gradient */}
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

                        {/* Right - Visual Card with Glowing Animation */}
                        <div className="flex justify-center order-1 lg:order-2 animate-fade-in">
                            <div className="relative w-full max-w-xs sm:max-w-sm">
                                {/* Animated Outer Glow */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-crimson/50 via-gold/40 to-crimson/50 rounded-lg blur-2xl opacity-70 animate-pulse" />

                                {/* Secondary Glow Layer */}
                                <div className="absolute -inset-2 bg-gradient-to-br from-gold/30 to-crimson/30 rounded-lg blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />

                                {/* Main Card */}
                                <div className="relative bg-gradient-to-br from-charcoal via-dark-gray to-charcoal border-2 border-gold/50 p-6 sm:p-8 shadow-[0_0_60px_rgba(217,119,6,0.3),0_0_30px_rgba(185,28,28,0.2)]">
                                    {/* Glowing Corner Decorations */}
                                    <div className="absolute -top-1 -left-1 w-10 h-10 border-t-[3px] border-l-[3px] border-gold shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
                                    <div className="absolute -top-1 -right-1 w-10 h-10 border-t-[3px] border-r-[3px] border-gold shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
                                    <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-[3px] border-l-[3px] border-gold shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
                                    <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-[3px] border-r-[3px] border-gold shadow-[0_0_15px_rgba(217,119,6,0.5)]" />

                                    {/* Chinese Title with Glow */}
                                    <div className="text-center mb-4">
                                        <span className="chinese text-gold text-3xl sm:text-4xl md:text-5xl font-bold block tracking-wider drop-shadow-[0_0_25px_rgba(217,119,6,0.6)]">
                                            国王中国碗
                                        </span>
                                    </div>

                                    {/* Est Badge with Glow */}
                                    <div className="text-center mb-4">
                                        <span className="inline-block px-4 py-1.5 bg-crimson/20 border border-crimson/50 text-crimson text-[10px] sm:text-xs tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(185,28,28,0.3)]">
                                            Est. 2019
                                        </span>
                                    </div>

                                    {/* Bowl Emoji with Glow Effect */}
                                    <div className="text-center my-6 relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-28 h-28 bg-crimson/25 rounded-full blur-2xl animate-pulse" />
                                        </div>
                                        <span className="text-7xl sm:text-8xl md:text-9xl relative z-10 drop-shadow-[0_0_40px_rgba(185,28,28,0.7)]">🍜</span>
                                    </div>

                                    {/* Cuisine Tags with Hover Glow */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {['Chinese', 'Korean', 'Nepali', 'Tibetan'].map((cuisine) => (
                                            <div
                                                key={cuisine}
                                                className="py-2.5 bg-gradient-to-br from-crimson/25 to-crimson/10 border border-crimson/40 text-center hover:shadow-[0_0_20px_rgba(185,28,28,0.5)] hover:border-crimson/60 transition-all cursor-default"
                                            >
                                                <span className="text-cream text-xs sm:text-sm font-medium">{cuisine}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating 5+ Years Badge with Glow */}
                                <div className="absolute -bottom-5 -right-5 bg-gradient-to-br from-crimson to-crimson-dark px-5 py-3 border border-crimson-light/50 shadow-[0_0_30px_rgba(185,28,28,0.6)] animate-pulse">
                                    <span className="text-white font-bold text-2xl sm:text-3xl block leading-tight">5+</span>
                                    <span className="text-white/80 text-[10px] uppercase tracking-wider">Years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="border-t border-gold/20 py-4 md:py-6 relative z-10 bg-charcoal/50">
                <div className="container">
                    <div className="grid grid-cols-4 gap-2 md:gap-6 text-center">
                        {[
                            { value: '50+', label: 'Dishes' },
                            { value: '4', label: 'Cuisines' },
                            { value: '5+', label: 'Years' },
                            { value: '10K+', label: 'Guests' },
                        ].map((stat) => (
                            <div key={stat.label} className="group">
                                <span className="text-gold font-display text-lg md:text-2xl font-bold block group-hover:drop-shadow-[0_0_15px_rgba(217,119,6,0.6)] transition-all">{stat.value}</span>
                                <span className="text-gray text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
