'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import SteamMug from '../components/SteamMug';
import LatteStudio from '../components/LatteStudio';
import EspressoBar from '../components/EspressoBar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Paintbrush, Coffee, Palette, Receipt, 
  Calendar, BookOpen, ChevronLeft, ChevronRight, X, Plus 
} from 'lucide-react';

const menuItems = [
  {
    id: 'm1',
    name: 'Vanilla Cream Latte',
    price: 5.50,
    desc: 'Double shot of house espresso poured over warm, custom-steamed vanilla bean cream and farm milk.',
    category: 'coffee',
    tag: 'Classic Cozy',
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm2',
    name: 'Mocha Art Brew',
    price: 6.25,
    desc: 'Rich Dutch cocoa sauce whisked with house espresso and steamed milk, decorated with chocolate brush swirls.',
    category: 'coffee',
    tag: 'Signature',
    img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm3',
    name: 'Cinnamon Cappuccino',
    price: 5.75,
    desc: 'Thick creamy foam cap and signature espresso, dusted with sparkly ceylon cinnamon and cane crystals.',
    category: 'coffee',
    tag: 'Warm Spice',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm4',
    name: 'Matcha Sketch Latte',
    price: 6.50,
    desc: 'Ceremonial Uji matcha whisked with oat milk, organic lavender honey, and topped with edible rose petals.',
    category: 'tea',
    tag: 'Floral Zen',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm5',
    name: 'Watercolor Glazed Croissant',
    price: 4.50,
    desc: '24-layer buttery croissant glazed in an organic, edible pastel watercolor glaze. Baked fresh daily.',
    category: 'bakery',
    tag: 'Sketch Special',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm6',
    name: 'Espresso Fudge Brownie',
    price: 3.75,
    desc: 'Rich, dense dark fudge brownie infused with espresso grounds and warm salted caramel swirls.',
    category: 'bakery',
    tag: 'Sweet Bite',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm7',
    name: 'Pocket Watercolor Set',
    price: 12.00,
    desc: '12 highly pigmented watercolor pans, a refillable brush pen, and pre-cut watercolor paper sheets.',
    category: 'art',
    tag: 'Studio Kit',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm8',
    name: 'Sketchbook Matte Mug',
    price: 8.50,
    desc: 'A matte white double-walled ceramic coffee mug with 3 fine-tip ceramic markers to design and bake.',
    category: 'art',
    tag: 'DIY Craft',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'
  }
];

