'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OrderStatus } from '@/types/order';

interface OrderFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    statusFilter: OrderStatus | 'all';
    onStatusChange: (status: OrderStatus | 'all') => void;
    typeFilter: 'all' | 'dine-in' | 'takeaway';
    onTypeChange: (type: 'all' | 'dine-in' | 'takeaway') => void;
    dateRange: { start: Date; end: Date };
    onDateRangeChange: (range: { start: Date; end: Date }) => void;
    onExportPDF: () => void;
    onOpenMonthlyReports: () => void;
}

type DatePreset = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'lastMonth';

export default function OrderFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    typeFilter,
    onTypeChange,
    dateRange,
    onDateRangeChange,
    onExportPDF,
    onOpenMonthlyReports,
}: OrderFiltersProps) {
    const [datePreset, setDatePreset] = useState<DatePreset>('today');

    const handleDatePreset = (preset: DatePreset) => {
        setDatePreset(preset);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let start = new Date(today);
        let end = new Date(today);
        end.setHours(23, 59, 59, 999);

        switch (preset) {
            case 'today':
                break;
            case 'yesterday':
                start.setDate(start.getDate() - 1);
                end = new Date(start);
                end.setHours(23, 59, 59, 999);
                break;
            case 'thisWeek':
                start.setDate(start.getDate() - start.getDay());
                break;
            case 'thisMonth':
                start.setDate(1);
                break;
            case 'lastMonth':
                start.setMonth(start.getMonth() - 1);
                start.setDate(1);
                end = new Date(today.getFullYear(), today.getMonth(), 0);
                end.setHours(23, 59, 59, 999);
                break;
        }
        onDateRangeChange({ start, end });
    };

    const datePresets: { id: DatePreset; label: string }[] = [
        { id: 'today', label: '📅 Today' },
        { id: 'yesterday', label: '⏪ Yesterday' },
        { id: 'thisWeek', label: '📆 This Week' },
        { id: 'thisMonth', label: '🗓️ This Month' },
        { id: 'lastMonth', label: '📁 Last Month' },
    ];

    const statusOptions: { id: OrderStatus | 'all'; label: string; emoji: string; color: string }[] = [
        { id: 'all', label: 'All', emoji: '📋', color: 'from-gray-500/30 to-gray-600/20 border-gray-500/40 text-gray-300' },
        { id: 'new', label: 'New', emoji: '🆕', color: 'from-blue-500/30 to-blue-600/20 border-blue-500/40 text-blue-400' },
        { id: 'preparing', label: 'Preparing', emoji: '👨‍🍳', color: 'from-orange-500/30 to-orange-600/20 border-orange-500/40 text-orange-400' },
        { id: 'ready', label: 'Ready', emoji: '✅', color: 'from-green-500/30 to-green-600/20 border-green-500/40 text-green-400' },
        { id: 'completed', label: 'Completed', emoji: '🎉', color: 'from-emerald-500/30 to-emerald-600/20 border-emerald-500/40 text-emerald-400' },
        { id: 'cancelled', label: 'Cancelled', emoji: '❌', color: 'from-red-500/30 to-red-600/20 border-red-500/40 text-red-400' },
    ];

    return (
        <div className="p-4 bg-black/30 border-b border-dark-gray/50 space-y-4">
            {/* Search and Actions Row */}
            <div className="flex flex-wrap items-center gap-4">
                {/* Search Bar */}
                <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by order #, customer, or table..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-charcoal/80 rounded-xl border border-white/10 text-white placeholder:text-gray-500 focus:border-crimson/50 focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenMonthlyReports}
                    className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-gold/30 to-amber-600/20 border border-gold/40 text-gold rounded-xl font-semibold hover:from-gold/40 hover:to-amber-600/30 transition-all shadow-lg shadow-gold/10"
                >
                    📊 Monthly Reports
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onExportPDF}
                    className="flex items-center gap-2 px-5 py-3.5 bg-charcoal border border-white/20 text-gray-300 rounded-xl font-medium hover:bg-charcoal/80 hover:text-white transition-all"
                >
                    📄 Export PDF
                </motion.button>
            </div>

            {/* Date Range Picker */}
            <div className="flex flex-wrap items-center gap-2">
                {datePresets.map((preset) => (
                    <motion.button
                        key={preset.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDatePreset(preset.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${datePreset === preset.id
                                ? 'bg-gradient-to-r from-crimson to-crimson/80 text-white shadow-lg shadow-crimson/30'
                                : 'bg-charcoal/60 text-gray-400 hover:text-white hover:bg-charcoal border border-white/10'
                            }`}
                    >
                        {preset.label}
                    </motion.button>
                ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap items-center gap-2">
                {statusOptions.map((status) => (
                    <motion.button
                        key={status.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onStatusChange(status.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${statusFilter === status.id
                                ? `bg-gradient-to-r ${status.color}`
                                : 'bg-charcoal/40 border-transparent text-gray-500 hover:text-white hover:bg-charcoal/60'
                            }`}
                    >
                        <span>{status.emoji}</span>
                        {status.label}
                    </motion.button>
                ))}

                {/* Type Filter - Right side */}
                <div className="ml-auto flex items-center gap-1 bg-charcoal/60 rounded-xl p-1 border border-white/10">
                    {[
                        { id: 'all' as const, label: '🍽️ All' },
                        { id: 'dine-in' as const, label: '🪑 Dine-in' },
                        { id: 'takeaway' as const, label: '🥡 Takeaway' },
                    ].map((type) => (
                        <button
                            key={type.id}
                            onClick={() => onTypeChange(type.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${typeFilter === type.id
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
