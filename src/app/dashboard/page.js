'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, Palette, Ticket, User, BarChart2, Plus, 
  Trash2, ShieldCheck, Download, CheckCircle, Send 
} from 'lucide-react';

export default function Dashboard() {
  const { cart, addToCart, removeFromCart, cartTotal, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'recipes', 'doodles', 'tickets', 'tray'
  
  // Profile State
  const [profile, setProfile] = useState({
    name: 'Creative Artist',
    rank: 'Resident Illustrator 🎨',
    avatar: '🦊',
    color: '#C86B51'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Custom Recipes State
  const [recipes, setRecipes] = useState([]);

  // Doodles State
  const [doodles, setDoodles] = useState([]);

  // Tickets State
  const [tickets, setTickets] = useState([]);

  // Table Checkout State
  const [tableNumber, setTableNumber] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Load Dashboard Data from localStorage
  const loadDashboardData = () => {
    // 1. Profile
    const savedProfile = localStorage.getItem('brew_brush_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    // 2. Custom Recipes
    const savedRecipes = localStorage.getItem('brew_brush_custom_recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }

    // 3. Guestbook Doodles (Filter by current user if possible, or show all they posted)
    const guestbook = localStorage.getItem('brew_brush_guestbook');
    if (guestbook) {
      const allNotes = JSON.parse(guestbook);
      // Retrieve only items with image doodles
      const userDoodles = allNotes.filter(n => n.doodle);
      setDoodles(userDoodles);
    }

    // 4. RSVP Tickets
    const rsvps = localStorage.getItem('brew_brush_rsvps');
    if (rsvps) {
      setTickets(JSON.parse(rsvps));
    } else {
      // Default placeholder if none
      const defaults = [];
      setTickets(defaults);
    }
  };

  useEffect(() => {
    loadDashboardData();

    // Listen for custom guestbook events
    const handleSync = () => loadDashboardData();
    window.addEventListener('guestbook-updated', handleSync);
    return () => window.removeEventListener('guestbook-updated', handleSync);
  }, []);

  // Save Profile Handler
  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('brew_brush_profile', JSON.stringify(profile));
    setIsEditingProfile(false);
    alert('🎨 Studio profile updated successfully!');
  };

  // Delete Custom Recipe
  const handleDeleteRecipe = (id) => {
    const updated = recipes.filter(r => r.id !== id);
    setRecipes(updated);
    localStorage.setItem('brew_brush_custom_recipes', JSON.stringify(updated));
  };

  // Add Recipe to Cart (Brew Now)
  const handleBrewRecipe = (recipe) => {
    const img = 'https://images.unsplash.com/photo-151097252790b-af4f42df8e40?auto=format&fit=crop&q=80&w=100';
    addToCart(`${recipe.size} ${recipe.name}`, recipe.price, img, true, recipe.desc);
    alert(`☕ "${recipe.size} ${recipe.name}" has been added to your serving tray!`);
  };

  // Cancel RSVP Ticket
  const handleCancelTicket = (id, title) => {
    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated);
    localStorage.setItem('brew_brush_rsvps', JSON.stringify(updated));
    
    // Also remove from global RSVP state helper
    const rsvpStates = localStorage.getItem('brew_brush_rsvp_states') || '{}';
    const parsedStates = JSON.parse(rsvpStates);
    delete parsedStates[id];
    localStorage.setItem('brew_brush_rsvp_states', JSON.stringify(parsedStates));
    
    alert(`🎟️ Reservation for "${title}" cancelled successfully.`);
  };

  // Handle Checkout Order to Table
  const handleCheckoutOrder = (e) => {
    e.preventDefault();
    if (!tableNumber.trim()) return;
    setCheckoutComplete(true);
    clearCart();
  };

  return (
    <main style={{ paddingBottom: '6rem', position: 'relative' }}>
      {/* Background Coffee Stain Rings */}
      <div className="coffee-ring" style={{ top: '10%', left: '-80px', transform: 'scale(1.1) rotate(15deg)' }}></div>
      <div className="coffee-ring" style={{ top: '55%', right: '-100px', transform: 'scale(1.0) rotate(-25deg)' }}></div>

      {/* Hero Title */}
      <section className="page-hero">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="handwritten" style={{ fontSize: '1.6rem' }}>Studio Workspace</span>
          <h1>My Creative <span>Dashboard</span></h1>
          <p>Manage your custom espresso blends, view saved drawings, print workshop tickets, and checkout orders directly to your table.</p>
        </div>
      </section>

      {/* Main Dashboard Panel */}
      <section className="section" style={{ padding: '2rem 1rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* LEFT COLUMN: Sidebar Profile & Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Profile Card */}
            <div style={{
              background: 'var(--card-white)',
              border: '2px solid var(--text-primary)',
              borderRadius: '6px',
              padding: '2rem',
              boxShadow: '4px 4px 0 var(--text-primary)',
              textAlign: 'center',
              position: 'relative'
            }}>
              {!isEditingProfile ? (
                <>
                  <div style={{
                    fontSize: '4rem',
                    width: '100px',
                    height: '100px',
                    lineHeight: '100px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '50%',
                    margin: '0 auto 1.2rem auto',
                    border: '3px solid var(--text-primary)',
                    boxShadow: '2px 2px 0 var(--text-primary)'
                  }}>
                    {profile.avatar}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    {profile.name}
                  </h3>
                  <span style={{
                    fontSize: '0.82rem',
                    color: profile.color,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: `${profile.color}15`,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '1.5rem'
                  }}>
                    {profile.rank}
                  </span>
                  
                  <button 
                    className="btn-action" 
                    onClick={() => setIsEditingProfile(true)}
                    style={{ width: '100%', justifyContent: 'center', padding: '0.6rem' }}
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSaveProfile} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.4rem' }}>Update Studio Profile</h3>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Nickname</label>
                    <input 
                      type="text"
                      required
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      style={{
                        width: '100%', padding: '0.6rem 0.8rem', border: '1.5px solid var(--text-primary)',
                        borderRadius: '4px', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Avatar Emoji</label>
                    <select 
                      value={profile.avatar}
                      onChange={(e) => setProfile(prev => ({ ...prev, avatar: e.target.value }))}
                      style={{
                        width: '100%', padding: '0.6rem 0.8rem', border: '1.5px solid var(--text-primary)',
                        borderRadius: '4px', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'inherit', cursor: 'pointer'
                      }}
                    >
                      <option value="🦊">🦊 Fox Artist</option>
                      <option value="🎨">🎨 Painter</option>
                      <option value="☕">☕ Coffee Lover</option>
                      <option value="🐈">🐈 Studio Cat</option>
                      <option value="🌿">🌿 Cozy Plant</option>
                      <option value="🦉">🦉 Wise Owl</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Favorite Tone</label>
                    <select 
                      value={profile.color}
                      onChange={(e) => setProfile(prev => ({ ...prev, color: e.target.value }))}
                      style={{
                        width: '100%', padding: '0.6rem 0.8rem', border: '1.5px solid var(--text-primary)',
                        borderRadius: '4px', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'inherit', cursor: 'pointer'
                      }}
                    >
                      <option value="var(--accent-terracotta)">Terracotta Red</option>
                      <option value="var(--accent-gold)">Latte Gold</option>
                      <option value="var(--text-primary)">Espresso Brown</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setIsEditingProfile(false)}
                      style={{
                        flex: 1, padding: '0.6rem', background: 'transparent',
                        border: '1.5px solid var(--text-primary)', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem'
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      style={{
                        flex: 1, padding: '0.6rem', background: 'var(--text-primary)', color: 'var(--bg-primary)',
                        border: '1.5px solid var(--text-primary)', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem'
                      }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Navigation Tabs */}
            <div style={{
              background: 'var(--card-white)',
              border: '2px solid var(--text-primary)',
              borderRadius: '6px',
              padding: '1rem',
              boxShadow: '4px 4px 0 var(--text-primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              {[
                { id: 'overview', label: 'Overview', icon: BarChart2 },
                { id: 'recipes', label: 'Custom Recipes', icon: Coffee, count: recipes.length },
                { id: 'doodles', label: 'Saved Latte Art', icon: Palette, count: doodles.length },
                { id: 'tickets', label: 'Workshop Seats', icon: Ticket, count: tickets.length },
                { id: 'tray', label: 'Serving Tray', icon: Coffee, count: cart.length, badge: true }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setCheckoutComplete(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.9rem 1.2rem',
                      border: 'none',
                      borderRadius: '4px',
                      background: isActive ? 'var(--bg-secondary)' : 'transparent',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontWeight: isActive ? '700' : '500',
                      transition: 'var(--transition-smooth)',
                      textAlign: 'left'
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(111, 78, 55, 0.04)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <Icon style={{ width: '18px', height: '18px', color: isActive ? 'var(--accent-terracotta)' : 'var(--text-secondary)' }} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: tab.badge ? '#FFFDF9' : 'var(--text-primary)',
                        background: tab.badge ? 'var(--accent-terracotta)' : 'rgba(111, 78, 55, 0.1)',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '10px'
                      }}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Tab Panel View */}
          <div style={{
            background: 'var(--card-white)',
            border: '2px solid var(--text-primary)',
            borderRadius: '6px',
            padding: '3rem',
            boxShadow: '4px 4px 0 var(--text-primary)',
            minHeight: '520px',
            position: 'relative'
          }}>
            <AnimatePresence mode="wait">
              {/* 1. TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>Workspace Hub</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Welcome to your studio control center. Here are your stats and quick recommendations.</p>
                  
                  {/* Grid Stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                  }}>
                    {[
                      { label: 'Brews Mixed', count: recipes.length, desc: 'Espresso custom recipes', icon: Coffee, color: 'var(--accent-terracotta)' },
                      { label: 'Doodles Saved', count: doodles.length, desc: 'Shared gallery sketches', icon: Palette, color: 'var(--accent-gold)' },
                      { label: 'Saved Seats', count: tickets.length, desc: 'Active workshop tickets', icon: Ticket, color: 'var(--text-primary)' }
                    ].map((stat, idx) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={idx} style={{
                          border: '2.5px solid var(--text-primary)',
                          borderRadius: '6px',
                          padding: '1.5rem',
                          background: 'var(--bg-primary)',
                          boxShadow: '3px 3px 0 var(--text-primary)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <StatIcon style={{ width: '22px', height: '22px', color: stat.color }} />
                            <span style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>{stat.count}</span>
                          </div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)' }}>{stat.label}</h4>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>{stat.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recommendation Board */}
                  <div style={{
                    border: '2.5px solid var(--text-primary)',
                    borderRadius: '6px',
                    padding: '2rem',
                    background: 'var(--bg-secondary)',
                    boxShadow: '3px 3px 0 var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem'
                  }}>
                    <div style={{ fontSize: '3rem' }}>💡</div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.4rem', fontWeight: 700 }}>Workspace Suggestion</h4>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                        Ready to experiment? Try mixing a new brew in our <strong>Espresso Bar</strong> or painting a doodle signature in the <strong>Latte Art Studio</strong>. You can save recipes directly to this dashboard, and order them to your easel table!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. TAB: SAVED RECIPES */}
              {activeTab === 'recipes' && (
                <motion.div
                  key="recipes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>Custom Espresso Recipes</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Espresso blends you mixed and saved at the counter. Click Brew to add them to your serving tray.</p>

                  {recipes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '2px dashed rgba(111,78,55,0.15)', borderRadius: '6px' }}>
                      <Coffee style={{ width: '40px', height: '40px', color: 'var(--accent-gold)', margin: '0 auto 1rem auto' }} />
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>No Saved Recipes</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Mix ingredients in the Espresso Bar on the homepage and click "Save Recipe".</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {recipes.map(recipe => (
                        <div 
                          key={recipe.id}
                          style={{
                            border: '2.5px solid var(--text-primary)',
                            borderRadius: '6px',
                            padding: '1.5rem 2rem',
                            background: 'var(--bg-primary)',
                            boxShadow: '3px 3px 0 var(--text-primary)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '0.72rem', background: 'rgba(200,107,81,0.08)', color: 'var(--accent-terracotta)', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase', marginRight: '0.6rem' }}>
                              {recipe.size}
                            </span>
                            <h3 style={{ display: 'inline-block', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                              {recipe.name}
                            </h3>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3rem', margin: 0 }}>
                              {recipe.desc}
                            </p>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-terracotta)', marginRight: '0.5rem' }}>
                              ${recipe.price.toFixed(2)}
                            </span>
                            <button 
                              className="btn-primary" 
                              onClick={() => handleBrewRecipe(recipe)}
                              style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                            >
                              Brew Now
                            </button>
                            <button 
                              className="btn-action" 
                              onClick={() => handleDeleteRecipe(recipe.id)}
                              style={{ padding: '0.6rem', borderRadius: '6px', border: '2px solid var(--text-primary)' }}
                              aria-label="Delete recipe"
                            >
                              <Trash2 style={{ width: '16px', height: '16px', color: 'var(--accent-terracotta)' }} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* 3. TAB: SAVED DOODLES */}
              {activeTab === 'doodles' && (
                <motion.div
                  key="doodles"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>Saved Latte Art Sketches</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Sketches you painted inside the latte cup and posted on our guestbook wall.</p>

                  {doodles.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '2px dashed rgba(111,78,55,0.15)', borderRadius: '6px' }}>
                      <Palette style={{ width: '40px', height: '40px', color: 'var(--accent-gold)', margin: '0 auto 1rem auto' }} />
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>No Saved Latte Art</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Draw inside the latte cup in the Latte Studio on the homepage and click "Post to Wall".</p>
                    </div>
                  ) : (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                      gap: '2rem'
                    }}>
                      {doodles.map((item, idx) => (
                        <div 
                          key={idx}
                          style={{
                            border: '2.5px solid var(--text-primary)',
                            borderRadius: '6px',
                            background: 'var(--bg-primary)',
                            padding: '1rem 1rem 1.5rem 1rem',
                            boxShadow: '3px 3px 0 var(--text-primary)',
                            position: 'relative'
                          }}
                        >
                          <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '170px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid rgba(42,26,20,0.1)',
                            marginBottom: '0.8rem'
                          }}>
                            <img 
                              src={item.doodle} 
                              alt={`Saved sketch by ${item.name}`} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)' }}>
                            🎨 {item.name}
                          </h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                            "{item.message}"
                          </p>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <a 
                              href={item.doodle}
                              download={`saved-latte-art-${idx}.png`}
                              className="btn-action"
                              style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', textDecoration: 'none', justifyContent: 'center' }}
                            >
                              <Download style={{ width: '14px', height: '14px', marginRight: '4px' }} /> Save PNG
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* 4. TAB: WORKSHOP TICKETS */}
              {activeTab === 'tickets' && (
                <motion.div
                  key="tickets"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>Workshop Entry Tickets</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Tickets saved from your meetups RSVP. Present these stubs at the counter on arrival.</p>

                  {tickets.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '2px dashed rgba(111,78,55,0.15)', borderRadius: '6px' }}>
                      <Ticket style={{ width: '40px', height: '40px', color: 'var(--accent-gold)', margin: '0 auto 1rem auto' }} />
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>No Active Tickets</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Find workshops on the homepage and click "RSVP Seat".</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {tickets.map(ticket => (
                        <div 
                          key={ticket.id}
                          style={{
                            border: '3px solid var(--text-primary)',
                            borderRadius: '8px',
                            background: '#FFFDF9',
                            boxShadow: '4px 4px 0 var(--text-primary)',
                            display: 'grid',
                            gridTemplateColumns: '1fr auto 140px',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          {/* Ticket Main Details */}
                          <div style={{ padding: '1.8rem 2.2rem' }}>
                            <span style={{ fontSize: '0.72rem', background: 'rgba(200,107,81,0.08)', color: 'var(--accent-terracotta)', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase', tracking: '0.5px' }}>
                              Workspace Reserved
                            </span>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '0.5rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
                              {ticket.title}
                            </h3>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>
                              📅 {ticket.date} &bull; ⏰ {ticket.time}
                            </p>
                            <p style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', fontWeight: '700', marginTop: '0.4rem', margin: 0 }}>
                              📍 Kukatpally (Vasavi Signature) &bull; Seat: {ticket.seat}
                            </p>
                            
                            <button
                              onClick={() => handleCancelTicket(ticket.id, ticket.title)}
                              style={{
                                border: 'none', background: 'transparent', color: 'var(--accent-terracotta)', fontSize: '0.82rem',
                                fontWeight: '700', textDecoration: 'underline', padding: 0, marginTop: '1.2rem', cursor: 'pointer'
                              }}
                            >
                              Cancel Reservation
                            </button>
                          </div>

                          {/* Ticket Perforation line divider */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%',
                            padding: '0.2rem 0',
                            borderRight: '2px dashed var(--text-primary)'
                          }}>
                            {/* Inner circles to make the cutouts */}
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--card-white)', border: '2px solid var(--text-primary)', marginLeft: '18px', marginTop: '-12px' }}></div>
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--card-white)', border: '2px solid var(--text-primary)', marginLeft: '18px', marginBottom: '-12px' }}></div>
                          </div>

                          {/* Ticket Stub Stub Section (QR Code) */}
                          <div style={{
                            background: 'var(--bg-secondary)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem',
                            padding: '1.5rem'
                          }}>
                            {/* CSS-only QR Code */}
                            <div style={{
                              width: '80px',
                              height: '80px',
                              border: '2px solid var(--text-primary)',
                              borderRadius: '4px',
                              background: '#fff',
                              padding: '6px',
                              display: 'grid',
                              gridTemplateColumns: 'repeat(4, 1fr)',
                              gap: '2px'
                            }}>
                              <div style={{ background: '#000', gridColumn: 'span 2', gridRow: 'span 2' }}></div>
                              <div style={{ background: '#000' }}></div>
                              <div style={{ background: '#fff' }}></div>
                              <div style={{ background: '#000' }}></div>
                              <div style={{ background: '#000' }}></div>
                              <div style={{ background: '#fff' }}></div>
                              <div style={{ background: '#000', gridColumn: 'span 2', gridRow: 'span 2' }}></div>
                              <div style={{ background: '#000' }}></div>
                              <div style={{ background: '#fff' }}></div>
                            </div>
                            <span style={{ fontSize: '0.62rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', tracking: '0.5px' }}>
                              Ticket: #{ticket.id}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* 5. TAB: SERVING TRAY (CART) */}
              {activeTab === 'tray' && (
                <motion.div
                  key="tray"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>Easel Workspace Tray</h2>
                  
                  {!checkoutComplete ? (
                    <>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Review recipes and art kits in your workspace serving tray. Order directly to your table.</p>

                      {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '2px dashed rgba(111,78,55,0.15)', borderRadius: '6px' }}>
                          <Coffee style={{ width: '40px', height: '40px', color: 'var(--accent-gold)', margin: '0 auto 1rem auto' }} />
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>Your Tray is Empty</h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Find coffees and art packages in the Workspace Menu on the homepage.</p>
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'start' }}>
                          {/* Left Panel: Cart list */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cart.map(item => (
                              <div 
                                key={item.id}
                                style={{
                                  border: '2.5px solid var(--text-primary)',
                                  borderRadius: '6px',
                                  padding: '1rem 1.2rem',
                                  background: 'var(--bg-primary)',
                                  boxShadow: '3px 3px 0 var(--text-primary)',
                                  display: 'grid',
                                  gridTemplateColumns: '50px 1fr auto',
                                  gap: '1.2rem',
                                  alignItems: 'center'
                                }}
                              >
                                <div style={{
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '4px',
                                  backgroundImage: `url(${item.img})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  border: '1.5px solid var(--text-primary)'
                                }} />
                                
                                <div>
                                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                                    {item.name}
                                  </h4>
                                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, marginTop: '0.1rem', lineHeight: 1.3 }}>
                                    {item.desc ? (item.desc.length > 50 ? `${item.desc.substring(0, 50)}...` : item.desc) : 'Creative item'}
                                  </p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                  <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-terracotta)' }}>
                                    ${item.price.toFixed(2)}
                                  </span>
                                  <button 
                                    className="btn-remove-item" 
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Remove item"
                                  >
                                    <Trash2 style={{ width: '16px', height: '16px' }} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Right Panel: Checkout Form */}
                          <div style={{
                            background: 'var(--bg-secondary)',
                            border: '2.5px solid var(--text-primary)',
                            borderRadius: '6px',
                            padding: '2rem',
                            boxShadow: '3px 3px 0 var(--text-primary)'
                          }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <ShieldCheck style={{ color: 'var(--accent-terracotta)', width: '20px', height: '20px' }} />
                              Confirm Workspace Order
                            </h3>
                            
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontWeight: '800',
                              fontSize: '1.2rem',
                              borderBottom: '1.5px dashed rgba(111,78,55,0.2)',
                              paddingBottom: '1rem',
                              marginBottom: '1.5rem'
                            }}>
                              <span>Total Subtotal:</span>
                              <span style={{ color: 'var(--accent-terracotta)' }}>${cartTotal.toFixed(2)}</span>
                            </div>

                            <form onSubmit={handleCheckoutOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                                  Enter Table / Easel Number
                                </label>
                                <input 
                                  type="text"
                                  required
                                  placeholder="e.g. Table 5 or Easel 12"
                                  value={tableNumber}
                                  onChange={(e) => setTableNumber(e.target.value)}
                                  style={{
                                    width: '100%', padding: '0.8rem 1rem', border: '2px solid var(--text-primary)',
                                    borderRadius: '6px', background: 'var(--card-white)', color: 'var(--text-primary)', fontFamily: 'inherit'
                                  }}
                                />
                              </div>

                              <button 
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', marginTop: '0.5rem' }}
                              >
                                <Send style={{ width: '16px', height: '16px', marginRight: '6px' }} /> Submit Order to Barista
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <motion.div 
                      style={{ textAlign: 'center', padding: '3.5rem 1rem' }}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <CheckCircle style={{ width: '60px', height: '60px', color: 'var(--accent-terracotta)', margin: '0 auto 1.2rem auto' }} />
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
                        Order Sent to Counter!
                      </h2>
                      <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2.2rem auto', lineHeight: '1.6' }}>
                        Your coffees, sweet pastries, and art packages are being prepared by Hema Sree and the crew. We will deliver everything directly to your workspace at <strong>{tableNumber}</strong> shortly!
                      </p>
                      
                      <button 
                        className="btn-primary"
                        onClick={() => { setCheckoutComplete(false); setTableNumber(''); }}
                        style={{ padding: '0.8rem 2rem' }}
                      >
                        Brew Another Cup
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
