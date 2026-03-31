import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string; // usually listing id
  farmerId: string;
  farmerName: string;
  village: string;
  name: string;
  pricePerKg: number;
  quantityKg: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  itemsByFarmer: Record<string, CartItem[]>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('agro_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('agro_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === newItem.id);
      if (existing) {
        return prev.map(i => i.id === newItem.id ? { ...i, quantityKg: i.quantityKg + newItem.quantityKg } : i);
      }
      return [...prev, newItem];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQ = Math.max(0.5, i.quantityKg + delta);
        return { ...i, quantityKg: newQ };
      }
      return i;
    }));
  };

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantityKg, 0);
  
  // BigBasket UX: Grouping carts by seller
  const itemsByFarmer = items.reduce((acc, item) => {
    if (!acc[item.farmerId]) acc[item.farmerId] = [];
    acc[item.farmerId].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, itemsByFarmer }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
