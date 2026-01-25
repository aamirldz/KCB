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
            <div className="container py-16 lg:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-5 group">
                            <span className="text-4xl group-hover:scale-110 transition-transform">🍜</span>
                            <div>
                                <span className="chinese text-gold text-lg block leading-tight drop-shadow-[0_0_10px_rgba(217,119,6,0.3)]">国王中国碗</span>
                                <span className="text-white text-sm font-semibold tracking-wider uppercase">King Chinese Bowl</span>
                            </div>
                        </Link>
                        <p className="text-gray text-sm leading-relaxed mb-6">
                            Premium Chinese, Korean, Nepalese & Tibetan cuisine crafted with passion and served in an elegant dining atmosphere.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-dark-gray border border-gray/20 flex items-center justify-center text-gray hover:text-white hover:border-gold hover:shadow-[0_0_15px_rgba(217,119,6,0.3)] transition-all"
                                    title={social.name}
                                >
                                    <span className="text-lg">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="h-px w-4 bg-gold" />
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray text-sm hover:text-gold hover:translate-x-1 transition-all inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="h-px w-4 bg-gold" />
                            Opening Hours
                        </h4>
                        <div className="bg-dark-gray/50 border border-gray/20 p-5 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gold text-xs font-semibold uppercase tracking-wider">All Days</span>
                                <span className="text-green-500 text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    Open
                                </span>
                            </div>
                            <span className="text-white font-bold text-xl">11:00 AM – 2:00 AM</span>
                        </div>
                        <p className="text-gray text-xs">
                            Open 7 days a week, including all holidays
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="h-px w-4 bg-gold" />
                            Contact Us
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <span className="text-gray text-xs uppercase tracking-wider block mb-1">Address</span>
                                <span className="text-white">ALC Group, Sector 68</span>
                                <span className="text-gray block">Sahibzada Ajit Singh Nagar, Punjab 160062</span>
                            </li>
                            <li>
                                <span className="text-gray text-xs uppercase tracking-wider block mb-1">Phone</span>
                                <a href="tel:+917508450221" className="text-gold hover:text-gold-light transition-colors font-semibold text-lg">
                                    +91 75084 50221
                                </a>
                            </li>
                            <li>
                                <span className="text-gray text-xs uppercase tracking-wider block mb-1">Email</span>
                                <a href="mailto:hello@kingchinesebowl.com" className="text-gray hover:text-gold transition-colors">
                                    hello@kingchinesebowl.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.google.com/?q=ALC+Group+Sector+68+Mohali"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-gold text-xs hover:text-gold-light transition-colors group"
                                >
                                    🗺️ View on Google Maps
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
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
