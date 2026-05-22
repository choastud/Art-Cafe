'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Coffee, Flame, Heart, Sparkles, MapPin } from 'lucide-react';

export default function About() {
  return (
    <main style={{ paddingBottom: '5rem' }}>
      {/* Editorial Header */}
      <section className="section" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="handwritten" style={{ fontSize: '1.6rem' }}>Our Chronicle</span>
            <h1 style={{ fontSize: '3.5rem', marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
              Where Coffee Meets Canvas
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Brew & Brush was founded on a rainy morning with a simple sketch and a steaming latte. We wanted to build a sanctuary where coffee isn't rushed, and canvases are never empty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Image Grid */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: '5rem 2rem' }}>
        <div className="scrapbook-layout" style={{ gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>A Sanctuary for the Restless Mind</h2>
            <p style={{ marginBottom: '1.2rem' }}>
              In today's fast-paced world, we noticed spaces are built for high turnover. Espresso bars force you to grab a cup and go. Digital workspaces demand instant production. At Brew & Brush, we decided to push against the grain.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              We encourage you to unpack your journals, dip your brushes in water, and watch the shadows crawl across the wooden tables. Every desk features drawing sketchpads, watercolors, brushes, and desk lamps to set the perfect mood.
            </p>
            <p>
              Whether you are a seasoned illustrator, a poet writing your next line, or a friend sharing a quiet evening, our doors and palettes are open for you.
            </p>
          </motion.div>

          <motion.div
            className="scrapbook-stickers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="about-image-card" style={{ transform: 'rotate(2deg)' }}>
              <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                <Image
                  src="/assets/art_cafe_interior.png"
                  alt="Cozy Art Cafe Interior"
                  fill
                  style={{ objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
              <div className="about-image-caption">
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>Inside Brew & Brush</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Vasavi Signature, Hyderabad</p>
                </div>
                <span className="handwritten" style={{ transform: 'rotate(-4deg)' }}>Cozy Corners</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sourcing & Beans Philosophy */}
      <section className="section" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textSelf: 'center', textAlign: 'center', marginBottom: '4rem' }}>
            <span className="handwritten">Specialty Craft</span>
            <h2>Our Daily Bean Roast</h2>
            <p>We approach coffee roasting with the same precision and passion as canvas drawing.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}>
            {/* Roast Card 1 */}
            <motion.div
              style={{
                background: 'var(--card-white)',
                padding: '2.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(42, 26, 20, 0.05)',
                boxShadow: 'var(--shadow-sm)'
              }}
              whileHover={{ y: -5 }}
            >
              <div style={{ background: 'rgba(200,107,81,0.08)', width: '50px', height: '50px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Flame style={{ color: 'var(--accent-terracotta)', width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: '700', fontSize: '1.25rem', marginBottom: '0.8rem' }}>Daily Micro-Roasting</h3>
              <p style={{ fontSize: '0.95rem' }}>
                We roast in small 5kg batches every morning. This ensures that the delicate floral notes and rich chocolate undertones of each single-origin bean are kept perfectly intact.
              </p>
            </motion.div>

            {/* Roast Card 2 */}
            <motion.div
              style={{
                background: 'var(--card-white)',
                padding: '2.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(42, 26, 20, 0.05)',
                boxShadow: 'var(--shadow-sm)'
              }}
              whileHover={{ y: -5 }}
            >
              <div style={{ background: 'rgba(168,140,108,0.08)', width: '50px', height: '50px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Coffee style={{ color: 'var(--accent-gold)', width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: '700', fontSize: '1.25rem', marginBottom: '0.8rem' }}>Ethical Direct Sourcing</h3>
              <p style={{ fontSize: '0.95rem' }}>
                We buy our beans directly from sustainable, family-owned organic farms in Araku Valley, Ethiopia, and Colombia, paying 35% above fair-trade standard prices.
              </p>
            </motion.div>

            {/* Roast Card 3 */}
            <motion.div
              style={{
                background: 'var(--card-white)',
                padding: '2.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(42, 26, 20, 0.05)',
                boxShadow: 'var(--shadow-sm)'
              }}
              whileHover={{ y: -5 }}
            >
              <div style={{ background: 'rgba(42,26,20,0.05)', width: '50px', height: '50px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Sparkles style={{ color: 'var(--text-primary)', width: '24px', height: '24px' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: '700', fontSize: '1.25rem', marginBottom: '0.8rem' }}>Watercolor Water Tech</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Our brewing water is reverse-osmosis filtered and remineralized to an exact pH balance. It provides clean notes for extraction and mixes beautifully with our workspace paint kits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
