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
        <footer className="bg-charcoal border-t border-dark-gray">
            {/* Main Footer */}
            <div className="container py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">🍜</span>
                            <div>
                                <span className="chinese text-gold text-base block leading-tight">国王中国碗</span>
                                <span className="text-white text-xs font-semibold tracking-wider uppercase">King Chinese Bowl</span>
                            </div>
                        </Link>
                        <p className="text-gray text-sm leading-relaxed mb-5">
                            Premium Chinese, Korean, Nepalese & Tibetan cuisine in an elegant dining atmosphere.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 bg-dark-gray flex items-center justify-center text-gray hover:text-white hover:bg-crimson transition-all"
                                    title={social.name}
                                >
                                    <span className="text-sm">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray text-sm hover:text-gold transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Opening Hours</h4>
                        <div className="bg-dark-gray/50 p-4 mb-3">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-gold text-xs font-semibold">ALL DAYS</span>
                                <span className="text-green-500 text-xs">● Open</span>
                            </div>
                            <span className="text-white font-bold">11:00 AM – 2:00 AM</span>
                        </div>
                        <p className="text-gray text-xs">
                            Open 7 days a week including holidays
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <span className="text-white block">ALC Group, Sector 68</span>
                                <span className="text-gray">Sahibzada Ajit Singh Nagar, Punjab 160062</span>
                            </li>
                            <li>
                                <a href="tel:+917508450221" className="text-gold hover:text-gold-light transition-colors font-semibold">
                                    +91 75084 50221
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hello@kingchinesebowl.com" className="text-gray hover:text-gold transition-colors">
                                    hello@kingchinesebowl.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.google.com/?q=ALC+Group+Sector+68+Mohali"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gold text-xs hover:text-gold-light transition-colors inline-flex items-center gap-1"
                                >
                                    🗺️ View on Google Maps →
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-dark-gray">
                <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray">
                    <span>© {currentYear} <span className="text-gold">King Chinese Bowl</span> • All rights reserved</span>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
