'use client';

import React from 'react';

interface BadgeProps {
    children?: React.ReactNode;
    variant?: 'veg' | 'nonveg' | 'popular' | 'chef-special' | 'new';
}

export default function Badge({ children, variant = 'popular' }: BadgeProps) {
    if (variant === 'veg') {
        return <div className="badge-veg" title="Vegetarian" />;
    }

    if (variant === 'nonveg') {
        return <div className="badge-nonveg" title="Non-Vegetarian" />;
    }

    const variants = {
        popular: 'badge badge-popular',
        'chef-special': 'badge badge-special',
        new: 'badge badge-new',
    };

    return <span className={variants[variant]}>{children}</span>;
}
