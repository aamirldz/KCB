'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-12 bg-crimson relative overflow-hidden">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '20px 20px'
            }} />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">👑</span>
                        <div>
                            <h3 className="text-white text-2xl font-display">Ready for a Royal Feast?</h3>
                            <p className="text-white/70 text-sm">Order online or book a table today</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/order">
                            <button className="px-6 py-3 bg-white text-crimson font-bold text-sm tracking-wider uppercase hover:bg-cream transition-all">
                                Order Now
                            </button>
                        </Link>
                        <Link href="/reservation">
                            <button className="px-6 py-3 border-2 border-white text-white font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-crimson transition-all">
                                Reserve
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
