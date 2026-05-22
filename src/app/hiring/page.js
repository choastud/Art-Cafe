'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send, Heart, Smile, Sparkles } from 'lucide-react';

const jobs = [
  {
    title: 'Artisan Barista',
    type: 'Full-Time',
    location: 'Hyderabad (Vasavi Signature)',
    desc: 'Craft premium espresso, micro-roast Araku beans daily, and teach our visitors how to make latte art drawing designs on canvas cups.',
    salary: 'Competitive'
  },
  {
    title: 'Art Instructor / Watercolor Coach',
    type: 'Part-Time',
    location: 'Hyderabad (Vasavi Signature)',
    desc: 'Host evening watercolor, sketch journaling, and acrylic blending workshops. Manage workspace easel palettes and weekly prompts.',
    salary: 'Hourly'
  },
  {
    title: 'Lounge Vibe Coordinator',
    type: 'Full-Time',
    location: 'Hyderabad (Vasavi Signature)',
    desc: 'Coordinate daily jazz programs, setup candlelit open mic events, welcome guests, and curate our polaroid gallery walls.',
    salary: 'Competitive'
  }
];

export default function Hiring() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Artisan Barista',
    why: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.why) return;
    
    // Simulate API call
    console.log('Application Submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', role: 'Artisan Barista', why: '' });
    alert(`✨ Application received, ${formData.name}! We will review your application for the "${formData.role}" position and reach out within 3 business days.`);
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
            <span className="handwritten" style={{ fontSize: '1.6rem' }}>Join the Studio</span>
            <h1 style={{ fontSize: '3.5rem', marginTop: '0.5rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)' }}>
              Work With Us
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)' }}>
              We believe in warm atmospheres, specialty coffee expertise, and creative expression. If you love painting, brewing, or building community, let's create together.
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
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '4rem'
        }}>
          {/* Jobs Listing */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Open Workspaces</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {jobs.map((job) => (
                <div
                  key={job.title}
                  style={{
                    background: 'var(--card-white)',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(42, 26, 20, 0.05)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(200, 107, 81, 0.08)',
                    color: 'var(--accent-terracotta)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '50px',
                    textTransform: 'uppercase'
                  }}>
                    {job.type}
                  </span>
                  
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {job.title}
                  </h3>
                  
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '1rem' }}>
                    📍 {job.location} &bull; {job.salary}
                  </p>
                  
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {job.desc}
                  </p>
                </div>
              ))}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <Sparkles style={{ color: 'var(--accent-terracotta)', width: '20px', height: '20px' }} />
                <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Quick Application</h2>
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
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Preferred Role</label>
                  <select
                    name="role"
                    value={formData.role}
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
                    <option value="Artisan Barista">Artisan Barista</option>
                    <option value="Art Instructor / Watercolor Coach">Art Instructor / Watercolor Coach</option>
                    <option value="Lounge Vibe Coordinator">Lounge Vibe Coordinator</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Why do you want to join Brew & Brush?</label>
                  <textarea
                    name="why"
                    required
                    placeholder="Tell us about your creative passions and experience..."
                    value={formData.why}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '120px',
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
                  Submit Application
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
