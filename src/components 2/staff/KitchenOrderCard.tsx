'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StaffOrder, OrderStatus } from '@/types/order';
import { formatTime } from '@/lib/utils';
import OrderStatusBadge from './OrderStatusBadge';

interface KitchenOrderCardProps {
    order: StaffOrder;
    onUpdateStatus: (orderId: string, status: OrderStatus) => void;
    onUpdateItemStatus: (orderId: string, itemId: string, status: 'pending' | 'preparing' | 'ready') => void;
}

export default function KitchenOrderCard({ order, onUpdateStatus, onUpdateItemStatus }: KitchenOrderCardProps) {
    const [elapsedTime, setElapsedTime] = useState('0:00');

    // Update elapsed time every second
    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const diff = Math.floor((now.getTime() - new Date(order.createdAt).getTime()) / 1000);
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            setElapsedTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [order.createdAt]);

    const isNew = order.status === 'new';
    const isPreparing = order.status === 'preparing';
    const isReady = order.status === 'ready';

    // Time warning colors
    const getTimeColor = () => {
        const minutes = parseInt(elapsedTime.split(':')[0]);
        if (minutes >= 15) return 'text-crimson';
        if (minutes >= 10) return 'text-gold';
        return 'text-green-500';
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={`bg-charcoal border-2 overflow-hidden ${isNew ? 'border-blue-500' : isPreparing ? 'border-gold' : 'border-green-500'
                }`}
        >
            {/* Header */}
            <div className={`p-4 ${isNew ? 'bg-blue-500/10' : isPreparing ? 'bg-gold/10' : 'bg-green-500/10'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-white font-display text-2xl font-bold">
                            #{order.orderNumber}
                        </span>
                        <OrderStatusBadge status={order.status} size="sm" />
                    </div>

                    <div className="text-right">
                        <span className={`font-mono text-lg font-bold ${getTimeColor()}`}>
                            ⏱ {elapsedTime}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-light-gray">
                        {order.type === 'dine-in' ? `🍽️ Table ${order.tableNumber}` : '📦 Takeaway'}
                    </span>
                    {order.customerName && (
                        <span className="text-gray">• {order.customerName}</span>
                    )}
                    <span className="text-gray">• {formatTime(order.createdAt)}</span>
                </div>
            </div>

            {/* Items */}
            <div className="p-4 space-y-2">
                {order.items.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 border transition-all ${item.status === 'ready'
                            ? 'bg-green-500/10 border-green-500/30'
                            : item.status === 'preparing'
                                ? 'bg-gold/10 border-gold/30'
                                : 'bg-dark-gray border-gray/20'
                            }`}
                    >
                        {/* Item info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-lg">{item.quantity}×</span>
                                <span className="text-white">{item.name}</span>
                                <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-crimson'}`} />
                            </div>
                            {item.specialInstructions && (
                                <p className="text-gold text-sm mt-1">⚠️ {item.specialInstructions}</p>
                            )}
                        </div>

                        {/* Item status buttons */}
                        <div className="flex gap-1">
                            {item.status === 'pending' && (
                                <button
                                    onClick={() => onUpdateItemStatus(order.id, item.id, 'preparing')}
                                    className="px-3 py-1.5 bg-gold/20 text-gold text-xs font-semibold hover:bg-gold hover:text-black transition-all"
                                >
                                    Start
                                </button>
                            )}
                            {item.status === 'preparing' && (
                                <button
                                    onClick={() => onUpdateItemStatus(order.id, item.id, 'ready')}
                                    className="px-3 py-1.5 bg-green-500/20 text-green-500 text-xs font-semibold hover:bg-green-500 hover:text-black transition-all"
                                >
                                    Ready
                                </button>
                            )}
                            {item.status === 'ready' && (
                                <span className="px-3 py-1.5 text-green-500 text-xs font-semibold">
                                    ✓ Done
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Notes */}
            {order.notes && (
                <div className="px-4 pb-4">
                    <div className="p-3 bg-crimson/10 border border-crimson/30">
                        <span className="text-crimson text-xs uppercase tracking-wider">Order Note:</span>
                        <p className="text-white text-sm mt-1">{order.notes}</p>
                    </div>
                </div>
            )}

            {/* Footer Actions */}
            <div className="p-4 border-t border-dark-gray bg-black/50 flex gap-2">
                {isNew && (
                    <button
                        onClick={() => onUpdateStatus(order.id, 'preparing')}
                        className="flex-1 py-3 bg-gold text-black font-semibold text-sm hover:bg-gold-light transition-all"
                    >
                        Start Preparing All
                    </button>
                )}
                {isPreparing && (
                    <button
                        onClick={() => onUpdateStatus(order.id, 'ready')}
                        className="flex-1 py-3 bg-green-500 text-black font-semibold text-sm hover:bg-green-400 transition-all"
                    >
                        Mark All Ready
                    </button>
                )}
                {isReady && (
                    <button
                        onClick={() => onUpdateStatus(order.id, 'completed')}
                        className="flex-1 py-3 bg-gray text-white font-semibold text-sm hover:bg-light-gray hover:text-black transition-all"
                    >
                        Complete Order
                    </button>
                )}
            </div>
        </motion.div>
    );
}
