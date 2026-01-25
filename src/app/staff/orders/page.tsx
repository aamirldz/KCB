'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';
import { OrderStatus, ORDER_STATUS_CONFIG } from '@/types/order';
import { formatPrice, formatDate, formatTime } from '@/lib/utils';

export default function OrdersPage() {
    const router = useRouter();
    const { currentStaff, orders, updateOrderStatus } = useOrders();
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    useEffect(() => {
        if (!currentStaff) router.push('/staff');
    }, [currentStaff, router]);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            if (statusFilter !== 'all' && order.status !== statusFilter) return false;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!order.orderNumber.toString().includes(q) && !order.customerName?.toLowerCase().includes(q) && !order.tableNumber?.toLowerCase().includes(q)) {
                    return false;
                }
            }
            return true;
        });
    }, [orders, statusFilter, searchQuery]);

    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
    const todayRevenue = todayOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);

    const stats = {
        total: orders.length,
        new: orders.filter((o) => o.status === 'new').length,
        preparing: orders.filter((o) => o.status === 'preparing').length,
        ready: orders.filter((o) => o.status === 'ready').length,
        completed: orders.filter((o) => o.status === 'completed').length,
    };

    const selectedOrderData = orders.find(o => o.id === selectedOrder);

    if (!currentStaff) return null;

    return (
        <>
            {/* Spacer for fixed staff navbar */}
            <div className="h-24" />
            <div className="min-h-[calc(100vh-5rem)] flex flex-col">
                {/* Stats */}
                <div className="p-3 bg-black/30 border-b border-dark-gray">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        <div className="bg-charcoal/50 p-3 text-center">
                            <span className="text-white font-bold text-xl block">{todayOrders.length}</span>
                            <span className="text-gray text-xs">Today</span>
                        </div>
                        <div className="bg-charcoal/50 p-3 text-center">
                            <span className="text-gold font-bold text-xl block">{formatPrice(todayRevenue)}</span>
                            <span className="text-gray text-xs">Revenue</span>
                        </div>
                        <div className="bg-charcoal/50 p-3 text-center">
                            <span className="text-blue-400 font-bold text-xl block">{stats.new}</span>
                            <span className="text-gray text-xs">New</span>
                        </div>
                        <div className="bg-charcoal/50 p-3 text-center">
                            <span className="text-gold font-bold text-xl block">{stats.preparing}</span>
                            <span className="text-gray text-xs">Preparing</span>
                        </div>
                        <div className="bg-charcoal/50 p-3 text-center">
                            <span className="text-green-400 font-bold text-xl block">{stats.ready}</span>
                            <span className="text-gray text-xs">Ready</span>
                        </div>
                        <div className="bg-charcoal/50 p-3 text-center">
                            <span className="text-light-gray font-bold text-xl block">{stats.completed}</span>
                            <span className="text-gray text-xs">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-3 bg-black/20 border-b border-dark-gray flex items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 pl-9 bg-charcoal border border-gray/20 text-white text-sm placeholder-gray focus:border-crimson/50 outline-none"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="flex gap-1 overflow-x-auto flex-1 scrollbar-hide">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap ${statusFilter === 'all' ? 'bg-crimson text-white' : 'bg-charcoal text-gray'}`}
                        >
                            All ({stats.total})
                        </button>
                        {(Object.keys(ORDER_STATUS_CONFIG) as OrderStatus[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap ${statusFilter === status ? 'bg-crimson text-white' : 'bg-charcoal text-gray'}`}
                            >
                                {ORDER_STATUS_CONFIG[status].label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full">
                        <thead className="bg-charcoal/50 sticky top-0">
                            <tr>
                                <th className="text-left p-3 text-gray text-xs font-semibold">Order</th>
                                <th className="text-left p-3 text-gray text-xs font-semibold">Type</th>
                                <th className="text-left p-3 text-gray text-xs font-semibold">Items</th>
                                <th className="text-left p-3 text-gray text-xs font-semibold">Total</th>
                                <th className="text-left p-3 text-gray text-xs font-semibold">Status</th>
                                <th className="text-left p-3 text-gray text-xs font-semibold">Time</th>
                                <th className="text-left p-3 text-gray text-xs font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => setSelectedOrder(order.id)}
                                    className="border-t border-dark-gray/50 hover:bg-charcoal/30 cursor-pointer"
                                >
                                    <td className="p-3">
                                        <span className="text-white font-bold">#{order.orderNumber}</span>
                                        {order.customerName && <span className="text-gray text-xs block">{order.customerName}</span>}
                                    </td>
                                    <td className="p-3">
                                        <span className={`text-xs px-2 py-1 ${order.type === 'dine-in' ? 'bg-blue-500/20 text-blue-400' : 'bg-gold/20 text-gold'}`}>
                                            {order.type === 'dine-in' ? `🍽️ T${order.tableNumber}` : '📦 Take'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-light-gray text-sm">{order.items.reduce((s, i) => s + i.quantity, 0)} items</td>
                                    <td className="p-3 text-gold font-semibold text-sm">{formatPrice(order.total)}</td>
                                    <td className="p-3">
                                        <span className={`text-xs px-2 py-1 font-semibold ${order.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                                            order.status === 'preparing' ? 'bg-gold/20 text-gold' :
                                                order.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                                                    order.status === 'completed' ? 'bg-gray/20 text-gray' :
                                                        'bg-crimson/20 text-crimson'
                                            }`}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-3 text-light-gray text-sm">{formatTime(order.createdAt)}</td>
                                    <td className="p-3">
                                        <div className="flex gap-1">
                                            {order.status === 'ready' && (
                                                <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'completed'); }} className="px-2 py-1 text-xs bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white">
                                                    Complete
                                                </button>
                                            )}
                                            {!['cancelled', 'completed'].includes(order.status) && (
                                                <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'cancelled'); }} className="px-2 py-1 text-xs bg-crimson/20 text-crimson hover:bg-crimson hover:text-white">
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-16">
                            <span className="text-5xl block mb-3">📋</span>
                            <p className="text-white text-lg mb-1">No orders found</p>
                            <p className="text-gray text-sm">Try adjusting filters</p>
                        </div>
                    )}
                </div>

                {/* Order Modal */}
                <AnimatePresence>
                    {selectedOrder && selectedOrderData && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedOrder(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                className="bg-charcoal border border-dark-gray max-w-md w-full max-h-[80vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 border-b border-dark-gray flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Order #{selectedOrderData.orderNumber}</h3>
                                        <p className="text-gray text-xs">{formatTime(selectedOrderData.createdAt)} • {formatDate(selectedOrderData.createdAt)}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 font-semibold ${selectedOrderData.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                                        selectedOrderData.status === 'preparing' ? 'bg-gold/20 text-gold' :
                                            selectedOrderData.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                                                'bg-gray/20 text-gray'
                                        }`}>
                                        {selectedOrderData.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="p-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray text-xs">Type</span>
                                            <p className="text-white">{selectedOrderData.type === 'dine-in' ? '🍽️ Dine-in' : '📦 Takeaway'}</p>
                                        </div>
                                        {selectedOrderData.tableNumber && (
                                            <div>
                                                <span className="text-gray text-xs">Table</span>
                                                <p className="text-white">{selectedOrderData.tableNumber}</p>
                                            </div>
                                        )}
                                        {selectedOrderData.customerName && (
                                            <div>
                                                <span className="text-gray text-xs">Customer</span>
                                                <p className="text-white">{selectedOrderData.customerName}</p>
                                            </div>
                                        )}
                                        <div>
                                            <span className="text-gray text-xs">Created By</span>
                                            <p className="text-white">{selectedOrderData.createdBy}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-gray text-xs block mb-2">Items</span>
                                        {selectedOrderData.items.map((item) => (
                                            <div key={item.id} className="flex justify-between py-2 border-b border-dark-gray last:border-0">
                                                <span className="text-white">{item.quantity}× {item.name}</span>
                                                <span className="text-gold">{formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-3 border-t border-dark-gray">
                                        <div className="flex justify-between text-sm"><span className="text-gray">Subtotal</span><span className="text-white">{formatPrice(selectedOrderData.subtotal)}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-gray">Tax (5%)</span><span className="text-white">{formatPrice(selectedOrderData.tax)}</span></div>
                                        <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-dark-gray">
                                            <span className="text-white">Total</span>
                                            <span className="text-gold">{formatPrice(selectedOrderData.total)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-dark-gray">
                                    <button onClick={() => setSelectedOrder(null)} className="w-full py-2 bg-dark-gray text-white hover:bg-gray transition-colors">
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
