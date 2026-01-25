'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderProvider, useOrders } from '@/context/OrderContext';

const navLinks = [
    { href: '/staff/pos', label: 'POS', icon: '🛒' },
    { href: '/staff/kitchen', label: 'Kitchen', icon: '👨‍🍳' },
    { href: '/staff/orders', label: 'Orders', icon: '📋' },
];

function StaffNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const { currentStaff, logout, getActiveOrders } = useOrders();
    const [currentTime, setCurrentTime] = useState(new Date());
    const activeOrdersCount = getActiveOrders().length;

    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/staff');
    };

    // Don't show header on login page
    if (pathname === '/staff') return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-charcoal to-black border-b border-crimson/20">
            <div className="flex items-center justify-between h-14 px-4 lg:px-6">
                {/* Logo */}
                <Link href="/staff" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-crimson/20 to-gold/10 border border-crimson/30 flex items-center justify-center group-hover:border-crimson/50 transition-colors">
                        <span className="text-xl">🍜</span>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-white text-sm font-bold tracking-wide block">KCB Staff</span>
                        {currentStaff && (
                            <span className="text-gold text-xs">{currentStaff.name}</span>
                        )}
                    </div>
                </Link>

                {/* Center Navigation */}
                <nav className="flex items-center gap-1 bg-black/40 border border-gray/10 p-1 rounded-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-sm ${pathname === link.href
                                    ? 'bg-crimson text-white shadow-[0_0_15px_rgba(185,28,28,0.4)]'
                                    : 'text-gray hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className="text-base">{link.icon}</span>
                            <span className="hidden sm:inline">{link.label}</span>
                            {link.href === '/staff/kitchen' && activeOrdersCount > 0 && pathname !== '/staff/kitchen' && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(217,119,6,0.5)]"
                                >
                                    {activeOrdersCount}
                                </motion.span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {/* Clock */}
                    <div className="hidden md:block text-right">
                        <span className="text-gold font-mono text-sm block">
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-gray text-xs">
                            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                    </div>

                    {/* Main Site */}
                    <Link
                        href="/"
                        className="hidden lg:flex items-center gap-1 text-xs text-gray hover:text-gold transition-colors"
                    >
                        ← Main Site
                    </Link>

                    {/* Logout */}
                    {currentStaff && (
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 bg-crimson/10 border border-crimson/30 text-crimson text-xs font-semibold hover:bg-crimson hover:text-white hover:border-crimson transition-all"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/staff';

    return (
        <OrderProvider>
            <div className="min-h-screen bg-gradient-to-br from-black via-charcoal to-black">
                <StaffNavigation />
                <main className={isLoginPage ? '' : 'pt-14'}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </OrderProvider>
    );
}
