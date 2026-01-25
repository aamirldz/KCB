'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';
import { StaffOrder, OrderStatus } from '@/types/order';
import { formatTime } from '@/lib/utils';

function OrderCard({ order, onUpdateStatus }: { order: StaffOrder; onUpdateStatus: (id: string, status: OrderStatus) => void }) {
    const [elapsedTime, setElapsedTime] = useState('0:00');

    useEffect(() => {
        const updateTimer = () => {
            const diff = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 1000);
            const mins = Math.floor(diff / 60);
            const secs = diff % 60;
            setElapsedTime(`${mins}:${secs.toString().padStart(2, '0')}`);
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [order.createdAt]);

    const isNew = order.status === 'new';
    const isPreparing = order.status === 'preparing';
    const isReady = order.status === 'ready';
    const mins = parseInt(elapsedTime.split(':')[0]);
    const timeColor = mins >= 15 ? 'text-crimson' : mins >= 10 ? 'text-gold' : 'text-green-500';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-charcoal/50 border-l-4 ${isNew ? 'border-l-blue-500' : isPreparing ? 'border-l-gold' : 'border-l-green-500'}`}
        >
            {/* Header */}
            <div className="p-3 border-b border-dark-gray flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-lg">#{order.orderNumber}</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold ${isNew ? 'bg-blue-500/20 text-blue-400' : isPreparing ? 'bg-gold/20 text-gold' : 'bg-green-500/20 text-green-400'}`}>
                        {order.status.toUpperCase()}
                    </span>
                </div>
                <span className={`font-mono text-sm ${timeColor}`}>⏱ {elapsedTime}</span>
            </div>

            {/* Info */}
            <div className="px-3 py-2 border-b border-dark-gray text-xs text-gray flex items-center gap-3">
                <span>{order.type === 'dine-in' ? `🍽️ Table ${order.tableNumber}` : '📦 Takeaway'}</span>
                {order.customerName && <span>• {order.customerName}</span>}
                <span>• {formatTime(order.createdAt)}</span>
            </div>

            {/* Items */}
            <div className="p-3 space-y-1.5">
                {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                        <span className="text-white font-bold">{item.quantity}×</span>
                        <span className="text-white flex-1">{item.name}</span>
                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-crimson'}`} />
                    </div>
                ))}
            </div>

            {/* Notes */}
            {order.notes && (
                <div className="px-3 pb-3">
                    <div className="p-2 bg-crimson/10 border border-crimson/20 text-xs">
                        <span className="text-crimson font-semibold">Note:</span>
                        <span className="text-white ml-1">{order.notes}</span>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="p-3 border-t border-dark-gray bg-black/30">
                {isNew && (
                    <button onClick={() => onUpdateStatus(order.id, 'preparing')} className="w-full py-2.5 bg-gold text-black text-sm font-bold hover:bg-gold-light transition-colors">
                        Start Preparing
                    </button>
                )}
                {isPreparing && (
                    <button onClick={() => onUpdateStatus(order.id, 'ready')} className="w-full py-2.5 bg-green-500 text-black text-sm font-bold hover:bg-green-400 transition-colors">
                        Mark Ready
                    </button>
                )}
                {isReady && (
                    <button onClick={() => onUpdateStatus(order.id, 'completed')} className="w-full py-2.5 bg-gray text-white text-sm font-bold hover:bg-light-gray hover:text-black transition-colors">
                        Complete
                    </button>
                )}
            </div>
        </motion.div>
    );
}

export default function KitchenPage() {
    const router = useRouter();
    const { currentStaff, getKitchenOrders, getOrdersByStatus, updateOrderStatus, newOrderAlert, clearNewOrderAlert } = useOrders();
    const [activeTab, setActiveTab] = useState<'active' | 'ready'>('active');

    useEffect(() => {
        if (!currentStaff) router.push('/staff');
    }, [currentStaff, router]);

    useEffect(() => { clearNewOrderAlert(); }, [clearNewOrderAlert]);

    // Auto-refresh
    const [, setRefresh] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setRefresh((r) => r + 1), 5000);
        return () => clearInterval(interval);
    }, []);

    const activeOrders = getKitchenOrders();
    const readyOrders = getOrdersByStatus(['ready']);
    const newOrders = activeOrders.filter((o) => o.status === 'new');
    const preparingOrders = activeOrders.filter((o) => o.status === 'preparing');
    const completedToday = getOrdersByStatus(['completed']).filter(
        (o) => o.completedAt && new Date(o.completedAt).toDateString() === new Date().toDateString()
    ).length;

    if (!currentStaff) return null;

    return (
        <>
            {/* Spacer for fixed staff navbar */}
            <div className="h-16" />
            <div className="min-h-[calc(100vh-5rem)] flex flex-col">
                {/* Stats Bar */}
                <div className="p-3 bg-black/30 border-b border-dark-gray flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-white text-sm"><span className="font-bold">{newOrders.length}</span> New</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gold" />
                            <span className="text-white text-sm"><span className="font-bold">{preparingOrders.length}</span> Preparing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-white text-sm"><span className="font-bold">{readyOrders.length}</span> Ready</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray text-sm">✓ {completedToday} done today</span>
                        <div className="flex bg-charcoal">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-4 py-2 text-sm font-semibold transition-all ${activeTab === 'active' ? 'bg-crimson text-white' : 'text-gray'}`}
                            >
                                Active ({activeOrders.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('ready')}
                                className={`px-4 py-2 text-sm font-semibold transition-all relative ${activeTab === 'ready' ? 'bg-green-500 text-white' : 'text-gray'}`}
                            >
                                Ready ({readyOrders.length})
                            </button>
                        </div>
                    </div>
                </div>

                {/* New Order Alert */}
                <AnimatePresence>
                    {newOrderAlert && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mx-3 mt-3 p-3 bg-blue-500/20 border border-blue-500/30 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>🔔</motion.span>
                                <span className="text-blue-400 font-semibold text-sm">New order received!</span>
                            </div>
                            <button onClick={clearNewOrderAlert} className="text-blue-400 text-xs hover:text-white">Dismiss</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Orders Grid */}
                <div className="flex-1 overflow-y-auto p-3">
                    {activeTab === 'active' ? (
                        <>
                            {activeOrders.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    <AnimatePresence>
                                        {activeOrders.map((order) => (
                                            <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-4">👨‍🍳</motion.span>
                                    <h3 className="text-white text-xl font-semibold mb-1">All caught up!</h3>
                                    <p className="text-gray text-sm">No orders in queue</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {readyOrders.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    <AnimatePresence>
                                        {readyOrders.map((order) => (
                                            <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <span className="text-6xl mb-4">✨</span>
                                    <h3 className="text-white text-xl font-semibold mb-1">No ready orders</h3>
                                    <p className="text-gray text-sm">Orders will appear once prepared</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
