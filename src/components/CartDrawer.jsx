'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { Coffee, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, cartTotal, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`☕ Order Received! Table preps under way for $${cartTotal.toFixed(2)}. Draw at the table while you wait!`);
    clearCart();
    setCartOpen(false);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#2A1A14',
              backdropFilter: 'blur(8px)',
              zIndex: 1999,
            }}
          />

          {/* Slide-in Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
            className="cart-drawer open"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '400px',
              height: '100%',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="cart-header">
              <h3>Serving Tray</h3>
              <button
                className="btn-close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Close tray"
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <Coffee style={{ color: 'var(--accent-gold)', width: '40px', height: '40px', margin: '0 auto 0.8rem auto' }} />
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.6rem', marginTop: '0.5rem' }}>Tray is empty...</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div
                      className="cart-item-img"
                      style={{ backgroundImage: `url('${item.img}')` }}
                    />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      {item.desc && (
                        <p style={{
                          fontSize: '0.72rem',
                          lineHeight: '1.25',
                          color: 'var(--text-secondary)',
                          fontWeight: 'normal',
                          marginBottom: '0.2rem'
                        }}>
                          {item.desc}
                        </p>
                      )}
                      <p>${item.price.toFixed(2)} {item.quantity > 1 ? `x ${item.quantity}` : ''}</p>
                    </div>
                    <button
                      className="btn-remove-item"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Tray Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                className="btn-checkout"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Order from Table
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
