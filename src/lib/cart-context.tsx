"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product, ProductSize } from "./mock-data";

export type CartItem = {
  productId: string;
  product: Product;
  size: ProductSize;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (productId: string, sizeLabel: string) => void;
  updateQuantity: (productId: string, sizeLabel: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (product: Product, size: ProductSize, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === product.id && i.size.label === size.label
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === product.id && i.size.label === size.label
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { productId: product.id, product, size, quantity }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, sizeLabel: string) => {
      setItems((prev) =>
        prev.filter(
          (i) => !(i.productId === productId && i.size.label === sizeLabel)
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, sizeLabel: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, sizeLabel);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size.label === sizeLabel
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.size.price * i.quantity, 0);

  return (
    <CartContext value={{
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }}>
      {children}
    </CartContext>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
