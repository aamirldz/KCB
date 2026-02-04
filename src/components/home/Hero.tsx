'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Canvas bowl animation with no SSR
const HeroBowlCanvas = dynamic(() => import('./HeroBowlCanvas'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0502] to-black">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-crimson/15 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
    ),
});

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col bg-black relative overflow-hidden">
            {/* Ultra Premium Bowl Animation Background */}
            <HeroBowlCanvas />

            {/* Main Content */}
            <div className="flex-1 flex items-center relative z-10 pt-24 pb-10">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Left - Text Content */}
                        <div className="text-center lg:text-left order-2 lg:order-1">
                            <span className="inline-block px-3 py-1 bg-crimson/10 border border-crimson/30 text-crimson text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
                                Premium Asian Cuisine
                            </span>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-4 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                                King Chinese
                                <span className="block text-crimson drop-shadow-[0_0_20px_rgba(185,28,28,0.5)]">Bowl</span>
                            </h1>

                            <p className="text-light-gray text-sm md:text-base lg:text-lg mb-6 max-w-md mx-auto lg:mx-0 drop-shadow-lg">
                                Authentic Chinese, Korean, Nepalese & Tibetan flavors crafted with passion.
                            </p>

                            {/* Quick Info */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-xs md:text-sm">
                                <span className="flex items-center gap-1.5 text-gray bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/5">
                                    <span className="text-gold">📍</span> Sector 68, Mohali
                                </span>
                                <span className="flex items-center gap-1.5 text-gray bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/5">
                                    <span className="text-gold">🕐</span> 11AM - 2AM
                                </span>
                                <span className="flex items-center gap-1.5 text-gray bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/5">
                                    <span className="text-gold">📞</span> +91 75084 50221
                                </span>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                <Link href="/order">
                                    <button className="px-6 md:px-8 py-3 bg-crimson text-white font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-crimson-light hover:shadow-[0_0_25px_rgba(185,28,28,0.6)] transition-all duration-300">
                                        Order Now
                                    </button>
                                </Link>
                                <Link href="/reservation">
                                    <button className="px-6 md:px-8 py-3 border-2 border-gold text-gold font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-gold hover:text-black hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] transition-all duration-300 backdrop-blur-sm">
                                        Book Table
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right - Enhanced Visual Card with Glow Effects */}
                        <div className="flex justify-center order-1 lg:order-2">
                            <div className="relative w-full max-w-sm">
                                {/* Outer Glow Ring */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-crimson/25 via-gold/15 to-crimson/25 rounded-xl blur-2xl opacity-60 animate-pulse" />

                                {/* Inner Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-gold/10 to-crimson/10 rounded-lg blur-lg" />

                                {/* Main Card */}
                                <div className="relative bg-gradient-to-br from-charcoal/95 via-dark-gray/95 to-charcoal/95 border-2 border-gold/40 p-8 shadow-[0_0_50px_rgba(217,119,6,0.12)] backdrop-blur-md">
                                    {/* Glowing Corner Decorations */}
                                    <div className="absolute -top-0.5 -left-0.5 w-10 h-10 border-t-2 border-l-2 border-gold shadow-[0_0_12px_rgba(217,119,6,0.5)]" />
                                    <div className="absolute -top-0.5 -right-0.5 w-10 h-10 border-t-2 border-r-2 border-gold shadow-[0_0_12px_rgba(217,119,6,0.5)]" />
                                    <div className="absolute -bottom-0.5 -left-0.5 w-10 h-10 border-b-2 border-l-2 border-gold shadow-[0_0_12px_rgba(217,119,6,0.5)]" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-10 h-10 border-b-2 border-r-2 border-gold shadow-[0_0_12px_rgba(217,119,6,0.5)]" />

                                    {/* Chinese Title with Glow */}
                                    <div className="text-center mb-3">
                                        <span className="chinese text-gold text-3xl sm:text-4xl font-bold tracking-wider drop-shadow-[0_0_18px_rgba(217,119,6,0.5)]">
                                            国王中国碗
                                        </span>
                                    </div>

                                    {/* Est Badge */}
                                    <div className="text-center mb-5">
                                        <span className="inline-block px-3 py-1 bg-crimson/20 border border-crimson/40 text-crimson text-[10px] tracking-[0.2em] uppercase shadow-[0_0_12px_rgba(185,28,28,0.25)]">
                                            Est. 2019
                                        </span>
                                    </div>

                                    {/* Bowl Emoji with Glow */}
                                    <div className="text-center my-6 relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-28 h-28 bg-crimson/25 rounded-full blur-2xl animate-pulse" />
                                        </div>
                                        <span className="text-7xl sm:text-8xl relative z-10 drop-shadow-[0_0_25px_rgba(185,28,28,0.5)]">🍜</span>
                                    </div>

                                    {/* Cuisine Tags with Hover Glow */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {['Chinese', 'Korean', 'Nepali', 'Tibetan'].map((cuisine) => (
                                            <div
                                                key={cuisine}
                                                className="py-2.5 bg-gradient-to-br from-crimson/12 to-crimson/5 border border-crimson/25 text-center hover:border-crimson/50 hover:shadow-[0_0_15px_rgba(185,28,28,0.35)] transition-all duration-300 cursor-default"
                                            >
                                                <span className="text-cream text-xs font-medium">{cuisine}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 5+ Years Badge with Glow */}
                                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-crimson to-crimson-dark px-5 py-3 shadow-[0_0_25px_rgba(185,28,28,0.6)] border border-crimson-light/30">
                                    <span className="text-white font-bold text-xl block leading-none">5+</span>
                                    <span className="text-white/70 text-[9px] uppercase tracking-wide">Years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="border-t border-gold/20 py-5 relative z-10 bg-charcoal/80 backdrop-blur-md">
                <div className="container">
                    <div className="grid grid-cols-4 gap-4 text-center">
                        {[
                            { value: '50+', label: 'Dishes' },
                            { value: '4', label: 'Cuisines' },
                            { value: '5+', label: 'Years' },
                            { value: '10K+', label: 'Guests' },
                        ].map((stat) => (
                            <div key={stat.label} className="group">
                                <span className="text-gold font-display text-lg md:text-2xl font-bold block group-hover:drop-shadow-[0_0_12px_rgba(217,119,6,0.6)] transition-all">{stat.value}</span>
                                <span className="text-gray text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
