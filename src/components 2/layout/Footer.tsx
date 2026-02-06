'use client';

import React from 'react';
import Link from 'next/link';

const quickLinks = [
    { href: '/menu', label: 'Our Menu' },
    { href: '/order', label: 'Order Online' },
    { href: '/reservation', label: 'Book Table' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/staff', label: 'Staff Portal' },
];

const socialLinks = [
    { name: 'Instagram', icon: '📸', href: 'https://instagram.com' },
    { name: 'Facebook', icon: '📘', href: 'https://facebook.com' },
    { name: 'WhatsApp', icon: '💬', href: 'https://wa.me/917508450221' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-dark-gray relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-crimson/5 rounded-full blur-[150px]" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px]" />

            {/* Main Footer */}
            <div className="container py-10 md:py-16 lg:py-20 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 lg:gap-12">

                    {/* Brand Column - Left on mobile */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-3 group">
                            <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform">🍜</span>
                            <div>
                                <span className="chinese text-gold text-sm md:text-base block leading-tight drop-shadow-[0_0_10px_rgba(217,119,6,0.3)]">国王中国碗</span>
                                <span className="text-white text-[10px] md:text-xs font-semibold tracking-wider uppercase">King Chinese Bowl</span>
                            </div>
                        </Link>
                        <p className="text-gray text-[10px] md:text-sm leading-relaxed mb-3 md:mb-4">
                            Premium Asian cuisine.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-7 h-7 md:w-9 md:h-9 bg-dark-gray border border-gray/20 flex items-center justify-center text-gray hover:text-white hover:border-gold hover:shadow-[0_0_15px_rgba(217,119,6,0.3)] transition-all"
                                    title={social.name}
                                >
                                    <span className="text-xs md:text-base">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links - Right on mobile */}
                    <div>
                        <h4 className="text-white font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <span className="h-px w-2 md:w-3 bg-gold" />
                            Links
                        </h4>
                        <ul className="space-y-1.5 md:space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray text-[10px] md:text-xs hover:text-gold transition-all inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Opening Hours - Left on second row mobile */}
                    <div>
                        <h4 className="text-white font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <span className="h-px w-2 md:w-3 bg-gold" />
                            Hours
                        </h4>
                        <div className="bg-dark-gray/50 border border-gray/20 p-2.5 md:p-4 mb-2">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-gold text-[9px] md:text-[10px] font-semibold uppercase">All Days</span>
                                <span className="text-green-500 text-[9px] md:text-[10px] flex items-center gap-1">
                                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                    Open
                                </span>
                            </div>
                            <span className="text-white font-bold text-sm md:text-lg">11AM – 2AM</span>
                        </div>
                        <p className="text-gray text-[9px] md:text-[10px]">Open 7 days</p>
                    </div>

                    {/* Contact Info - Right on second row mobile */}
                    <div>
                        <h4 className="text-white font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <span className="h-px w-2 md:w-3 bg-gold" />
                            Contact
                        </h4>
                        <ul className="space-y-2 md:space-y-3 text-[10px] md:text-xs">
                            <li>
                                <span className="text-white block">Sector 68, Mohali</span>
                                <span className="text-gray text-[9px] md:text-[10px]">Punjab 160062</span>
                            </li>
                            <li>
                                <a href="tel:+917508450221" className="text-gold hover:text-gold-light transition-colors font-semibold text-sm md:text-base">
                                    +91 75084 50221
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.google.com/?q=ALC+Group+Sector+68+Mohali"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-gold text-[9px] md:text-[10px] hover:text-gold-light transition-colors"
                                >
                                    🗺️ Google Maps →
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-dark-gray">
                <div className="container py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray">
                    <span>© {currentYear} <span className="text-gold">King Chinese Bowl</span> • All rights reserved</span>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
