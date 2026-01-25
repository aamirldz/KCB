'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, Cart } from '@/types/cart';
import { MenuItem, SpiceLevel } from '@/types/menu';
import { generateId } from '@/lib/utils';

const TAX_RATE = 0.05; // 5% GST
const DELIVERY_FEE = 50;

interface CartContextType {
    cart: Cart;
    addToCart: (item: MenuItem, quantity?: number, spiceLevel?: SpiceLevel, instructions?: string) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    updateSpiceLevel: (cartItemId: string, spiceLevel: SpiceLevel) => void;
    updateInstructions: (cartItemId: string, instructions: string) => void;
    clearCart: () => void;
    itemCount: number;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'UPDATE_SPICE'; payload: { id: string; spiceLevel: SpiceLevel } }
    | { type: 'UPDATE_INSTRUCTIONS'; payload: { id: string; instructions: string } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

const calculateTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
    const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
    const total = subtotal + tax + deliveryFee;
    return { subtotal, tax, deliveryFee, total };
};

const cartReducer = (state: Cart, action: CartAction): Cart => {
    let newItems: CartItem[];

    switch (action.type) {
        case 'ADD_ITEM':
            // Check if item with same menu item and spice level exists
            const existingIndex = state.items.findIndex(
                item =>
                    item.menuItem.id === action.payload.menuItem.id &&
                    item.spiceLevel === action.payload.spiceLevel
            );

            if (existingIndex >= 0) {
                newItems = state.items.map((item, index) =>
                    index === existingIndex
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                newItems = [...state.items, action.payload];
            }
            return { items: newItems, ...calculateTotals(newItems) };

        case 'REMOVE_ITEM':
            newItems = state.items.filter(item => item.id !== action.payload);
            return { items: newItems, ...calculateTotals(newItems) };

        case 'UPDATE_QUANTITY':
            if (action.payload.quantity <= 0) {
                newItems = state.items.filter(item => item.id !== action.payload.id);
            } else {
                newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );
            }
            return { items: newItems, ...calculateTotals(newItems) };

        case 'UPDATE_SPICE':
            newItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, spiceLevel: action.payload.spiceLevel }
                    : item
            );
            return { items: newItems, ...calculateTotals(newItems) };

        case 'UPDATE_INSTRUCTIONS':
            newItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, specialInstructions: action.payload.instructions }
                    : item
            );
            return { items: newItems, ...calculateTotals(newItems) };

        case 'CLEAR_CART':
            return { items: [], subtotal: 0, tax: 0, deliveryFee: 0, total: 0 };

        case 'LOAD_CART':
            return { items: action.payload, ...calculateTotals(action.payload) };

        default:
            return state;
    }
};

const initialCart: Cart = {
    items: [],
    subtotal: 0,
    tax: 0,
    deliveryFee: 0,
    total: 0,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('kcb-cart');
        if (savedCart) {
            try {
                const parsedItems = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedItems });
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('kcb-cart', JSON.stringify(cart.items));
    }, [cart.items]);

    const addToCart = (
        item: MenuItem,
        quantity: number = 1,
        spiceLevel: SpiceLevel = item.spiceLevel,
        instructions: string = ''
    ) => {
        const cartItem: CartItem = {
            id: generateId(),
            menuItem: item,
            quantity,
            spiceLevel,
            specialInstructions: instructions,
        };
        dispatch({ type: 'ADD_ITEM', payload: cartItem });
    };

    const removeFromCart = (cartItemId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: cartItemId });
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: cartItemId, quantity } });
    };

    const updateSpiceLevel = (cartItemId: string, spiceLevel: SpiceLevel) => {
        dispatch({ type: 'UPDATE_SPICE', payload: { id: cartItemId, spiceLevel } });
    };

    const updateInstructions = (cartItemId: string, instructions: string) => {
        dispatch({ type: 'UPDATE_INSTRUCTIONS', payload: { id: cartItemId, instructions } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateSpiceLevel,
                updateInstructions,
                clearCart,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