const defaultPolaroids = [
  { title: "Sunday Morning", author: "Lily M.", src: "/assets/art_cafe_interior.png" },
  { title: "Aroma Study", author: "Marcus V.", src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600" },
  { title: "Palette & Pitcher", author: "Sophie K.", src: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=600" },
  { title: "Steam Reflections", author: "Chloe D.", src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600" }
];

const testimonials = [
  { quote: "This is hands-down my favorite place in the city to clear my head. I grab a sea-salt latte, fetch watercolors, and sit for hours.", author: "Arthur Pendelton" },
  { quote: "Brew & Brush is an absolute dream. The events are warm, friendly, and you get to paint directly on paper towels if you run out of canvas!", author: "Clara Montgomery" },
  { quote: "A perfect blend of cozy café and inspiring artist colony. The virtual custom drink builder matches their physical cups perfectly!", author: "Liam K." }
];

export default function Home() {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('all');
  const [activePolaroid, setActivePolaroid] = useState(null);
  const [guestbookNotes, setGuestbookNotes] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [guestMsg, setGuestMsg] = useState('');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [rsvpStates, setRsvpStates] = useState({});

  // Fetch Guestbook Notes
  const loadGuestbook = () => {
    let logs = localStorage.getItem('brew_brush_guestbook');
    if (logs) {
      setGuestbookNotes(JSON.parse(logs).reverse());
    } else {
      const defaultNotes = [
        { name: 'Emma Rose', message: 'This is the coziest virtual spot! Loved customizing my rose coffee.', time: '10 mins ago', doodle: null }
      ];
      localStorage.setItem('brew_brush_guestbook', JSON.stringify(defaultNotes));
      setGuestbookNotes(defaultNotes);
    }
  };

  useEffect(() => {
    loadGuestbook();
    
    // Sync guestbook updates from LatteStudio
    const handleSync = () => loadGuestbook();
    window.addEventListener('guestbook-updated', handleSync);
    return () => window.removeEventListener('guestbook-updated', handleSync);
  }, []);

  const handleGuestbookSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMsg.trim()) return;

    const newNote = {
      name: guestName.trim(),
      message: guestMsg.trim(),
      time: 'Just now',
      doodle: null
    };

    let logs = localStorage.getItem('brew_brush_guestbook');
    logs = logs ? JSON.parse(logs) : [];
    logs.push(newNote);
    localStorage.setItem('brew_brush_guestbook', JSON.stringify(logs));

    setGuestbookNotes([newNote, ...guestbookNotes]);
    setGuestName('');
    setGuestMsg('');
  };

  const handleRsvp = (eventKey, eventTitle) => {
    if (rsvpStates[eventKey]) return;
    alert(`🎟️ Workspace Reserved! We've saved you a ticket for the "${eventTitle}" event. See you there!`);
    setRsvpStates(prev => ({
      ...prev,
      [eventKey]: true
    }));
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const filteredMenuItems = filter === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  return (
    <main style={{ position: 'relative' }}>
      {/* Decorative background coffee rings */}
      <div className="coffee-ring" style={{ top: '15%', left: '-80px', transform: 'scale(1.1) rotate(15deg)' }}></div>
      <div className="coffee-ring" style={{ top: '48%', right: '-100px', transform: 'scale(0.9) rotate(-35deg)' }}></div>
      <div className="coffee-ring" style={{ top: '78%', left: '-120px', transform: 'scale(1.2) rotate(45deg)' }}></div>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">
              <Star style={{ width: '12px', height: '12px', fill: 'var(--text-primary)', color: 'var(--text-primary)' }} />
              Artisan Coffee & Creative Lounge
            </div>
            <h1>Brewed for Artists & <span>Dreamers.</span></h1>
            <p>Welcome to a cozy corner where rich specialty espresso, sketchbooks, warm conversations, and watercolor palettes live together. Grab a cup, pull up an easel, and create.</p>
            <div className="hero-buttons">
              <a href="#latte-studio" className="btn-primary">
                <Paintbrush style={{ width: '16px', height: '16px' }} /> Paint Latte Art
              </a>
              <a href="#menu-section" className="btn-secondary">Explore Menu</a>
            </div>
          </motion.div>
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SteamMug />
          </motion.div>
        </div>
      </section>

      {/* About Showcase Preview Section */}
      <section className="section" id="about">
        <div className="scrapbook-layout">
          <div className="scrapbook-text">
            <div className="handwritten">Our Story</div>
            <h2>A Cozy Creative Sanctuary</h2>
            <p>Brew & Brush started with a simple belief: that a coffee cup and a blank canvas are the perfect companions. We wanted to create a neighborhood shelter for writers sketching thoughts, illustrators painting latte froth, and friends catching up in warm, imperfect corners.</p>
            
            <div className="about-features">
              <div className="about-feature-item">
                <Coffee style={{ width: '24px', height: '24px', color: 'var(--accent-terracotta)' }} />
                <div>
                  <h4>Ethically Sourced Beans</h4>
                  <p>All our beans are single-origin, roasted in-house daily by expert baristas.</p>
                </div>
              </div>
              <div className="about-feature-item">
                <Palette style={{ width: '24px', height: '24px', color: 'var(--accent-terracotta)' }} />
                <div>
                  <h4>Workspace Easels & Paint</h4>
                  <p>Every table is stocked with brushes, sketchpads, and watercolors for your use.</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/about" className="btn-action btn-action-primary" style={{ display: 'inline-flex', width: 'auto', padding: '0.8rem 1.8rem' }}>
                Read Full Story
              </Link>
            </div>
          </div>

          <div className="scrapbook-stickers">
            <div className="about-image-card">
              <div style={{ position: 'relative', width: '100%', height: '320px' }}>
                <Image 
                  src="/assets/art_cafe_interior.png" 
                  alt="Cozy cafe interior inside Brew and Brush"
                  fill
                  style={{ objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
              <div className="about-image-caption">
                <div>
                  <h4>Brew & Brush Studio Lounge</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Open Daily — 7 AM to 9 PM</p>
                </div>
                <span className="handwritten" style={{ fontSize: '1.6rem', transform: 'rotate(-3deg)' }}>Cozy Vibe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Latte Art Studio */}
      <section className="section" id="latte-studio" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-header">
          <div className="handwritten">Try it out</div>
          <h2>Latte Art Studio</h2>
          <p>Decorate your coffee mug! Choose cream foam, caramel drizzle, or cocoa sprinkle brushes to paint your own designs directly on the cup.</p>
        </div>
        <LatteStudio />
      </section>

      {/* Interactive Virtual Espresso Bar */}
      <section className="section" id="espresso-bar">
        <div className="section-header">
          <div className="handwritten">Virtual Barista</div>
          <h2>Mix Your Special Brew</h2>
          <p>Experiment in our virtual espresso bar. Mix ingredients, watch layers stack in the glass, and order your custom recipe!</p>
        </div>
        <EspressoBar />
      </section>

      {/* Featured Menu Section */}
      <section className="section" id="menu-section" style={{ position: 'relative' }}>
        <div className="section-header">
          <div className="handwritten">Curated Items</div>
          <h2>Workspace Menu</h2>
          <p>Sip, eat, or paint. We serve artisan roast coffees, floral teas, sweet treats, and paintkits directly to your café workspace.</p>
        </div>

        {/* Special Coffee Tasting Card (Barista Pick) */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          marginBottom: '4rem',
          border: '1px dashed rgba(111, 78, 55, 0.2)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 5
        }} className="barista-pick-card">
          <div style={{
            position: 'relative',
            width: '180px',
            height: '240px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)'
          }}>
            <Image
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400"
              alt="Specialty Single Origin Bean"
              fill
              sizes="180px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <span className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--accent-terracotta)', display: 'block', marginBottom: '0.4rem' }}>Barista's Roast Choice</span>
            <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              ☕ Araku Honey-Processed Single Origin
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Roasted fresh in-house by Hema Sree. This medium-dark honey-processed micro-lot offers an incredibly sweet cup with hazelnut aromatics and a velvety dark cocoa body.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              borderTop: '1px solid rgba(111, 78, 55, 0.15)',
              paddingTop: '1.2rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: '700', letterSpacing: '0.5px' }}>Origin</span>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Araku Valley, India</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: '700', letterSpacing: '0.5px' }}>Taste Notes</span>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Plum, Honey, Hazelnut</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: '700', letterSpacing: '0.5px' }}>Roast Profile</span>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Medium Roast (City+)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="menu-controls">
          {['all', 'coffee', 'tea', 'bakery', 'art'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="menu-grid">
          {filteredMenuItems.map((item) => (
            <div className="recipe-card" key={item.id}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '190px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '1.2rem',
                border: '1px solid rgba(42, 26, 20, 0.04)'
              }}>
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="recipe-header">
                <h3 className="recipe-title">{item.name}</h3>
                <span className="recipe-price">${item.price.toFixed(2)}</span>
              </div>
              <p className="recipe-desc">{item.desc}</p>
              <div className="recipe-footer">
                <span className="recipe-tag">{item.tag}</span>
                <button 
                  className="btn-add-recipe"
                  onClick={() => addToCart(item.name, item.price, item.img, false, item.desc)}
                >
                  <Plus style={{ width: '12px', height: '12px', marginRight: '4px' }} /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Art Gallery & Guestbook Wall */}
      <section className="section" id="gallery-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-header">
          <div className="handwritten">Gallery Wall</div>
          <h2>Cozy Studio Work</h2>
          <p>Featured canvases painted inside the cafe by our visitors and resident artists. Click any frame to zoom in.</p>
        </div>

        <div className="gallery-layout">
          {/* Polaroids Grid */}
          <div className="gallery-wall">
            {defaultPolaroids.map((p, idx) => (
              <div 
                className="art-polaroid" 
                key={idx} 
                onClick={() => setActivePolaroid(p)}
              >
                <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                  <Image 
                    src={p.src} 
                    alt={p.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className="art-polaroid-caption">"{p.title}" &mdash; {p.author}</div>
              </div>
            ))}
          </div>

          {/* Guestbook Board */}
          <div className="guestbook">
            <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span>Sketchbook Board</span>
              <span className="handwritten" style={{ fontSize: '1.1rem', color: 'var(--accent-gold)' }}>share your creation</span>
            </h3>
            
            {/* Messages Board */}
            <div className="doodle-wall">
              {guestbookNotes.map((log, idx) => (
                <div className="guest-note" key={idx}>
                  <div className="guest-note-header">
                    <span>🎨 {log.name}</span>
                    <span>{log.time}</span>
                  </div>
                  <div className="guest-note-body">
                    {log.message}
                  </div>
                  {log.doodle && (
                    <img className="guest-note-doodle" src={log.doodle} alt={`Doodle by ${log.name}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Add Note Form */}
            <form className="guestbook-form" onSubmit={handleGuestbookSubmit}>
              <input 
                type="text" 
                className="guestbook-input" 
                placeholder="Your Name" 
                required 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <input 
                type="text" 
                className="guestbook-input" 
                placeholder="Leave a sweet note..." 
                required 
                value={guestMsg}
                onChange={(e) => setGuestMsg(e.target.value)}
              />
              <button type="submit" className="guestbook-submit">Sign & Post Cup</button>
            </form>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section" id="events">
        <div className="section-header">
          <div className="handwritten">Join Us</div>
          <h2>Workshops & Meetups</h2>
          <p>We regularly host creative meetups. Hover over each card to view details, then RSVP to save your workspace seat!</p>
        </div>

        <div className="events-grid">
          {/* Event 1 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="event-date">May 26</div>
                <div className="event-title">Watercolor & Latte Pouring</div>
                <div className="event-time">4:00 PM - 6:00 PM</div>
              </div>
              <div className="flip-card-back">
                <h4>Event Details</h4>
                <p>Learn basic watercolor blending while sipping fresh roasts. Paints and paper panels are provided on us.</p>
                <button 
                  className="btn-primary" 
                  style={{ 
                    padding: '0.5rem', 
                    fontSize: '0.85rem', 
                    width: '100%', 
                    justifyContent: 'center',
                    background: rsvpStates['e1'] ? 'var(--bg-secondary)' : 'var(--accent-terracotta)',
                    color: rsvpStates['e1'] ? 'var(--text-primary)' : '#fff',
                    cursor: rsvpStates['e1'] ? 'default' : 'pointer'
                  }}
                  disabled={rsvpStates['e1']}
                  onClick={() => handleRsvp('e1', 'Watercolor & Latte Pouring')}
                >
                  {rsvpStates['e1'] ? 'Seat Saved!' : 'RSVP Seat'}
                </button>
              </div>
            </div>
          </div>

          {/* Event 2 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="event-date">May 29</div>
                <div className="event-title">Poetry & Acoustic Lounge</div>
                <div className="event-time">7:30 PM - 9:30 PM</div>
              </div>
              <div className="flip-card-back">
                <h4>Event Details</h4>
                <p>A candlelit evening of open mic poetry, local journal readings, and acoustic guitar background loops.</p>
                <button 
                  className="btn-primary" 
                  style={{ 
                    padding: '0.5rem', 
                    fontSize: '0.85rem', 
                    width: '100%', 
                    justifyContent: 'center',
                    background: rsvpStates['e2'] ? 'var(--bg-secondary)' : 'var(--accent-terracotta)',
                    color: rsvpStates['e2'] ? 'var(--text-primary)' : '#fff',
                    cursor: rsvpStates['e2'] ? 'default' : 'pointer'
                  }}
                  disabled={rsvpStates['e2']}
                  onClick={() => handleRsvp('e2', 'Poetry & Acoustic Lounge')}
                >
                  {rsvpStates['e2'] ? 'Seat Saved!' : 'RSVP Seat'}
                </button>
              </div>
            </div>
          </div>

          {/* Event 3 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="event-date">June 02</div>
                <div className="event-title">Live Classic Jazz Trio</div>
                <div className="event-time">6:00 PM - 9:00 PM</div>
              </div>
              <div className="flip-card-back">
                <h4>Event Details</h4>
                <p>Double bass, piano, and sax playing jazz tracks while you sketch on table napkins or study.</p>
                <button 
                  className="btn-primary" 
                  style={{ 
                    padding: '0.5rem', 
                    fontSize: '0.85rem', 
                    width: '100%', 
                    justifyContent: 'center',
                    background: rsvpStates['e3'] ? 'var(--bg-secondary)' : 'var(--accent-terracotta)',
                    color: rsvpStates['e3'] ? 'var(--text-primary)' : '#fff',
                    cursor: rsvpStates['e3'] ? 'default' : 'pointer'
                  }}
                  disabled={rsvpStates['e3']}
                  onClick={() => handleRsvp('e3', 'Live Classic Jazz Trio')}
                >
                  {rsvpStates['e3'] ? 'Seat Saved!' : 'RSVP Seat'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reflections Section */}
      <section className="section" id="stories" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-header">
          <div className="handwritten">Reflections</div>
          <h2>Sketchbook Reflections</h2>
          <p>Stories, notes, and testimonials written by visitors at our window-side bars.</p>
        </div>

        <div className="open-sketchbook">
          <div className="sketchbook-spine"></div>
          
          {/* Left Page: Cafe poem */}
          <div className="sketchbook-page page-left">
            <div className="poem-box">
              A coffee cup, a blank white page,<br />
              Where colors play and lines engage.<br />
              Warm shadows float, the steam climbs high,<br />
              A cozy space for you and I.<br />
              We sketch the dreams we left behind,<br />
              And seek the peace we hoped to find.<br />
              With brush and bean, we sit and stay,<br />
              And watch the quiet fade away.
            </div>
            <div className="handwritten" style={{ textAlign: 'right', marginTop: '1.5rem' }}>— written by a dreamer</div>
          </div>

          {/* Right Page: Testimonials Slide-out */}
          <div className="sketchbook-page page-right">
            <div className="testimonial-carousel">
              <button 
                className="carousel-nav-btn carousel-prev" 
                onClick={prevTestimonial}
                aria-label="Previous quote"
              >
                <ChevronLeft style={{ width: '18px', height: '18px' }} />
              </button>
              
              <div className="testimonial-container">
                {testimonials.map((t, idx) => (
                  <div 
                    className={`testimonial-slide ${idx === testimonialIndex ? 'active' : ''}`}
                    key={idx}
                    style={{ display: idx === testimonialIndex ? 'block' : 'none' }}
                  >
                    <div className="testimonial-quote">"{t.quote}"</div>
                    <div className="testimonial-author">— {t.author}</div>
                  </div>
                ))}
              </div>

              <button 
                className="carousel-nav-btn carousel-next" 
                onClick={nextTestimonial}
                aria-label="Next quote"
              >
                <ChevronRight style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Polaroid Zoom Modal */}
      <AnimatePresence>
        {activePolaroid && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(42, 26, 20, 0.45)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999
            }}
            onClick={() => setActivePolaroid(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                background: 'var(--card-white)',
                padding: '1.2rem 1.2rem 2.2rem 1.2rem',
                borderRadius: '6px',
                width: '90%',
                maxWidth: '420px',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <button 
                className="btn-close-modal" 
                onClick={() => setActivePolaroid(null)}
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <X style={{ width: '16px', height: '16px' }} />
              </button>
              
              <div style={{ position: 'relative', width: '100%', height: '320px', marginBottom: '1.2rem' }}>
                <Image 
                  src={activePolaroid.src} 
                  alt={activePolaroid.title} 
                  fill 
                  style={{ objectFit: 'cover', borderRadius: '2px' }} 
                />
              </div>
              <div className="art-polaroid-caption" style={{ textAlign: 'center', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>
                "{activePolaroid.title}" &mdash; By {activePolaroid.author}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
