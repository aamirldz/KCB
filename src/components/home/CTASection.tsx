'use client';

import React from 'react';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="mt-24 md:mt-32 lg:mt-40 py-16 bg-gradient-to-r from-black via-crimson-dark to-black border-y border-crimson/30">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left - Text */}
                    <div className="flex items-center gap-4 text-center md:text-left">
                        <span className="text-4xl hidden sm:block">👑</span>
                        <div>
                            <h3 className="text-white text-xl md:text-2xl font-display">
                                Ready for a <span className="text-gold">Royal Feast</span>?
                            </h3>
                            <p className="text-gray text-sm">Order online or book a table today</p>
                        </div>
                    </div>

                    {/* Right - Buttons */}
                    <div className="flex gap-3">
                        <Link href="/order">
                            <button className="px-6 py-3 bg-crimson text-white font-semibold text-xs tracking-wider uppercase hover:bg-crimson-light transition-all">
                                🛒 Order Now
                            </button>
                        </Link>
                        <Link href="/reservation">
                            <button className="px-6 py-3 border border-gold text-gold font-semibold text-xs tracking-wider uppercase hover:bg-gold hover:text-black transition-all">
                                📅 Reserve
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
