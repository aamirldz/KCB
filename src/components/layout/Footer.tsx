'use client';

import React from 'react';
import Link from 'next/link';

const quickLinks = [
    { href: '/menu', label: 'Our Menu', icon: '🍜' },
    { href: '/order', label: 'Order Online', icon: '🛒' },
    { href: '/reservation', label: 'Book Table', icon: '📅' },
    { href: '/about', label: 'About Us', icon: '📖' },
    { href: '/contact', label: 'Contact', icon: '📞' },
    { href: '/staff', label: 'Staff Portal', icon: '👨‍🍳' },
];

const socialLinks = [
    { name: 'Instagram', icon: '📸', href: 'https://instagram.com', color: 'hover:bg-pink-500/20 hover:border-pink-500' },
    { name: 'Facebook', icon: '📘', href: 'https://facebook.com', color: 'hover:bg-blue-500/20 hover:border-blue-500' },
    { name: 'WhatsApp', icon: '💬', href: 'https://wa.me/917508450221', color: 'hover:bg-green-500/20 hover:border-green-500' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-charcoal to-black border-t border-gold/20 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-crimson/8 rounded-full blur-[180px]" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/8 rounded-full blur-[150px]" />

            {/* Main Footer */}
            <div className="container py-12 lg:py-16 relative z-10">
                {/* Top Section - Brand */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-10 border-b border-gray/20">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-14 h-14 bg-gradient-to-br from-crimson to-crimson-dark rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(185,28,28,0.4)] group-hover:scale-105 transition-transform">
                            <span className="text-3xl">🍜</span>
                        </div>
                        <div>
                            <span className="chinese text-gold text-xl block leading-tight drop-shadow-[0_0_10px_rgba(217,119,6,0.4)]">国王中国碗</span>
                            <span className="text-white text-sm font-bold tracking-widest uppercase">King Chinese Bowl</span>
                        </div>
                    </Link>

                    {/* Social Links */}
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-12 h-12 bg-dark-gray/80 border border-gray/30 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${social.color}`}
                                title={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Main Grid - 2 columns on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-gradient-to-r from-gold to-transparent" />
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {quickLinks.slice(0, 3).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2 text-gray text-sm hover:text-gold hover:translate-x-1 transition-all"
                                    >
                                        <span className="text-xs opacity-60">{link.icon}</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More Links */}
                    <div className="col-span-1">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-gradient-to-r from-gold to-transparent" />
                            More
                        </h4>
                        <ul className="space-y-2.5">
                            {quickLinks.slice(3).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2 text-gray text-sm hover:text-gold hover:translate-x-1 transition-all"
                                    >
                                        <span className="text-xs opacity-60">{link.icon}</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div className="col-span-1">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-gradient-to-r from-gold to-transparent" />
                            Hours
                        </h4>
                        <div className="bg-gradient-to-br from-dark-gray/80 to-charcoal border border-gold/20 rounded-xl p-4 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gold text-xs font-bold uppercase tracking-wider">Every Day</span>
                                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 rounded-full">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-green-400 text-[10px] font-semibold uppercase">Open</span>
                                </span>
                            </div>
                            <span className="text-white font-bold text-lg block">11:00 AM – 2:00 AM</span>
                            <span className="text-gray text-[11px] block mt-1">Including all holidays</span>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-gradient-to-r from-gold to-transparent" />
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <span className="text-gray text-[10px] uppercase tracking-wider block mb-0.5">📍 Address</span>
                                <span className="text-light-gray text-sm leading-tight block">ALC Group, Sector 68, SAS Nagar</span>
                            </li>
                            <li>
                                <span className="text-gray text-[10px] uppercase tracking-wider block mb-0.5">📞 Phone</span>
                                <a href="tel:+917508450221" className="text-gold font-bold text-base hover:text-gold-light transition-colors">
                                    +91 75084 50221
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.google.com/?q=ALC+Group+Sector+68+Mohali"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/30 rounded-lg text-gold text-xs font-semibold hover:bg-gold/20 transition-all"
                                >
                                    🗺️ View on Maps
                                    <span>→</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray/20 bg-black/50">
                <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray">
                    <span>© {currentYear} <span className="text-gold font-semibold">King Chinese Bowl</span> • All rights reserved</span>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-gold transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-gold transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
