// Validation patterns and constants

export const VALIDATION = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[6-9]\d{9}$/,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_PARTY_SIZE: 1,
    MAX_PARTY_SIZE: 20,
} as const;

// Restaurant operating hours
export const OPERATING_HOURS = {
    OPEN: 11, // 11 AM
    CLOSE: 26, // 2 AM next day (26 = 24 + 2)
    TIMEZONE: 'Asia/Kolkata',
} as const;

// Contact information
export const CONTACT = {
    PHONE: '+91 75084 50221',
    EMAIL: 'info@kingchinesebowl.com',
    ADDRESS: 'Sector 68, Mohali, Punjab 160062',
    MAPS_URL: 'https://maps.google.com/?q=ALC+Group+Sector+68+Mohali',
} as const;

// Social media links
export const SOCIAL = {
    INSTAGRAM: 'https://instagram.com/kingchinesebowl',
    FACEBOOK: 'https://facebook.com/kingchinesebowl',
    WHATSAPP: 'https://wa.me/917508450221',
} as const;

// Pricing constants
export const TAX_RATE = 0.05; // 5% GST
export const DELIVERY_FEE = 50;
export const FREE_DELIVERY_THRESHOLD = 500;
export const SERVICE_CHARGE_RATE = 0.0; // No service charge

export const PRICING = {
    DELIVERY_FEE,
    FREE_DELIVERY_THRESHOLD,
    TAX_RATE,
    SERVICE_CHARGE_RATE,
} as const;

// Storage keys for localStorage
export const STORAGE_KEYS = {
    CART: 'kcb_cart',
    ORDER: 'kcb_order',
    USER_PREFERENCES: 'kcb_user_prefs',
    SOUND_ENABLED: 'kcb_sound_enabled',
} as const;

// Timing constants
export const TIMING = {
    DEBOUNCE_DELAY: 300,
    TOAST_DURATION: 3000,
    ANIMATION_DURATION: 300,
    ORDER_REFRESH_INTERVAL: 30000, // 30 seconds
    SOUND_COOLDOWN: 500,
} as const;

// Navigation links
export const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/order', label: 'Order' },
    { href: '/reservation', label: 'Reserve' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
] as const;
