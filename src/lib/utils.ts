import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getSpiceLevelLabel(level: number): string {
    switch (level) {
        case 0: return 'No Spice';
        case 1: return 'Mild';
        case 2: return 'Medium';
        case 3: return 'Hot';
        default: return 'Mild';
    }
}

export function getSpiceLevelEmoji(level: number): string {
    switch (level) {
        case 0: return '';
        case 1: return '🌶️';
        case 2: return '🌶️🌶️';
        case 3: return '🌶️🌶️🌶️';
        default: return '🌶️';
    }
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

export function getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    return maxDate.toISOString().split('T')[0];
}

export function formatTime(date: Date): string {
    return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(new Date(date));
}
