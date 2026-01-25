'use client';

import React from 'react';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-crimson-dark to-black" />

            {/* Animated glow orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-crimson/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
            }} />

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Crown with glow */}
                    <div className="mb-6">
                        <span className="text-6xl md:text-7xl drop-shadow-[0_0_30px_rgba(217,119,6,0.5)] inline-block animate-pulse">👑</span>
                    </div>

                    {/* Main heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                        Ready for a <span className="text-gold drop-shadow-[0_0_20px_rgba(217,119,6,0.5)]">Royal Feast</span>?
                    </h2>

                    {/* Subheading */}
                    <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto">
                        Experience the finest Asian cuisine. Order for delivery or reserve your table for an unforgettable dining experience.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/order">
                            <button className="group relative px-10 py-4 bg-gradient-to-r from-gold to-gold-light text-black font-bold text-sm tracking-wider uppercase overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(217,119,6,0.6)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    🛒 Order Now
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            </button>
                        </Link>
                        <Link href="/reservation">
                            <button className="group relative px-10 py-4 border-2 border-gold text-gold font-bold text-sm tracking-wider uppercase overflow-hidden transition-all hover:text-black hover:shadow-[0_0_40px_rgba(217,119,6,0.4)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    📅 Reserve Table
                                </span>
                                <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 -z-0" />
                            </button>
                        </Link>
                    </div>

                    {/* Decorative line */}
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
                        <span className="text-gold/50 text-xs tracking-[0.3em] uppercase">Est. 2019</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
                    </div>
                </div>
            </div>
        </section>
    );
}
