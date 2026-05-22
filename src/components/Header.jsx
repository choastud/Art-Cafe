'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette, Coffee, ShoppingBasket, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Story', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Hiring', path: '/hiring' },
    { name: 'Collaborations', path: '/contact' },
  ];

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <Palette style={{ color: 'var(--accent-terracotta)', width: '24px', height: '24px' }} />
            Brew & <span>Brush</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-only" style={{ display: 'block' }}>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className={pathname === link.path ? 'active' : ''}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <div className="hanging-sign desktop-only">
              <Coffee style={{ width: '16px', height: '16px', color: 'var(--accent-terracotta)' }} />
              Open Daily
            </div>

            <button
              className="cart-toggle"
              onClick={() => setCartOpen(true)}
              aria-label="Open serving tray"
            >
              <ShoppingBasket style={{ width: '18px', height: '18px' }} />
              <span className="desktop-only">Tray</span>
              <span className="cart-count">{cartCount}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'none', // Styled responsive in CSS
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem',
              }}
            >
              {mobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              width: '100%',
              backgroundColor: 'var(--bg-primary)',
              borderBottom: '1px solid rgba(42, 26, 20, 0.08)',
              boxShadow: 'var(--shadow-md)',
              zIndex: 999,
              padding: '1.5rem 2rem',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    style={{
                      textDecoration: 'none',
                      color: pathname === link.path ? 'var(--accent-terracotta)' : 'var(--text-secondary)',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      display: 'block',
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styled JSX for Responsive displaying */}
      <style jsx global>{`
        @media (max-width: 992px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
