'use client';

import React from 'react';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-16 bg-gradient-to-r from-crimson to-crimson-light relative z-0">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
            }} />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <span className="text-5xl">👑</span>
                        <div>
                            <h3 className="text-white text-2xl md:text-3xl font-display mb-1">Ready for a Royal Feast?</h3>
                            <p className="text-white/80 text-sm">Order online or book a table today</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/order">
                            <button className="px-8 py-3 bg-white text-crimson font-bold text-sm tracking-wider uppercase hover:bg-cream transition-all shadow-lg">
                                Order Now
                            </button>
                        </Link>
                        <Link href="/reservation">
                            <button className="px-8 py-3 border-2 border-white text-white font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-crimson transition-all">
                                Reserve Table
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
