'use client';

import React from 'react';
import { OrderStatus, ORDER_STATUS_CONFIG } from '@/types/order';

interface OrderStatusBadgeProps {
    status: OrderStatus;
    size?: 'sm' | 'md' | 'lg';
}

export default function OrderStatusBadge({ status, size = 'md' }: OrderStatusBadgeProps) {
    const config = ORDER_STATUS_CONFIG[status];

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    return (
        <span
            className={`inline-flex items-center font-semibold uppercase tracking-wider ${sizes[size]}`}
            style={{
                backgroundColor: config.bgColor,
                color: config.color,
                border: `1px solid ${config.color}`,
            }}
        >
            {config.label}
        </span>
    );
}
