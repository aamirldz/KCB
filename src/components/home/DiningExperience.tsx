'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
    { icon: '🏮', title: 'Authentic Ambiance' },
    { icon: '👨‍🍳', title: 'Master Chefs' },
    { icon: '🥢', title: 'Premium Quality' },
    { icon: '🍷', title: 'Curated Drinks' },
];

export default function DiningExperience() {
    return (
        <section className="py-16 bg-charcoal">
            <div className="container">
                <div className="grid lg:grid-cols-5 gap-8 items-center">
                    {/* Left - Image/Visual (2 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="relative bg-gradient-to-br from-crimson/20 via-dark-gray to-charcoal border border-crimson/20 aspect-square flex items-center justify-center">
                            <span className="text-[100px]">🏮</span>
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold" />
                            <div className="absolute -bottom-3 -right-3 bg-crimson px-3 py-1.5">
                                <span className="text-white font-bold text-lg">5+</span>
                                <span className="text-white/70 text-xs ml-1">Years</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Content (3 cols) */}
                    <div className="lg:col-span-3">
                        <span className="text-gold text-xs font-semibold tracking-widest uppercase">Experience</span>
                        <h2 className="text-white text-3xl md:text-4xl font-display mt-1 mb-4">
                            A Royal Dining <span className="text-crimson">Experience</span>
                        </h2>
                        <p className="text-light-gray mb-6 max-w-lg">
                            At King Chinese Bowl, we don&apos;t just serve food — we create memories.
                            Our space transports you to the heart of Asia with every detail.
                        </p>

                        {/* Features - Compact 2x2 */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex items-center gap-3 p-3 bg-dark-gray border border-gray/10">
                                    <span className="text-2xl">{feature.icon}</span>
                                    <span className="text-white text-sm">{feature.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <Link href="/reservation">
                                <button className="px-6 py-3 bg-crimson text-white font-semibold text-sm tracking-wider uppercase hover:bg-crimson-light transition-all">
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
