"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
    key: string;
    id: number;
    name: string;
    itemPrice: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (key: string, id: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    // Inicializa do localStorage se existir
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(i => i.key === item.key);

            if (existingItem) {
                return prevCart.map(i =>
                    i.key === item.key ? { ...i, quantity: i.quantity + 1 } : i
                );
            }

            return [...prevCart, { ...item, quantity: 1 }];

        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const removeFromCart = (key: string, id: number) => {
        setCart(prev => prev.filter(item => !(item.key === key && item.id === id)));
    };



    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.itemPrice * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}