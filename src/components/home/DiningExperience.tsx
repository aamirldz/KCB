'use client';

import React from 'react';
import Link from 'next/link';

const features = [
    { icon: '🏮', title: 'Authentic Ambiance', desc: 'Traditional decor' },
    { icon: '👨‍🍳', title: 'Master Chefs', desc: 'Expert culinary team' },
    { icon: '🥢', title: 'Premium Quality', desc: 'Fresh ingredients' },
    { icon: '🍷', title: 'Curated Drinks', desc: 'Signature cocktails' },
];

export default function DiningExperience() {
    return (
        <section className="py-24 bg-gradient-to-b from-charcoal to-dark-gray relative z-10 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[200px] -translate-x-1/2" />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Enhanced Visual Card */}
                    <div className="order-2 lg:order-1">
                        <div className="relative max-w-md mx-auto lg:mx-0">
                            {/* Animated Outer Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-crimson/40 via-gold/30 to-crimson/40 rounded-lg blur-2xl opacity-60 animate-pulse" />

                            {/* Secondary Glow Layer */}
                            <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 to-crimson/20 rounded-lg blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />

                            {/* Main Card */}
                            <div className="relative bg-gradient-to-br from-crimson/20 via-dark-gray to-charcoal border-2 border-gold/40 aspect-square flex items-center justify-center shadow-[0_0_60px_rgba(217,119,6,0.2),0_0_30px_rgba(185,28,28,0.15)]">
                                {/* Glowing Corner decorations */}
                                <div className="absolute -top-1 -left-1 w-12 h-12 border-t-[3px] border-l-[3px] border-gold shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
                                <div className="absolute -top-1 -right-1 w-12 h-12 border-t-[3px] border-r-[3px] border-gold shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
                                <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-[3px] border-l-[3px] border-gold shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
                                <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-[3px] border-r-[3px] border-gold shadow-[0_0_15px_rgba(217,119,6,0.5)]" />

                                {/* Glowing lamp behind */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 bg-crimson/25 rounded-full blur-3xl animate-pulse" />
                                </div>

                                {/* Lamp emoji with glow */}
                                <span className="text-[120px] relative z-10 drop-shadow-[0_0_40px_rgba(185,28,28,0.6)]">🏮</span>
                            </div>

                            {/* Floating 5+ Years Badge */}
                            <div className="absolute -bottom-5 -right-5 bg-gradient-to-br from-crimson to-crimson-dark px-5 py-3 border border-crimson-light/50 shadow-[0_0_30px_rgba(185,28,28,0.6)] animate-pulse">
                                <span className="text-white font-bold text-2xl sm:text-3xl block leading-tight">5+</span>
                                <span className="text-white/80 text-[10px] uppercase tracking-wider">Years</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="order-1 lg:order-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-gold" />
                            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Experience</span>
                        </div>

                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-display mb-6">
                            A Royal Dining <span className="text-crimson">Experience</span>
                        </h2>

                        <p className="text-light-gray text-lg mb-10 max-w-lg leading-relaxed">
                            At King Chinese Bowl, we don&apos;t just serve food — we create memories.
                            Our space transports you to the heart of Asia with every detail.
                        </p>

                        {/* Features - Enhanced Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="p-5 bg-dark-gray/50 border border-gray/20 hover:border-gold/40 hover:shadow-[0_0_20px_rgba(217,119,6,0.15)] transition-all duration-300 group"
                                >
                                    <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{feature.icon}</span>
                                    <span className="text-white text-sm font-semibold block mb-1">{feature.title}</span>
                                    <span className="text-gray text-xs">{feature.desc}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/reservation">
                                <button className="px-8 py-4 bg-crimson text-white font-semibold text-sm tracking-wider uppercase hover:bg-crimson-light hover:shadow-[0_0_25px_rgba(185,28,28,0.5)] transition-all">
                                    Book Your Table
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="px-6 py-4 text-gold text-sm tracking-wider hover:text-gold-light hover:drop-shadow-[0_0_15px_rgba(217,119,6,0.5)] transition-all flex items-center gap-2">
                                    Our Story <span>→</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
