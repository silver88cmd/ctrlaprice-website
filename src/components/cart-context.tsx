"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CartProduct = {
  itemNumber: string;
  name: string;
  brand: string;
  sellingPrice: number | null;
};

type CartContextValue = {
  items: CartProduct[];
  addProduct: (product: CartProduct) => void;
  removeProduct: (itemNumber: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartProduct[]>([]);

  const value = useMemo(
    () => ({
      items,
      addProduct: (product: CartProduct) => {
        setItems((current) =>
          current.some((item) => item.itemNumber === product.itemNumber)
            ? current
            : [...current, product]
        );
      },
      removeProduct: (itemNumber: string) => {
        setItems((current) =>
          current.filter((item) => item.itemNumber !== itemNumber)
        );
      },
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
