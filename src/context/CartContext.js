'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Calculate total count and total price
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartCount(count);
    setCartTotal(total);
  }, [cart]);

  const addToCart = (name, price, img, isCustom = false, desc = '') => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.name === name && item.isCustom === isCustom && item.desc === desc
      );
      if (existing && !isCustom) {
        return prevCart.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name,
            price,
            img: img || 'https://images.unsplash.com/photo-151097252790b-af4f42df8e40?auto=format&fit=crop&q=80&w=100',
            quantity: 1,
            isCustom,
            desc,
          },
        ];
      }
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
