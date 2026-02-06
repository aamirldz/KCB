'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';

const navLinks = [
    { href: '/staff/pos', label: 'POS', icon: '🛒' },
    { href: '/staff/kitchen', label: 'Kitchen', icon: '👨‍🍳' },
    { href: '/staff/orders', label: 'Orders', icon: '📋' },
];

export default function StaffHeader() {
    const pathname = usePathname();
    const { currentStaff, logout, getActiveOrders } = useOrders();
    const activeOrdersCount = getActiveOrders().length;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal border-b border-dark-gray">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Logo */}
                <Link href="/staff" className="flex items-center gap-3">
                    <span className="text-crimson text-2xl">🍜</span>
                    <div>
                        <span className="text-white text-sm font-semibold">KCB Staff</span>
                        {currentStaff && (
                            <span className="block text-xs text-gray">{currentStaff.name}</span>
                        )}
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${pathname === link.href
                                    ? 'bg-crimson text-white'
                                    : 'text-light-gray hover:text-white hover:bg-dark-gray'
                                }`}
                        >
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                            {link.href === '/staff/orders' && activeOrdersCount > 0 && (
                                <span className="ml-1 px-2 py-0.5 text-xs bg-gold text-black font-bold rounded-full">
                                    {activeOrdersCount}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Back to website */}
                    <Link
                        href="/"
                        className="text-sm text-gray hover:text-gold transition-colors"
                    >
                        ← Main Site
                    </Link>

                    {currentStaff && (
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm text-gray hover:text-crimson transition-colors"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
