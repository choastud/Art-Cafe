'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RotateCcw, Plus, ShoppingCart } from 'lucide-react';

export default function EspressoBar() {
  const { addToCart } = useCart();
  const [size, setSize] = useState('M'); // 'S', 'M', 'L'
  const [layers, setLayers] = useState({
    espresso: 0,
    milk: 0,
    water: 0,
    caramel: 0,
    foam: 0,
  });
  const [toppings, setToppings] = useState({
    cinnamon: false, // Cocoa Shavings
    sprinkles: false, // Gold Cinnamon
  });

  const handleSizeChange = (newSize) => {
    setSize(newSize);
  };

  const handleAddIngredient = (ingredient) => {
    const currentTotal = Object.values(layers).reduce((acc, val) => acc + val, 0);
    if (currentTotal >= 100) {
      alert('Cup is full! Click Reset to brew a new one.');
      return;
    }
    setLayers((prev) => ({
      ...prev,
      [ingredient]: prev[ingredient] + 20,
    }));
  };

  const handleToggleTopping = (topping) => {
    setToppings((prev) => ({
      ...prev,
      [topping]: !prev[topping],
    }));
  };

  const handleReset = () => {
    setLayers({
      espresso: 0,
      milk: 0,
      water: 0,
      caramel: 0,
      foam: 0,
    });
    setToppings({
      cinnamon: false,
      sprinkles: false,
    });
  };

  // Calculations
  const totalPercentage = Object.values(layers).reduce((acc, val) => acc + val, 0);
  
  const getDrinkName = () => {
    if (totalPercentage === 0) return 'Empty Mug';
    if (layers.espresso > 0 && layers.milk > 0 && layers.foam > 0 && layers.water === 0) {
      return 'Fluffy Cappuccino';
    }
    if (layers.espresso > 0 && layers.milk > 0 && layers.caramel > 0) {
      return 'Caramel Macchiato';
    }
    if (layers.espresso > 0 && layers.water > 0) {
      return 'Café Americano';
    }
    if (layers.espresso > 0 && layers.milk > 0 && layers.foam === 0) {
      return 'Cozy Latte';
    }
    return 'Custom Brew';
  };

  const getRecipeDescription = () => {
    if (totalPercentage === 0) return 'Add ingredients to customize.';
    
    const parts = [];
    Object.entries(layers).forEach(([ing, pct]) => {
      if (pct > 0) {
        parts.push(`${pct}% ${ing.charAt(0).toUpperCase() + ing.slice(1)}`);
      }
    });

    if (toppings.cinnamon) parts.push('Cocoa Shavings');
    if (toppings.sprinkles) parts.push('Gold Cinnamon');

    return parts.join(' + ');
  };

  const getPrice = () => {
    const basePrice = size === 'S' ? 4.50 : size === 'M' ? 5.50 : 6.50;
    const toppingPrice = toppings.cinnamon || toppings.sprinkles ? 0.50 : 0.0;
    return basePrice + toppingPrice;
  };

  const handleAddDrink = () => {
    if (totalPercentage === 0) return;
    const oz = size === 'S' ? '8 oz' : size === 'M' ? '12 oz' : '16 oz';
    const drinkName = `${oz} ${getDrinkName()}`;
    const recipeDesc = getRecipeDescription();
    const price = getPrice();
    const img = 'https://images.unsplash.com/photo-151097252790b-af4f42df8e40?auto=format&fit=crop&q=80&w=100';

    addToCart(drinkName, price, img, true, recipeDesc);
  };

  const getCupHeight = () => {
    if (size === 'S') return '180px';
    if (size === 'M') return '210px';
    return '245px';
  };

  const ingredientDetails = [
    { key: 'espresso', label: 'Espresso', icon: '☕' },
    { key: 'milk', label: 'Steamed Milk', icon: '🥛' },
    { key: 'water', label: 'Hot Water', icon: '💧' },
    { key: 'caramel', label: 'Caramel Sauce', icon: '🍯' },
    { key: 'foam', label: 'Milk Foam', icon: '☁️' }
  ];

  const handleSaveRecipe = () => {
    if (totalPercentage === 0) return;
    const oz = size === 'S' ? '8 oz' : size === 'M' ? '12 oz' : '16 oz';
    const drinkName = getDrinkName();
    const recipeDesc = getRecipeDescription();
    const price = getPrice();

    const newRecipe = {
      id: `r-${Date.now()}`,
      name: drinkName,
      size: oz,
      desc: recipeDesc,
      price: price
    };

    let saved = localStorage.getItem('brew_brush_custom_recipes');
    saved = saved ? JSON.parse(saved) : [];
    saved.push(newRecipe);
    localStorage.setItem('brew_brush_custom_recipes', JSON.stringify(saved));
    alert(`🧡 "${oz} ${drinkName}" saved to your custom recipes! You can view and manage it on your Studio Dashboard.`);
  };

  return (
    <div className="espresso-bar-layout">
      {/* Mix Controls */}
      <div className="espresso-creator">
        <div className="creator-steps">
          <h3>1. Choose Mug Size</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className={`filter-btn ${size === 'S' ? 'active' : ''}`}
              onClick={() => handleSizeChange('S')}
              style={{ flex: 1 }}
            >
              8 oz (S)
            </button>
            <button
              className={`filter-btn ${size === 'M' ? 'active' : ''}`}
              onClick={() => handleSizeChange('M')}
              style={{ flex: 1 }}
            >
              12 oz (M)
            </button>
            <button
              className={`filter-btn ${size === 'L' ? 'active' : ''}`}
              onClick={() => handleSizeChange('L')}
              style={{ flex: 1 }}
            >
              16 oz (L)
            </button>
          </div>
        </div>

        <div className="creator-steps">
          <h3>2. Layer Ingredients</h3>
          <div className="ingredient-grid">
            {ingredientDetails.map((ing) => (
              <div
                key={ing.key}
                className={`ingredient-card ${layers[ing.key] > 0 ? 'active' : ''}`}
                onClick={() => handleAddIngredient(ing.key)}
                style={{
                  transform: 'scale(1)',
                  transition: 'transform 0.1s'
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)' }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                <span className="ingredient-icon">{ing.icon}</span>
                <span>{ing.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="creator-steps">
          <h3>3. Topping Drizzle</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className={`brush-btn ${toppings.cinnamon ? 'active' : ''}`}
              onClick={() => handleToggleTopping('cinnamon')}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              🍫 Cocoa Shavings
            </button>
            <button
              className={`brush-btn ${toppings.sprinkles ? 'active' : ''}`}
              onClick={() => handleToggleTopping('sprinkles')}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              ✨ Gold Cinnamon
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn-action" onClick={handleReset} style={{ flex: 1 }}>
            <RotateCcw style={{ width: '15px', height: '15px', marginRight: '6px' }} /> Reset
          </button>
          <button
            className="btn-action"
            onClick={handleSaveRecipe}
            disabled={totalPercentage === 0}
            style={{
              flex: 1,
              opacity: totalPercentage === 0 ? 0.5 : 1,
              cursor: totalPercentage === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            🧡 Save Recipe
          </button>
        </div>
        
        <button
          className="btn-primary"
          onClick={handleAddDrink}
          disabled={totalPercentage === 0}
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '1rem',
            marginTop: '0.8rem',
            opacity: totalPercentage === 0 ? 0.5 : 1,
            cursor: totalPercentage === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <Plus style={{ width: '16px', height: '16px', marginRight: '6px' }} />
          Add to Tray (${getPrice().toFixed(2)})
        </button>
      </div>

      {/* Live Cup Visual */}
      <div className="espresso-viewer">
        <div className="glass-cup-holder" style={{ height: getCupHeight() }}>
          <div className="glass-cup-handle"></div>
          <div
            className="glass-cup"
            id="glass-cup-cup"
            style={{ height: getCupHeight() === '245px' ? '240px' : getCupHeight() === '210px' ? '200px' : '170px' }}
          >
            <div className="liquid-contents" id="cup-liquid-layers">
              {Object.entries(layers).map(([ing, pct]) => {
                if (pct <= 0) return null;
                return (
                  <div
                    key={ing}
                    className={`liquid-layer layer-${ing}`}
                    style={{ height: `${pct}%` }}
                  />
                );
              })}
            </div>
          </div>
          <div className="topping-visuals">
            <div className={`topping-item ${toppings.cinnamon ? 'visible' : ''}`} style={{ left: '20px' }}>🍫</div>
            <div className={`topping-item ${toppings.sprinkles ? 'visible' : ''}`} style={{ left: '50px' }}>✨</div>
            <div className={`topping-item ${toppings.sprinkles ? 'visible' : ''}`} style={{ left: '80px' }}>✨</div>
            <div className={`topping-item ${toppings.cinnamon ? 'visible' : ''}`} style={{ left: '100px' }}>🍫</div>
          </div>
        </div>

        <div className="drink-summary-card">
          <h4>
            {totalPercentage > 0 ? `${size === 'S' ? '8 oz' : size === 'M' ? '12 oz' : '16 oz'} ${getDrinkName()}` : 'Empty Mug'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {getRecipeDescription()}
          </p>
        </div>
      </div>
    </div>
  );
}
