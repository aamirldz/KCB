'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { STAFF_MEMBERS } from '@/types/order';
import { useOrders } from '@/context/OrderContext';

export default function StaffLoginPage() {
    const router = useRouter();
    const { login, currentStaff } = useOrders();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState<'staff' | 'kitchen' | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // If already logged in, redirect
    React.useEffect(() => {
        if (currentStaff) {
            router.push(currentStaff.role === 'kitchen' ? '/staff/kitchen' : '/staff/pos');
        }
    }, [currentStaff, router]);

    const handlePinEntry = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            setError('');

            if (newPin.length === 4) {
                setIsLoading(true);
                const staff = STAFF_MEMBERS.find(
                    (s) => s.pin === newPin && (selectedRole ? s.role === selectedRole || s.role === 'manager' : true)
                );

                setTimeout(() => {
                    if (staff) {
                        login(staff);
                        router.push(staff.role === 'kitchen' ? '/staff/kitchen' : '/staff/pos');
                    } else {
                        setError('Invalid PIN');
                        setPin('');
                        setIsLoading(false);
                    }
                }, 500);
            }
        }
    };

    const handleClear = () => { setPin(''); setError(''); };
    const handleBackspace = () => { setPin((prev) => prev.slice(0, -1)); setError(''); };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-crimson/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ rotateY: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-crimson/20 to-gold/10 border border-crimson/30 flex items-center justify-center"
                    >
                        <span className="text-5xl">🍜</span>
                    </motion.div>
                    <h1 className="text-white font-display text-2xl mb-1">Staff Portal</h1>
                    <p className="text-gray text-sm">King Chinese Bowl</p>
                </div>

                <AnimatePresence mode="wait">
                    {!selectedRole ? (
                        <motion.div
                            key="roles"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-3"
                        >
                            {[
                                { id: 'staff', icon: '🛒', title: 'Staff / Waiter', desc: 'Take orders via POS', color: 'crimson' },
                                { id: 'kitchen', icon: '👨‍🍳', title: 'Kitchen / Chef', desc: 'Prepare orders', color: 'gold' },
                            ].map((role) => (
                                <motion.button
                                    key={role.id}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedRole(role.id as 'staff' | 'kitchen')}
                                    className={`w-full p-4 bg-charcoal/60 backdrop-blur border border-dark-gray hover:border-${role.color}/40 transition-all flex items-center gap-4 group`}
                                >
                                    <div className={`w-12 h-12 bg-${role.color}/10 border border-${role.color}/20 flex items-center justify-center group-hover:bg-${role.color}/20 transition-colors`}>
                                        <span className="text-2xl">{role.icon}</span>
                                    </div>
                                    <div className="flex-1 text-left">
                                        <span className="text-white font-semibold block">{role.title}</span>
                                        <span className="text-gray text-xs">{role.desc}</span>
                                    </div>
                                    <span className={`text-gray group-hover:text-${role.color} transition-colors text-lg`}>→</span>
                                </motion.button>
                            ))}

                            <div className="pt-6 text-center">
                                <a href="/" className="text-gray text-sm hover:text-gold transition-colors">
                                    ← Back to Website
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="pin"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-charcoal/60 backdrop-blur border border-dark-gray p-6"
                        >
                            <button
                                onClick={() => { setSelectedRole(null); setPin(''); setError(''); }}
                                className="text-gray text-sm hover:text-white mb-4 flex items-center gap-1"
                            >
                                ← Back
                            </button>

                            {/* Role Icon */}
                            <div className="text-center mb-6">
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={`w-14 h-14 mx-auto mb-2 ${selectedRole === 'staff' ? 'bg-crimson/10 border-crimson/20' : 'bg-gold/10 border-gold/20'} border flex items-center justify-center`}
                                >
                                    <span className="text-3xl">{selectedRole === 'staff' ? '🛒' : '👨‍🍳'}</span>
                                </motion.div>
                                <span className={`text-sm font-semibold ${selectedRole === 'staff' ? 'text-crimson' : 'text-gold'}`}>
                                    {selectedRole === 'staff' ? 'Staff Login' : 'Kitchen Login'}
                                </span>
                            </div>

                            {/* PIN Dots */}
                            <div className="flex justify-center gap-3 mb-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={pin.length > i ? { scale: [1, 1.2, 1] } : {}}
                                        className={`w-12 h-12 border-2 flex items-center justify-center transition-all ${error ? 'border-crimson bg-crimson/10' :
                                                pin.length > i ? 'border-gold bg-gold/10' : 'border-gray/30'
                                            }`}
                                    >
                                        {pin.length > i && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-3 h-3 bg-gold rounded-full"
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Error */}
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-crimson text-center text-sm mb-3"
                                >
                                    ⚠️ {error}
                                </motion.p>
                            )}

                            {/* Loading */}
                            {isLoading && (
                                <div className="text-center mb-3">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full mx-auto"
                                    />
                                </div>
                            )}

                            {/* Keypad */}
                            <div className="grid grid-cols-3 gap-2">
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((key) => (
                                    <motion.button
                                        key={key}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            if (key === 'C') handleClear();
                                            else if (key === '⌫') handleBackspace();
                                            else handlePinEntry(key);
                                        }}
                                        disabled={isLoading}
                                        className={`h-12 text-lg font-bold transition-all disabled:opacity-50 ${key === 'C' ? 'bg-crimson/20 text-crimson hover:bg-crimson hover:text-white' :
                                                key === '⌫' ? 'bg-dark-gray text-gray hover:text-white' :
                                                    'bg-dark-gray text-white hover:bg-gray/50'
                                            }`}
                                    >
                                        {key}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Demo PINs */}
                            <div className="mt-5 pt-4 border-t border-dark-gray text-center">
                                <p className="text-gray text-xs mb-2">Demo PINs:</p>
                                <div className="flex justify-center gap-6 text-xs">
                                    <span className="text-crimson">Staff: <span className="font-mono text-white">1234</span></span>
                                    <span className="text-gold">Kitchen: <span className="font-mono text-white">3456</span></span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
