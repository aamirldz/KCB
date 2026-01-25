'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/order', label: 'Order' },
    { href: '/reservation', label: 'Reserve' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { itemCount } = useCart();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-crimson/20'
                : 'bg-black/50 backdrop-blur-sm'
                }`}
        >
            <div className="container">
                <nav className="flex items-center justify-between h-16 md:h-18">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl md:text-2xl">🍜</span>
                        <div>
                            <span className="chinese text-gold text-xs md:text-sm block leading-tight group-hover:text-gold-light transition-colors">国王中国碗</span>
                            <span className="text-white text-[10px] md:text-xs font-medium tracking-widest uppercase">King Chinese Bowl</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Properly Spaced */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${pathname === link.href
                                    ? 'text-crimson'
                                    : 'text-light-gray hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.span
                                        layoutId="navUnderline"
                                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-crimson shadow-[0_0_10px_rgba(185,28,28,0.8)]"
                                        transition={{ type: 'spring', duration: 0.4 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Cart */}
                        <Link
                            href="/order"
                            className="relative p-2 text-light-gray hover:text-gold transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-crimson text-white text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(185,28,28,0.6)]"
                                >
                                    {itemCount > 9 ? '9+' : itemCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* CTA Button */}
                        <Link href="/reservation" className="hidden md:block">
                            <button className="bg-crimson text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-crimson-light hover:shadow-[0_0_20px_rgba(185,28,28,0.5)] transition-all duration-300">
                                Book Table
                            </button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-light-gray hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-black/95 backdrop-blur-md border-t border-crimson/20"
                    >
                        <div className="container py-4 space-y-1">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-3 py-3 px-4 text-sm font-semibold uppercase tracking-wider transition-all ${pathname === link.href
                                            ? 'bg-crimson/10 text-crimson border-l-2 border-crimson'
                                            : 'text-light-gray hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="pt-4"
                            >
                                <Link href="/reservation">
                                    <button className="w-full bg-crimson text-white py-3 text-sm font-bold uppercase tracking-wider">
                                        Book Table
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
