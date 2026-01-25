'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { StaffOrder, OrderItem, OrderStatus, StaffMember, OrderType } from '@/types/order';
import { MenuItem } from '@/types/menu';
import { generateId } from '@/lib/utils';

interface OrderContextType {
    orders: StaffOrder[];
    currentStaff: StaffMember | null;
    orderCounter: number;

    // Auth
    login: (staff: StaffMember) => void;
    logout: () => void;

    // Order Management
    createOrder: (items: OrderItem[], type: OrderType, tableNumber?: string, customerName?: string, notes?: string) => StaffOrder;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    updateItemStatus: (orderId: string, itemId: string, status: OrderItem['status']) => void;
    cancelOrder: (orderId: string) => void;

    // Filtered Orders
    getOrdersByStatus: (statuses: OrderStatus[]) => StaffOrder[];
    getActiveOrders: () => StaffOrder[];
    getKitchenOrders: () => StaffOrder[];

    // New order notification
    newOrderAlert: boolean;
    clearNewOrderAlert: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'kcb-staff-orders';
const STAFF_KEY = 'kcb-current-staff';
const COUNTER_KEY = 'kcb-order-counter';

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<StaffOrder[]>([]);
    const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null);
    const [orderCounter, setOrderCounter] = useState(1);
    const [newOrderAlert, setNewOrderAlert] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const prevOrderCount = useRef(0);

    // Load from localStorage
    useEffect(() => {
        const savedOrders = localStorage.getItem(STORAGE_KEY);
        const savedStaff = localStorage.getItem(STAFF_KEY);
        const savedCounter = localStorage.getItem(COUNTER_KEY);

        if (savedOrders) {
            const parsed = JSON.parse(savedOrders);
            // Convert date strings back to Date objects
            const ordersWithDates = parsed.map((order: StaffOrder) => ({
                ...order,
                createdAt: new Date(order.createdAt),
                updatedAt: new Date(order.updatedAt),
                preparedAt: order.preparedAt ? new Date(order.preparedAt) : undefined,
                completedAt: order.completedAt ? new Date(order.completedAt) : undefined,
            }));
            setOrders(ordersWithDates);
            prevOrderCount.current = ordersWithDates.length;
        }

        if (savedStaff) {
            setCurrentStaff(JSON.parse(savedStaff));
        }

        if (savedCounter) {
            setOrderCounter(parseInt(savedCounter, 10));
        }

        setIsHydrated(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
        }
    }, [orders, isHydrated]);

    useEffect(() => {
        if (isHydrated && currentStaff) {
            localStorage.setItem(STAFF_KEY, JSON.stringify(currentStaff));
        }
    }, [currentStaff, isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(COUNTER_KEY, orderCounter.toString());
        }
    }, [orderCounter, isHydrated]);

    // Alert for new orders (for kitchen view)
    useEffect(() => {
        if (orders.length > prevOrderCount.current) {
            setNewOrderAlert(true);
            // Play sound
            if (typeof window !== 'undefined') {
                try {
                    const audio = new Audio('/notification.mp3');
                    audio.volume = 0.5;
                    audio.play().catch(() => { });
                } catch { }
            }
        }
        prevOrderCount.current = orders.length;
    }, [orders.length]);

    const login = useCallback((staff: StaffMember) => {
        setCurrentStaff(staff);
    }, []);

    const logout = useCallback(() => {
        setCurrentStaff(null);
        localStorage.removeItem(STAFF_KEY);
    }, []);

    const createOrder = useCallback((
        items: OrderItem[],
        type: OrderType,
        tableNumber?: string,
        customerName?: string,
        notes?: string
    ): StaffOrder => {
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        const newOrder: StaffOrder = {
            id: generateId(),
            orderNumber: orderCounter,
            type,
            tableNumber,
            items,
            subtotal,
            tax,
            total,
            status: 'new',
            customerName,
            notes,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: currentStaff?.name || 'Unknown',
        };

        setOrders((prev) => [newOrder, ...prev]);
        setOrderCounter((prev) => prev + 1);

        return newOrder;
    }, [orderCounter, currentStaff]);

    const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
        setOrders((prev) =>
            prev.map((order) => {
                if (order.id === orderId) {
                    const updates: Partial<StaffOrder> = {
                        status,
                        updatedAt: new Date(),
                    };

                    if (status === 'ready') {
                        updates.preparedAt = new Date();
                    }
                    if (status === 'completed') {
                        updates.completedAt = new Date();
                    }

                    return { ...order, ...updates };
                }
                return order;
            })
        );
    }, []);

    const updateItemStatus = useCallback((orderId: string, itemId: string, status: OrderItem['status']) => {
        setOrders((prev) =>
            prev.map((order) => {
                if (order.id === orderId) {
                    const updatedItems = order.items.map((item) =>
                        item.id === itemId ? { ...item, status } : item
                    );

                    // Check if all items are ready
                    const allReady = updatedItems.every((item) => item.status === 'ready');
                    const anyPreparing = updatedItems.some((item) => item.status === 'preparing');

                    return {
                        ...order,
                        items: updatedItems,
                        status: allReady ? 'ready' : anyPreparing ? 'preparing' : order.status,
                        updatedAt: new Date(),
                    };
                }
                return order;
            })
        );
    }, []);

    const cancelOrder = useCallback((orderId: string) => {
        updateOrderStatus(orderId, 'cancelled');
    }, [updateOrderStatus]);

    const getOrdersByStatus = useCallback((statuses: OrderStatus[]) => {
        return orders.filter((order) => statuses.includes(order.status));
    }, [orders]);

    const getActiveOrders = useCallback(() => {
        return orders.filter((order) =>
            ['new', 'preparing', 'ready'].includes(order.status)
        );
    }, [orders]);

    const getKitchenOrders = useCallback(() => {
        return orders.filter((order) =>
            ['new', 'preparing'].includes(order.status)
        ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }, [orders]);

    const clearNewOrderAlert = useCallback(() => {
        setNewOrderAlert(false);
    }, []);

    return (
        <OrderContext.Provider
            value={{
                orders,
                currentStaff,
                orderCounter,
                login,
                logout,
                createOrder,
                updateOrderStatus,
                updateItemStatus,
                cancelOrder,
                getOrdersByStatus,
                getActiveOrders,
                getKitchenOrders,
                newOrderAlert,
                clearNewOrderAlert,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}
