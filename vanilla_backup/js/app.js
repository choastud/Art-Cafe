(function() {
  // --- MENU DATA ---
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

  // --- GLOBAL STATE ---
  let cart = [];
  
  // Barista Builder State
  let currentSize = 'M'; // 'S', 'M', 'L'
  let espressoLayers = { espresso: 0, milk: 0, water: 0, caramel: 0, foam: 0 };
  let toppings = { cinnamon: false, sprinkles: false };

  // --- SELECTORS ---
  const menuGrid = document.getElementById('menu-items-grid');
  const cartDrawer = document.getElementById('cart-drawer-panel');
  const btnToggleCart = document.getElementById('btn-toggle-cart');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalVal = document.getElementById('cart-subtotal-val');
  const cartItemCountBadge = document.getElementById('cart-item-count');
  const headerEl = document.getElementById('main-header');

  // --- SCROLL EFFECTS ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerEl.classList.add('scrolled');
    } else {
      headerEl.classList.remove('scrolled');
    }
  });

  // --- FLOATING SPARKLE CURSOR TRAIL ---
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.3) return; // limit count for performance

    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-particle';
    
    const symbols = ['✦', '•'];
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    sparkle.style.fontSize = Math.random() > 0.5 ? '10px' : '6px';
    
    // Pick professional warm colors
    const colors = ['#C86B51', '#A88C6C', '#2A1A14'];
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 600);
  });

  // --- GENERATING THE MENU CARDS (RECIPE STYLED) ---
  function renderMenu(items) {
    if (!menuGrid) return;
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      
      card.innerHTML = `
        <div class="recipe-header">
          <h3 class="recipe-title">${item.name}</h3>
          <span class="recipe-price">$${item.price.toFixed(2)}</span>
        </div>
        <p class="recipe-desc">${item.desc}</p>
        <div class="recipe-footer">
          <span class="recipe-tag">${item.tag}</span>
          <button class="btn-add-recipe" data-id="${item.id}">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      `;
      
      menuGrid.appendChild(card);
    });

    // Add recipe listeners
    const addBtns = menuGrid.querySelectorAll('.btn-add-recipe');
    addBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const selected = menuItems.find(i => i.id === id);
        if (selected) {
          addToCart(selected.name, selected.price, selected.img);
        }
      });
    });
  }

  // --- FILTER SYSTEM ---
  const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const category = btn.getAttribute('data-filter');
      if (category === 'all') {
        renderMenu(menuItems);
      } else {
        const filtered = menuItems.filter(item => item.category === category);
        renderMenu(filtered);
      }
    });
  });

  // --- CART PANEL DRAWERS ---
  if (btnToggleCart) {
    btnToggleCart.addEventListener('click', () => cartDrawer.classList.add('open'));
  }
  if (btnCloseCart) {
    btnCloseCart.addEventListener('click', () => cartDrawer.classList.remove('open'));
  }

  function addToCart(name, price, img, isCustom = false, desc = '') {
    const existing = cart.find(item => item.name === name && item.isCustom === isCustom);
    if (existing && !isCustom) {
      existing.quantity++;
    } else {
      cart.push({
        id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name,
        price,
        img: img || 'https://images.unsplash.com/photo-151097252790b-af4f42df8e40?auto=format&fit=crop&q=80&w=100',
        quantity: 1,
        isCustom,
        desc
      });
    }
    updateCart();
    cartDrawer.classList.add('open');
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
  }

  function updateCart() {
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-mug-saucer" style="color: var(--color-coffee); font-size:2.5rem;"></i>
          <p style="font-family: var(--font-hand); font-size:1.4rem; margin-top:0.5rem;">Tray is empty...</p>
        </div>
      `;
      cartSubtotalVal.textContent = '$0.00';
      cartItemCountBadge.textContent = '0';
      return;
    }

    cartItemsList.innerHTML = '';
    let total = 0;
    let itemsCount = 0;

    cart.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      total += item.price * item.quantity;
      itemsCount += item.quantity;

      itemEl.innerHTML = `
        <div class="cart-item-img" style="background-image: url('${item.img}')"></div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          ${item.desc ? `<p style="font-size:0.72rem; line-height:1.2; color:var(--color-coffee); font-weight:normal; margin-bottom:0.15rem;">${item.desc}</p>` : ''}
          <p>$${item.price.toFixed(2)} ${item.quantity > 1 ? `x ${item.quantity}` : ''}</p>
        </div>
        <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;
      cartItemsList.appendChild(itemEl);
    });

    cartSubtotalVal.textContent = `$${total.toFixed(2)}`;
    cartItemCountBadge.textContent = itemsCount.toString();

    // delete triggers
    const delBtns = cartItemsList.querySelectorAll('.btn-remove-item');
    delBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.getAttribute('data-id'));
      });
    });
  }

  const btnCheckout = document.getElementById('btn-checkout-drawer');
  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      if (cart.length === 0) return;
      alert(`☕ Order Received! Table preps under way for $${cartSubtotalVal.textContent.replace('$', '')}. Draw at the table while you wait!`);
      cart = [];
      updateCart();
      cartDrawer.classList.remove('open');
    });
  }


  // --- VIRTUAL BARISTA RECIPE MIXER ---
  const sizeSBtn = document.getElementById('btn-size-s');
  const sizeMBtn = document.getElementById('btn-size-m');
  const sizeLBtn = document.getElementById('btn-size-l');
  
  const ingCards = document.querySelectorAll('.ingredient-card[data-ingredient]');
  const topCinnamon = document.getElementById('btn-topping-cinnamon');
  const topSprinkles = document.getElementById('btn-topping-sprinkles');
  const btnResetDrink = document.getElementById('btn-reset-drink');
  const btnAddDrinkCart = document.getElementById('btn-add-drink-cart');

  const layersContainer = document.getElementById('cup-liquid-layers');
  const summaryName = document.getElementById('drink-summary-name');
  const summaryRecipe = document.getElementById('drink-summary-recipe');

  const toppingChocItem = document.getElementById('topping-chocolate-item');
  const toppingCinnItem = document.getElementById('topping-cinnamon-item');
  const toppingSpriItem = document.getElementById('topping-sprinkle-item');
  const toppingCocoItem = document.getElementById('topping-cocoa-item');

  function updateCupSize(size) {
    currentSize = size;
    [sizeSBtn, sizeMBtn, sizeLBtn].forEach(b => b.classList.remove('active'));
    if (size === 'S') sizeSBtn.classList.add('active');
    if (size === 'M') sizeMBtn.classList.add('active');
    if (size === 'L') sizeLBtn.classList.add('active');

    const cup = document.getElementById('glass-cup-cup');
    if (cup) {
      if (size === 'S') cup.style.height = '180px';
      if (size === 'M') cup.style.height = '210px';
      if (size === 'L') cup.style.height = '245px';
    }
    updateDrinkDisplay();
  }

  if (sizeSBtn) {
    [sizeSBtn, sizeMBtn, sizeLBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        updateCupSize(btn.getAttribute('data-size'));
      });
    });
  }

  ingCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-ingredient');
      let total = Object.values(espressoLayers).reduce((a, b) => a + b, 0);
      if (total >= 100) {
        alert('Cup is full! Click Reset to brew a new one.');
        return;
      }
      espressoLayers[type] = (espressoLayers[type] || 0) + 20;
      card.classList.add('active');
      
      card.style.transform = 'scale(0.95)';
      setTimeout(() => card.style.transform = '', 100);
      
      updateDrinkDisplay();
    });
  });

  if (topCinnamon) {
    topCinnamon.addEventListener('click', () => {
      toppings.cinnamon = !toppings.cinnamon;
      topCinnamon.classList.toggle('active');
      toppingChocItem.classList.toggle('visible', toppings.cinnamon);
      toppingCocoItem.classList.toggle('visible', toppings.cinnamon);
    });

    topSprinkles.addEventListener('click', () => {
      toppings.sprinkles = !toppings.sprinkles;
      topSprinkles.classList.toggle('active');
      toppingCinnItem.classList.toggle('visible', toppings.sprinkles);
      toppingSpriItem.classList.toggle('visible', toppings.sprinkles);
    });

    btnResetDrink.addEventListener('click', () => {
      espressoLayers = { espresso: 0, milk: 0, water: 0, caramel: 0, foam: 0 };
      toppings = { cinnamon: false, sprinkles: false };
      
      ingCards.forEach(c => c.classList.remove('active'));
      topCinnamon.classList.remove('active');
      topSprinkles.classList.remove('active');

      [toppingChocItem, toppingCinnItem, toppingSpriItem, toppingCocoItem].forEach(item => {
        item.classList.remove('visible');
      });

      updateDrinkDisplay();
    });
  }

  function updateDrinkDisplay() {
    if (!layersContainer) return;
    layersContainer.innerHTML = '';

    const labels = [];
    let totalPct = 0;

    Object.entries(espressoLayers).forEach(([ing, pct]) => {
      if (pct > 0) {
        totalPct += pct;
        labels.push(`${pct}% ${ing.charAt(0).toUpperCase() + ing.slice(1)}`);
        
        const layer = document.createElement('div');
        layer.className = `liquid-layer layer-${ing}`;
        setTimeout(() => {
          layer.style.height = `${pct}%`;
        }, 50);
        layersContainer.appendChild(layer);
      }
    });

    let drinkName = 'Custom Brew';
    if (espressoLayers.espresso > 0 && espressoLayers.milk > 0 && espressoLayers.foam > 0 && espressoLayers.water === 0) {
      drinkName = 'Fluffy Cappuccino';
    } else if (espressoLayers.espresso > 0 && espressoLayers.milk > 0 && espressoLayers.caramel > 0) {
      drinkName = 'Caramel Macchiato';
    } else if (espressoLayers.espresso > 0 && espressoLayers.water > 0) {
      drinkName = 'Café Americano';
    } else if (espressoLayers.espresso > 0 && espressoLayers.milk > 0 && espressoLayers.foam === 0) {
      drinkName = 'Cozy Latte';
    } else if (totalPct === 0) {
      drinkName = 'Empty Mug';
    }

    const oz = currentSize === 'S' ? '8 oz' : currentSize === 'M' ? '12 oz' : '16 oz';
    summaryName.textContent = `${oz} ${drinkName}`;

    if (labels.length > 0) {
      let recText = labels.join(' + ');
      if (toppings.cinnamon) recText += ' + Cocoa Shavings';
      if (toppings.sprinkles) recText += ' + Gold Cinnamon';
      summaryRecipe.textContent = recText;

      const base = currentSize === 'S' ? 4.50 : currentSize === 'M' ? 5.50 : 6.50;
      const addOn = toppings.cinnamon || toppings.sprinkles ? 0.50 : 0;
      const finalPrice = base + addOn;

      btnAddDrinkCart.textContent = `Add to Tray ($${finalPrice.toFixed(2)})`;
      btnAddDrinkCart.disabled = false;
    } else {
      summaryRecipe.textContent = 'Add ingredients to customize.';
      btnAddDrinkCart.textContent = 'Add to Tray ($0.00)';
      btnAddDrinkCart.disabled = true;
    }
  }

  if (btnAddDrinkCart) {
    btnAddDrinkCart.addEventListener('click', () => {
      let total = Object.values(espressoLayers).reduce((a, b) => a + b, 0);
      if (total === 0) return;

      const base = currentSize === 'S' ? 4.50 : currentSize === 'M' ? 5.50 : 6.50;
      const addOn = toppings.cinnamon || toppings.sprinkles ? 0.50 : 0;
      const finalPrice = base + addOn;

      const name = summaryName.textContent;
      const desc = summaryRecipe.textContent;
      const img = 'https://images.unsplash.com/photo-151097252790b-af4f42df8e40?auto=format&fit=crop&q=80&w=100';

      addToCart(name, finalPrice, img, true, desc);
    });
  }


  // --- POLAROID GALLERY EXPAND MODAL ---
  const modal = document.getElementById('image-modal');
  const modalContentArea = document.getElementById('modal-content-area');
  const modalMedia = document.getElementById('modal-media-holder');
  const modalCaption = document.getElementById('modal-caption-text');
  const btnCloseModal = document.getElementById('btn-close-modal-x');

  if (modal) {
    document.querySelectorAll('.art-polaroid').forEach(p => {
      p.addEventListener('click', () => {
        const src = p.getAttribute('data-src');
        const title = p.getAttribute('data-title');
        const author = p.getAttribute('data-author');
        
        modalMedia.innerHTML = '';
        
        if (src.startsWith('FALLBACK_GRADIENT')) {
          const fallback = p.querySelector('.art-fallback-container').cloneNode(true);
          fallback.style.height = '320px';
          modalMedia.appendChild(fallback);
        } else {
          const img = document.createElement('img');
          img.src = src;
          img.alt = title;
          modalMedia.appendChild(img);
        }
        
        modalCaption.innerHTML = `"${title}" &mdash; By ${author}`;
        modal.style.display = 'flex';
      });
    });

    btnCloseModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }


  // --- EVENTS RSVP TICKET SYSTEM ---
  document.querySelectorAll('.rsvp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event');
      alert(`🎟️ Workspace Reserved! We've saved you a ticket for the "${eventName}" event. See you there!`);
      
      btn.textContent = "Seat Saved!";
      btn.disabled = true;
      btn.style.background = "var(--color-bg-latte)";
      btn.style.color = "var(--color-espresso)";
      btn.style.cursor = "default";
      btn.style.boxShadow = "none";
      btn.style.transform = "none";
    });
  });


  // --- COZY TESTIMONIAL CAROUSEL SLIDER ---
  let testimonialIndex = 0;
  const tSlides = document.querySelectorAll('.testimonial-slide');
  const btnPrevT = document.getElementById('btn-prev-test');
  const btnNextT = document.getElementById('btn-next-test');

  function showTestimonial(index) {
    if (tSlides.length === 0) return;
    tSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  if (btnPrevT) {
    btnPrevT.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + tSlides.length) % tSlides.length;
      showTestimonial(testimonialIndex);
    });
    btnNextT.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % tSlides.length;
      showTestimonial(testimonialIndex);
    });
  }


  // --- PERSISTENT SKETCH GUESTBOOK (LOCALSTORAGE) ---
  const guestForm = document.getElementById('form-guestbook');
  const guestWall = document.getElementById('guestbook-messages');
  const checkAttach = document.getElementById('attach-doodle-chk');

  function loadGuestbook() {
    if (!guestWall) return;
    
    let logs = localStorage.getItem('brew_brush_guestbook');
    if (logs) {
      logs = JSON.parse(logs);
      guestWall.innerHTML = '';
      logs.forEach(log => {
        addGuestToDOM(log);
      });
    }
  }

  function addGuestToDOM(log) {
    const note = document.createElement('div');
    note.className = 'guest-note';
    
    note.innerHTML = `
      <div class="guest-note-header">
        <span>🎨 ${escapeHTML(log.name)}</span>
        <span>${escapeHTML(log.time)}</span>
      </div>
      <div class="guest-note-body">
        ${escapeHTML(log.message)}
      </div>
      ${log.doodle ? `<img class="guest-note-doodle" src="${log.doodle}" alt="Doodle by ${escapeHTML(log.name)}">` : ''}
    `;
    
    guestWall.prepend(note);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  if (guestForm) {
    guestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameIn = document.getElementById('guest-name');
      const msgIn = document.getElementById('guest-message');
      
      let doodleRef = null;
      if (checkAttach.checked && typeof window.getLatteArtDataURL === 'function') {
        doodleRef = window.getLatteArtDataURL();
      }

      const logEntry = {
        name: nameIn.value.trim(),
        message: msgIn.value.trim(),
        time: 'Just now',
        doodle: doodleRef
      };

      // save to storage
      let logs = localStorage.getItem('brew_brush_guestbook');
      logs = logs ? JSON.parse(logs) : [
        { name: 'Emma Rose', message: 'This is the coziest virtual spot! Loved customizing my rose coffee.', time: '10 mins ago', doodle: null }
      ];
      logs.push(logEntry);
      localStorage.setItem('brew_brush_guestbook', JSON.stringify(logs));

      // Append
      addGuestToDOM(logEntry);

      // reset form
      nameIn.value = '';
      msgIn.value = '';
      checkAttach.checked = false;
      
      guestWall.scrollTop = 0;
    });
  }


  // --- INIT ---
  window.addEventListener('DOMContentLoaded', () => {
    renderMenu(menuItems);
    loadGuestbook();
    updateCupSize('M');
    updateDrinkDisplay();
  });

})();
