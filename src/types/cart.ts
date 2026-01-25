import { MenuItem, SpiceLevel } from './menu';

export interface CartItem {
    id: string;
    menuItem: MenuItem;
    quantity: number;
    spiceLevel: SpiceLevel;
    specialInstructions: string;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
}

export type DeliveryType = 'delivery' | 'pickup';

export interface CustomerDetails {
    fullName: string;
    phone: string;
    email: string;
    deliveryType: DeliveryType;
    address?: string;
    city?: string;
    pincode?: string;
    landmark?: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    customer: CustomerDetails;
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
    createdAt: Date;
}
