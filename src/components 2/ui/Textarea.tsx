'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, helperText, className, id, ...props }, ref) => {
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
                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full bg-charcoal/80 border border-royal-gold/20 rounded-lg px-4 py-3',
                        'text-text-primary placeholder:text-text-muted',
                        'transition-all duration-300 resize-none',
                        'hover:border-royal-gold/40',
                        'focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 focus:outline-none',
                        error && 'border-imperial-red focus:border-imperial-red focus:ring-imperial-red/20',
                        className
                    )}
                    rows={4}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-imperial-red">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-2 text-sm text-text-muted">{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
