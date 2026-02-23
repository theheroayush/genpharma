import { createContext, useContext, useState, ReactNode } from "react";
import type { Order } from "@/types";
import { seedOrders } from "@/data/seedData";

interface OrderContextType {
    orders: Order[];
    updateOrder: (id: string, updates: Partial<Order>) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrders must be used within an OrderProvider");
    }
    return context;
}

export function OrderProvider({ children }: { children: ReactNode }) {
    // Initialize with seed data in memory (not localStorage)
    const [orders, setOrders] = useState<Order[]>(seedOrders);

    const updateOrder = (id: string, updates: Partial<Order>) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, ...updates } : order
            )
        );
    };

    return (
        <OrderContext.Provider value={{ orders, updateOrder }}>
            {children}
        </OrderContext.Provider>
    );
}
