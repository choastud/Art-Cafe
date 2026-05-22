'use client';

import React from 'react';
import Link from 'next/link';
import { Palette, Mail } from 'lucide-react';

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our weekly journal!');
    e.target.reset();
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-col">
          <h4 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            color: 'var(--text-primary)',
            textTransform: 'none',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Palette style={{ color: 'var(--accent-terracotta)', width: '22px', height: '22px' }} />
            Brew & Brush
          </h4>
          <p>A neighborhood space where specialty coffee craft and art workspaces blend together. Grab a cup, grab a brush, and start creating.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="Pinterest" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', fontFamily: 'var(--font-sans)' }}>P</span>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Opening Hours</h4>
          <p style={{ marginBottom: '0.5rem' }}><strong>Mon - Fri:</strong> 7:00 AM - 8:00 PM</p>
          <p style={{ marginBottom: '0.5rem' }}><strong>Sat - Sun:</strong> 8:00 AM - 9:00 PM</p>
          <p style={{
            color: 'var(--accent-terracotta)',
            fontWeight: 700,
            fontFamily: 'var(--font-hand)',
            fontSize: '1.3rem',
            marginTop: '1rem'
          }}>
            Jazz Sketches: Daily 4PM - 6PM
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Explore</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}><Link href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Story & Vibe</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link href="/team" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Meet the Team</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link href="/hiring" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Careers / Hiring</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Collaborations</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Weekly Journal</h4>
          <p>Receive recipes, event updates, and creative writing prompts directly in your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="dreamer@email.com"
              className="newsletter-input"
              required
              aria-label="Email address"
            />
            <button type="submit" className="newsletter-submit">Join</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Brew & Brush Art Café. Made with love for artists & dreamers.</p>
      </div>
    </footer>
  );
}
