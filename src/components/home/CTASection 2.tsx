'use client';

import React from 'react';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-12 bg-gradient-to-r from-crimson-dark via-crimson to-crimson-dark relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
            }} />

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Left - Text */}
                    <div className="flex items-center gap-4 text-center lg:text-left">
                        <span className="text-4xl hidden sm:block">👑</span>
                        <div>
                            <h3 className="text-white text-xl md:text-2xl font-display font-bold">
                                Ready for a Royal Feast?
                            </h3>
                            <p className="text-white/70 text-sm">Order online or reserve your table today</p>
                        </div>
                    </div>

                    {/* Right - Buttons */}
                    <div className="flex gap-3">
                        <Link href="/order">
                            <button className="px-6 py-3 bg-white text-crimson font-bold text-xs tracking-wider uppercase hover:bg-cream hover:shadow-lg transition-all">
                                Order Now
                            </button>
                        </Link>
                        <Link href="/reservation">
                            <button className="px-6 py-3 border-2 border-white text-white font-bold text-xs tracking-wider uppercase hover:bg-white hover:text-crimson transition-all">
                                Book Table
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
