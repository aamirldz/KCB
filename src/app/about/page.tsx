'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const values = [
    { icon: '🎋', title: 'Authentic Recipes', description: 'Passed down through generations' },
    { icon: '🥢', title: 'Premium Ingredients', description: 'Finest quality, always fresh' },
    { icon: '👨‍🍳', title: 'Master Chefs', description: 'Decades of expertise' },
    { icon: '🏮', title: 'Cultural Experience', description: 'A journey through Asia' },
];

const timeline = [
    { year: '2019', title: 'The Dream Begins', description: 'Founded with a passion for authentic Asian cuisine' },
    { year: '2020', title: 'Grand Opening', description: 'Opened our doors in the heart of the city' },
    { year: '2022', title: 'Expanding Horizons', description: 'Added Korean, Nepalese & Tibetan cuisines' },
    { year: '2024', title: 'Digital Evolution', description: 'Launched online ordering system' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Hero */}
            <section className="section relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-crimson/10 to-transparent" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="chinese text-gold text-2xl block mb-3">关于我们</span>
                        <h1 className="text-white mb-6">Our Story</h1>
                        <p className="text-light-gray text-lg leading-relaxed">
                            At King Chinese Bowl, we believe food is more than sustenance — it&apos;s a bridge
                            between cultures, a celebration of heritage, and a journey of discovery.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Vision */}
            <section className="section bg-charcoal">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] bg-gradient-to-br from-crimson/20 via-dark-gray to-charcoal flex items-center justify-center">
                                <span className="text-9xl">🏮</span>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-crimson p-6">
                                <span className="text-white font-display text-4xl font-bold block">5+</span>
                                <span className="text-white/70 text-sm uppercase tracking-wider">Years</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-crimson text-sm uppercase tracking-wider">Our Vision</span>
                            <h2 className="text-white mt-2 mb-6">Where Tradition Meets Excellence</h2>
                            <p className="text-light-gray mb-6 leading-relaxed">
                                The name &quot;King Chinese Bowl&quot; embodies our philosophy — every bowl we serve
                                is fit for royalty. Our menu is a journey through Chinese, Korean, Nepalese,
                                and Tibetan cuisines.
                            </p>
                            <Link href="/menu">
                                <Button>Explore Menu</Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section bg-black">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="chinese text-gold text-xl block mb-2">我们的价值观</span>
                        <h2 className="text-white">What We Stand For</h2>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-6 border border-dark-gray hover:border-crimson/50 transition-colors"
                            >
                                <span className="text-5xl block mb-4">{value.icon}</span>
                                <h4 className="text-white text-base mb-2">{value.title}</h4>
                                <p className="text-gray text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section bg-charcoal">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="chinese text-gold text-xl block mb-2">我们的旅程</span>
                        <h2 className="text-white">Our Journey</h2>
                    </motion.div>

                    <div className="max-w-2xl mx-auto">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative pl-8 pb-8 border-l border-crimson/30 last:pb-0"
                            >
                                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] bg-crimson" />
                                <span className="text-gold font-display text-lg">{item.year}</span>
                                <h4 className="text-white mt-1 mb-1">{item.title}</h4>
                                <p className="text-gray text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-crimson-dark via-crimson to-crimson-dark">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-white mb-6">Ready for a Royal Experience?</h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/reservation">
                                <Button className="bg-white text-crimson hover:bg-cream">Reserve Table</Button>
                            </Link>
                            <Link href="/contact">
                                <Button className="border-white text-white hover:bg-white hover:text-crimson">Contact Us</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
