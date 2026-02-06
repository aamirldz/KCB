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
        <section className="py-20 bg-gradient-to-b from-charcoal via-charcoal to-dark-gray relative z-10 overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-crimson/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px]" />

            <div className="container relative">
                {/* Main Layout - Lamp Card + Text Side by Side */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
                    {/* Left Side - Lamp Card with Text Attached */}
                    <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-0">
                        {/* Lamp Card */}
                        <div className="relative flex-shrink-0">
                            <div className="relative w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-crimson/20 via-dark-gray to-charcoal border-2 border-gold/40 flex items-center justify-center shadow-[0_8px_40px_rgba(185,28,28,0.2)]">
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold" />

                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.15),transparent_70%)]" />

                                {/* Lamp emoji */}
                                <span className="text-[120px] drop-shadow-[0_0_40px_rgba(217,119,6,0.4)]">🏮</span>

                                {/* 5+ Years Badge */}
                                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-crimson to-crimson-dark px-4 py-2 shadow-[0_4px_20px_rgba(185,28,28,0.5)]">
                                    <span className="text-white font-bold text-2xl block leading-none">5+</span>
                                    <span className="text-white/70 text-[10px] uppercase tracking-wider">Years</span>
                                </div>
                            </div>
                        </div>

                        {/* Text Content - Attached beside lamp */}
                        <div className="lg:pl-8 lg:border-l-2 lg:border-gold/30 lg:ml-8 flex flex-col justify-center max-w-lg">
                            <span className="inline-block text-gold text-xs font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full w-fit">
                                ✦ Experience
                            </span>
                            <h2 className="text-white text-3xl md:text-4xl font-display mb-4 leading-tight">
                                A Royal Dining <span className="text-crimson">Experience</span>
                            </h2>
                            <p className="text-light-gray text-sm md:text-base leading-relaxed">
                                At King Chinese Bowl, we don&apos;t just serve food — we create memories.
                                Our space transports you to the heart of Asia with every detail.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Features & CTA */}
                    <div className="lg:ml-auto lg:pl-8 flex flex-col justify-center">
                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="group flex items-center gap-3 p-4 bg-dark-gray/60 border border-gray/20 rounded-xl hover:border-gold/40 hover:bg-dark-gray/80 hover:shadow-[0_4px_20px_rgba(217,119,6,0.1)] transition-all duration-300"
                                >
                                    <span className="text-3xl group-hover:scale-110 transition-transform">{feature.icon}</span>
                                    <span className="text-white text-sm font-medium">{feature.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link href="/reservation">
                                <button className="px-8 py-3.5 bg-gradient-to-r from-crimson to-crimson-dark text-white font-bold text-sm tracking-wider uppercase rounded-lg hover:shadow-[0_6px_30px_rgba(185,28,28,0.4)] hover:scale-105 transition-all duration-300">
                                    Book Table
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="px-6 py-3.5 text-gold text-sm font-semibold tracking-wider hover:text-gold-light transition-all flex items-center gap-2 group">
                                    Our Story
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
