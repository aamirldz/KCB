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
        <section className="py-20 bg-charcoal relative z-10">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Clean Visual Card */}
                    <div className="order-2 lg:order-1">
                        <div className="relative max-w-sm mx-auto lg:mx-0">
                            {/* Main Card */}
                            <div className="relative bg-gradient-to-br from-crimson/15 to-dark-gray border border-gold/30 aspect-square flex items-center justify-center">
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold" />
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold" />
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold" />

                                {/* Lamp emoji */}
                                <span className="text-[100px]">🏮</span>
                            </div>

                            {/* 5+ Years Badge - Bottom Right Corner */}
                            <div className="absolute -bottom-3 -right-3 bg-crimson px-3 py-2 shadow-md">
                                <span className="text-white font-bold text-lg block leading-none">5+</span>
                                <span className="text-white/70 text-[9px] uppercase">Years</span>
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

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="flex items-center gap-3 p-4 bg-dark-gray/50 border border-gray/10 hover:border-gold/30 transition-all"
                                >
                                    <span className="text-2xl">{feature.icon}</span>
                                    <span className="text-white text-sm">{feature.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/reservation">
                                <button className="px-8 py-3 bg-crimson text-white font-semibold text-sm tracking-wider uppercase hover:bg-crimson-light transition-all">
                                    Book Table
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="px-6 py-3 text-gold text-sm tracking-wider hover:text-gold-light transition-all">
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
