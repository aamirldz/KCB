'use client';

import React from 'react';
import Link from 'next/link';

const features = [
    { icon: '🏮', title: 'Authentic Ambiance' },
    { icon: '👨‍🍳', title: 'Master Chefs' },
    { icon: '🥢', title: 'Premium Quality' },
    { icon: '🍷', title: 'Curated Drinks' },
];

export default function DiningExperience() {
    return (
        <section className="py-20 pb-28 bg-charcoal relative z-10">
            <div className="container">
                <div className="grid lg:grid-cols-5 gap-10 items-center">
                    {/* Left - Enhanced Visual Card with Glowing Animation (2 cols) */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            {/* Animated Outer Glow */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-crimson/40 via-gold/30 to-crimson/40 rounded-lg blur-2xl opacity-60 animate-pulse" />

                            {/* Secondary Glow Layer */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-crimson/20 rounded-lg blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />

                            {/* Main Card */}
                            <div className="relative bg-gradient-to-br from-crimson/20 via-dark-gray to-charcoal border-2 border-gold/40 aspect-square flex items-center justify-center shadow-[0_0_50px_rgba(217,119,6,0.2),0_0_25px_rgba(185,28,28,0.15)]">
                                {/* Glowing Corner decorations */}
                                <div className="absolute -top-1 -left-1 w-10 h-10 border-t-[3px] border-l-[3px] border-gold shadow-[0_0_12px_rgba(217,119,6,0.5)]" />
                                <div className="absolute -top-1 -right-1 w-10 h-10 border-t-[3px] border-r-[3px] border-gold shadow-[0_0_12px_rgba(217,119,6,0.5)]" />
                                <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-[3px] border-l-[3px] border-gold shadow-[0_0_12px_rgba(217,119,6,0.5)]" />
                                <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-[3px] border-r-[3px] border-gold shadow-[0_0_12px_rgba(217,119,6,0.5)]" />

                                {/* Glowing lamp behind */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-crimson/20 rounded-full blur-2xl animate-pulse" />
                                </div>

                                {/* Lamp emoji with glow */}
                                <span className="text-[100px] relative z-10 drop-shadow-[0_0_30px_rgba(185,28,28,0.5)]">🏮</span>
                            </div>

                            {/* Floating 5+ Years Badge - same style as Hero */}
                            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-crimson to-crimson-dark px-4 py-2.5 border border-crimson-light/50 shadow-[0_0_25px_rgba(185,28,28,0.6)] animate-pulse">
                                <span className="text-white font-bold text-xl sm:text-2xl block leading-tight">5+</span>
                                <span className="text-white/80 text-[10px] uppercase tracking-wider">Years</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content (3 cols) */}
                    <div className="lg:col-span-3">
                        <span className="text-gold text-xs font-semibold tracking-widest uppercase">Experience</span>
                        <h2 className="text-white text-3xl md:text-4xl font-display mt-1 mb-4">
                            A Royal Dining <span className="text-crimson">Experience</span>
                        </h2>
                        <p className="text-light-gray mb-8 max-w-lg">
                            At King Chinese Bowl, we don&apos;t just serve food — we create memories.
                            Our space transports you to the heart of Asia with every detail.
                        </p>

                        {/* Features - Enhanced with hover glow */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="flex items-center gap-3 p-4 bg-dark-gray border border-gray/20 hover:border-gold/40 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)] transition-all"
                                >
                                    <span className="text-2xl">{feature.icon}</span>
                                    <span className="text-white text-sm font-medium">{feature.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/reservation">
                                <button className="px-8 py-3 bg-crimson text-white font-semibold text-sm tracking-wider uppercase hover:bg-crimson-light hover:shadow-[0_0_20px_rgba(185,28,28,0.5)] transition-all">
                                    Book Table
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="px-6 py-3 text-gold text-sm tracking-wider hover:text-gold-light hover:drop-shadow-[0_0_10px_rgba(217,119,6,0.5)] transition-all">
                                    Our Story →
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
