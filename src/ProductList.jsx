
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantCategories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Snake Plant', cost: 299, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400' },
      { id: 2, name: 'Peace Lily', cost: 349, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400' },
      { id: 3, name: 'Spider Plant', cost: 249, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400' },
      { id: 4, name: 'Areca Palm', cost: 399, image: 'https://images.unsplash.com/photo-1597055181300-3e9e3a7a5a40?w=400' },
      { id: 5, name: 'Boston Fern', cost: 279, image: 'https://images.unsplash.com/photo-1597055181300-3e9e3a7a5a40?w=400' },
      { id: 6, name: 'Rubber Plant', cost: 449, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400' }
    ]
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { id: 7, name: 'Lavender', cost: 299, image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400' },
      { id: 8, name: 'Jasmine', cost: 249, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400' },
      { id: 9, name: 'Rosemary', cost: 199, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
      { id: 10, name: 'Mint', cost: 149, image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400' },
      { id: 11, name: 'Basil', cost: 179, image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400' },
      { id: 12, name: 'Lemon Balm', cost: 199, image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400' }
    ]
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { id: 13, name: 'Aloe Vera', cost: 199, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400' },
      { id: 14, name: 'ZZ Plant', cost: 399, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400' },
      { id: 15, name: 'Jade Plant', cost: 249, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400' },
      { id: 16, name: 'Pothos', cost: 229, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400' },
      { id: 17, name: 'Lucky Bamboo', cost: 199, image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400' },
      { id: 18, name: 'Succulent Mix', cost: 299, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400' }
    ]
  }
];

const ProductList = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true
    }));
  };

  const handleNavigate = (page) => {
    if (typeof onNavigate === 'function') {
      onNavigate(page);
    }
  };

  return (
    <div className="product-page">
      <nav className="navbar">
        <h2 onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>
          Paradise Nursery
        </h2>

        <div className="navbar-links">
          <button onClick={() => handleNavigate('home')}>Home</button>
          <button onClick={() => handleNavigate('plants')}>Plants</button>
          <button onClick={() => handleNavigate('cart')}>
            Cart ({totalItems})
          </button>
        </div>
      </nav>

      <main className="product-list">
        <h1>Our Plants</h1>
        <p>Bring nature home with our beautiful collection.</p>

        {plantCategories.map((category) => (
          <section className="plant-category" key={category.category}>
            <h2>{category.category}</h2>

            <div className="product-grid">
              {category.plants.map((plant) => (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>Price: ₹{plant.cost.toFixed(2)}</p>

                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={Boolean(addedToCart[plant.name])}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ProductList;
