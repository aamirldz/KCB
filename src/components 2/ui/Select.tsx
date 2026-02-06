'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, placeholder, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-text-secondary mb-2"
                    >
                        {label}
                        {props.required && <span className="text-imperial-red ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full bg-charcoal/80 border border-royal-gold/20 rounded-lg px-4 py-3 pr-10',
                            'text-text-primary appearance-none cursor-pointer',
                            'transition-all duration-300',
                            'hover:border-royal-gold/40',
                            'focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 focus:outline-none',
                            error && 'border-imperial-red focus:border-imperial-red focus:ring-imperial-red/20',
                            className
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value} className="bg-charcoal">
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
                {error && (
                    <p className="mt-2 text-sm text-imperial-red">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
