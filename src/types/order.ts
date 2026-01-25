// Staff Order Management Types

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export type OrderType = 'dine-in' | 'takeaway';

export interface OrderItem {
    id: string;
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    spiceLevel: number;
    specialInstructions: string;
    isVeg: boolean;
    status: 'pending' | 'preparing' | 'ready';
}

export interface StaffOrder {
    id: string;
    orderNumber: number;
    type: OrderType;
    tableNumber?: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: OrderStatus;
    customerName?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    preparedAt?: Date;
    completedAt?: Date;
    createdBy: string; // Staff name
}

export interface StaffMember {
    id: string;
    name: string;
    role: 'staff' | 'kitchen' | 'manager';
    pin: string;
}

// Mock staff for demo
export const STAFF_MEMBERS: StaffMember[] = [
    { id: '1', name: 'Waiter 1', role: 'staff', pin: '1234' },
    { id: '2', name: 'Waiter 2', role: 'staff', pin: '2345' },
    { id: '3', name: 'Chef Wong', role: 'kitchen', pin: '3456' },
    { id: '4', name: 'Chef Kim', role: 'kitchen', pin: '4567' },
    { id: '5', name: 'Manager', role: 'manager', pin: '0000' },
];

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
    new: { label: 'New', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.2)' },
    preparing: { label: 'Preparing', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.2)' },
    ready: { label: 'Ready', color: '#22C55E', bgColor: 'rgba(34, 197, 94, 0.2)' },
    completed: { label: 'Completed', color: '#6B7280', bgColor: 'rgba(107, 114, 128, 0.2)' },
    cancelled: { label: 'Cancelled', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.2)' },
};
