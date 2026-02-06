'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StaffOrder as Order } from '@/types/order';
import { formatPrice } from '@/lib/utils';

interface OrderStatsProps {
    orders: Order[];
    dateRange: { start: Date; end: Date };
    onStatClick?: (filter: string) => void;
}

export default function OrderStats({ orders, dateRange, onStatClick }: OrderStatsProps) {
    // Filter orders by date range
    const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= dateRange.start && orderDate <= dateRange.end;
    });

    const completedOrders = filteredOrders.filter((o) => o.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

    const stats = [
        {
            id: 'total',
            label: 'Total Orders',
            value: filteredOrders.length,
            icon: '📋',
            color: 'from-blue-500/20 to-blue-600/10',
            borderColor: 'border-blue-500/30',
            textColor: 'text-blue-400',
        },
        {
            id: 'revenue',
            label: 'Revenue',
            value: formatPrice(totalRevenue),
            icon: '💰',
            color: 'from-gold/20 to-amber-600/10',
            borderColor: 'border-gold/30',
            textColor: 'text-gold',
        },
        {
            id: 'avg',
            label: 'Avg Order',
            value: formatPrice(avgOrderValue),
            icon: '📊',
            color: 'from-purple-500/20 to-purple-600/10',
            borderColor: 'border-purple-500/30',
            textColor: 'text-purple-400',
        },
        {
            id: 'new',
            label: 'New',
            value: filteredOrders.filter((o) => o.status === 'new').length,
            icon: '🆕',
            color: 'from-cyan-500/20 to-cyan-600/10',
            borderColor: 'border-cyan-500/30',
            textColor: 'text-cyan-400',
        },
        {
            id: 'preparing',
            label: 'Preparing',
            value: filteredOrders.filter((o) => o.status === 'preparing').length,
            icon: '👨‍🍳',
            color: 'from-orange-500/20 to-orange-600/10',
            borderColor: 'border-orange-500/30',
            textColor: 'text-orange-400',
        },
        {
            id: 'ready',
            label: 'Ready',
            value: filteredOrders.filter((o) => o.status === 'ready').length,
            icon: '✅',
            color: 'from-green-500/20 to-green-600/10',
            borderColor: 'border-green-500/30',
            textColor: 'text-green-400',
        },
        {
            id: 'completed',
            label: 'Completed',
            value: completedOrders.length,
            icon: '🎉',
            color: 'from-emerald-500/20 to-emerald-600/10',
            borderColor: 'border-emerald-500/30',
            textColor: 'text-emerald-400',
        },
        {
            id: 'cancelled',
            label: 'Cancelled',
            value: filteredOrders.filter((o) => o.status === 'cancelled').length,
            icon: '❌',
            color: 'from-red-500/20 to-red-600/10',
            borderColor: 'border-red-500/30',
            textColor: 'text-red-400',
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 p-4">
            {stats.map((stat, index) => (
                <motion.button
                    key={stat.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStatClick?.(stat.id)}
                    className={`relative overflow-hidden bg-gradient-to-br ${stat.color} backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-4 text-center hover:shadow-lg hover:shadow-${stat.id === 'revenue' ? 'gold' : stat.textColor.replace('text-', '')}/20 transition-all duration-300 group`}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    {/* Icon */}
                    <motion.div
                        className="text-3xl mb-2"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                    >
                        {stat.icon}
                    </motion.div>

                    {/* Value */}
                    <motion.p
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.1, type: 'spring' }}
                        className={`text-2xl font-bold ${stat.textColor} mb-1`}
                    >
                        {stat.value}
                    </motion.p>

                    {/* Label */}
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                </motion.button>
            ))}
        </div>
    );
}
