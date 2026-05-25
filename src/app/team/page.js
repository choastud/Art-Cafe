'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Coffee, Palette, Compass, Heart, Award } from 'lucide-react';

const teamMembers = [
  {
    name: 'Hema Sree',
    role: 'Co-founder & Chief Barista',
    bio: 'Hema Sree co-founded Brew & Brush with a passion for specialty coffee craft. She calibrates our daily house roasts, teaches the Latte Art Pouring workshops, and handles the espresso bar extraction with absolute precision.',
    icon: Coffee,
    color: 'rgba(200, 107, 81, 0.08)',
    accent: 'var(--accent-terracotta)',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Maithri',
    role: 'Creative Art Director',
    bio: 'Maithri oversees our studio palettes, curates the gallery walls, and designs our weekly watercolor prompt boards. She teaches watercolor blending classes and makes sure our workspaces are always stocked with rich colors.',
    icon: Palette,
    color: 'rgba(168, 140, 108, 0.08)',
    accent: 'var(--accent-gold)',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Geetha',
    role: 'Guest Experience Manager',
    bio: 'Geetha handles the cozy, welcoming vibes at Brew & Brush. She oversees seating layout comfort, organizes our evening candlelit poetry read-outs, acoustic jazz gigs, and ensures every visitor feels at home.',
    icon: Compass,
    color: 'rgba(42, 26, 20, 0.05)',
    accent: 'var(--text-primary)',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  }
];

export default function Team() {
  return (
    <main style={{ paddingBottom: '6rem', position: 'relative' }}>
      {/* Decorative background coffee rings */}
      <div className="coffee-ring" style={{ top: '8%', right: '-80px', transform: 'scale(1.1) rotate(-15deg)' }}></div>
      <div className="coffee-ring" style={{ top: '60%', left: '-100px', transform: 'scale(1.0) rotate(35deg)' }}></div>

      {/* Header */}
      <section className="page-hero">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="handwritten" style={{ fontSize: '1.6rem' }}>The Curators</span>
            <h1>
              Meet Our <span>Team</span>
            </h1>
            <p>
              The dreamers and makers behind your favorite specialty coffee, studio workspace, and cozy community evenings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ padding: '2rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem'
        }}>
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{
                  background: 'var(--card-white)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid rgba(42, 26, 20, 0.05)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                whileHover={{ y: -6 }}
              >
                {/* Photo Header */}
                <div style={{ position: 'relative', width: '100%', height: '340px' }}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: member.accent,
                    color: '#fff',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    <IconComponent style={{ width: '20px', height: '20px' }} />
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '0.2rem' }}>
                    {member.name}
                  </h2>
                  <span style={{
                    color: member.accent,
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '1rem',
                    display: 'block'
                  }}>
                    {member.role}
                  </span>
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                    flexGrow: 1
                  }}>
                    {member.bio}
                  </p>
                  
                  <div style={{
                    marginTop: '1.5rem',
                    borderTop: '1px dashed rgba(42, 26, 20, 0.08)',
                    paddingTop: '1.2rem',
                    display: 'flex',
                    gap: '0.8rem',
                    alignItems: 'center'
                  }}>
                    <Award style={{ width: '16px', height: '16px', color: 'var(--accent-gold)' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                      Verified Community Leader
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
