'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, Calendar } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Collaboration / Gallery Proposal',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate submission
    console.log('Collaboration submitted:', formData);
    alert(`☕ Hello, ${formData.name}! Your message regarding "${formData.subject}" has been delivered. Hema Sree and our team will get in touch with you shortly.`);
    setFormData({ name: '', email: '', subject: 'Collaboration / Gallery Proposal', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <section className="section" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="handwritten" style={{ fontSize: '1.6rem' }}>Reach Out</span>
            <h1 style={{ fontSize: '3.5rem', marginTop: '0.5rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)' }}>
              Collaborations & Contact
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)' }}>
              Would you like to host an art gallery, run a custom creative workshop, or reserve a table for special gatherings? Get in touch with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section" style={{ padding: '2rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '4rem'
        }}>
          {/* Details & Map */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div style={{
              background: 'var(--card-white)',
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(42, 26, 20, 0.05)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.8rem'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Cozy Connect</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(200, 107, 81, 0.08)', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone style={{ color: 'var(--accent-terracotta)', width: '18px', height: '18px' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Call or WhatsApp</p>
                  <a href="tel:+916281593608" style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    +91 6281593608
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(168, 140, 108, 0.08)', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail style={{ color: 'var(--accent-gold)', width: '18px', height: '18px' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email Us</p>
                  <a href="mailto:hemasree3020043@gmail.com" style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    hemasree3020043@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(42, 26, 20, 0.05)', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin style={{ color: 'var(--text-primary)', width: '18px', height: '18px' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Address</p>
                  <a 
                    href="https://www.google.com/maps/place/Vasavi+Signature/@17.4832453,78.3874488,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb916d2ea2b73f:0xcbb854e9032421b8!8m2!3d17.4832453!4d78.3900237!16s%2Fg%2F11gy86zb2q?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--accent-terracotta)', textDecoration: 'underline' }}
                  >
                    Vasavi Signature, Kukatpally, Hyderabad
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps locator iframe */}
            <div style={{
              width: '100%',
              height: '300px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(42, 26, 20, 0.08)'
            }}>
              <iframe
                title="Google Maps Locator: Vasavi Signature"
                src="https://maps.google.com/maps?q=Vasavi%20Signature,%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{
              background: 'var(--card-white)',
              padding: '3rem 2.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(42, 26, 20, 0.05)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.8rem' }}>
                <MessageSquare style={{ color: 'var(--accent-terracotta)', width: '22px', height: '22px' }} />
                <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Cozy Desk Form</h2>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '1px solid rgba(42, 26, 20, 0.12)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="dreamer@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '1px solid rgba(42, 26, 20, 0.12)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Reason for Connect</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '1px solid rgba(42, 26, 20, 0.12)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Collaboration / Gallery Proposal">Collaboration / Gallery Proposal</option>
                    <option value="Host a Creative Workshop">Host a Creative Workshop</option>
                    <option value="Group Table Reservation">Group Table Reservation</option>
                    <option value="General Question / Hello">General Question / Hello</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Message Details</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell us details about dates, sizes, or artwork ideas..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '140px',
                      padding: '0.8rem 1rem',
                      border: '1px solid rgba(42, 26, 20, 0.12)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'var(--accent-terracotta)',
                    border: 'none',
                    color: '#fff',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent-terracotta)'}
                >
                  <Send style={{ width: '16px', height: '16px' }} />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
