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
        <section className="py-24 bg-charcoal relative z-10 overflow-hidden">
            {/* Top Divider Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent" />

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[150px] -translate-x-1/2" />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Enhanced Visual Card with Glow Effects */}
                    <div className="order-2 lg:order-1">
                        <div className="relative max-w-sm mx-auto lg:mx-0">
                            {/* Outer Glow Ring */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-crimson/30 via-gold/20 to-crimson/30 rounded-lg blur-xl opacity-70 animate-pulse" />

                            {/* Inner Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-gold/10 to-crimson/10 rounded-lg blur-md" />

                            {/* Main Card */}
                            <div className="relative bg-gradient-to-br from-crimson/15 via-dark-gray to-charcoal border-2 border-gold/40 aspect-square flex items-center justify-center shadow-[0_0_40px_rgba(217,119,6,0.15)]">
                                {/* Glowing Corner Decorations */}
                                <div className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-2 border-l-2 border-gold shadow-[0_0_10px_rgba(217,119,6,0.4)]" />
                                <div className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-2 border-r-2 border-gold shadow-[0_0_10px_rgba(217,119,6,0.4)]" />
                                <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-2 border-l-2 border-gold shadow-[0_0_10px_rgba(217,119,6,0.4)]" />
                                <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-2 border-r-2 border-gold shadow-[0_0_10px_rgba(217,119,6,0.4)]" />

                                {/* Glowing lamp background */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-crimson/20 rounded-full blur-2xl animate-pulse" />
                                </div>

                                {/* Lamp emoji with glow */}
                                <span className="text-[100px] relative z-10 drop-shadow-[0_0_25px_rgba(185,28,28,0.5)]">🏮</span>
                            </div>

                            {/* 5+ Years Badge with Glow - Inside bottom right */}
                            <div className="absolute bottom-4 right-4 bg-gradient-to-br from-crimson to-crimson-dark px-4 py-2.5 shadow-[0_0_20px_rgba(185,28,28,0.5)] border border-crimson-light/30">
                                <span className="text-white font-bold text-xl block leading-none">5+</span>
                                <span className="text-white/70 text-[9px] uppercase tracking-wide">Years</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="order-1 lg:order-2">
                        <span className="text-gold text-xs font-semibold tracking-widest uppercase">Experience</span>
                        <h2 className="text-white text-3xl md:text-4xl font-display mt-2 mb-5">
                            A Royal Dining <span className="text-crimson">Experience</span>
                        </h2>
                        <p className="text-light-gray mb-8 max-w-lg">
                            At King Chinese Bowl, we don&apos;t just serve food — we create memories.
                            Our space transports you to the heart of Asia with every detail.
                        </p>

                        {/* Features Grid with Hover Glow */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="flex items-center gap-3 p-4 bg-dark-gray/50 border border-gray/15 hover:border-gold/40 hover:shadow-[0_0_15px_rgba(217,119,6,0.15)] transition-all group"
                                >
                                    <span className="text-2xl group-hover:scale-110 transition-transform">{feature.icon}</span>
                                    <span className="text-white text-sm">{feature.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/reservation">
                                <button className="px-8 py-3 bg-crimson text-white font-semibold text-sm tracking-wider uppercase hover:bg-crimson-light hover:shadow-[0_0_20px_rgba(185,28,28,0.4)] transition-all">
                                    Book Table
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="px-6 py-3 text-gold text-sm tracking-wider hover:text-gold-light hover:drop-shadow-[0_0_8px_rgba(217,119,6,0.4)] transition-all">
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
