
import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleGetStartedClick = () => {
    setCurrentPage('plants');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      {currentPage === 'home' && (
        <div className="landing-page">
          <div className="background-image"></div>

          <div className="content">
            <div className="landing_content">
              <h1>Welcome to Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>

              <button
                className="get-started-button"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </div>

            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      )}

      {currentPage === 'plants' && (
        <div className="product-list-container visible">
          <ProductList onNavigate={handleNavigate} />
        </div>
      )}

      {currentPage === 'cart' && (
        <CartItem
          onNavigate={handleNavigate}
          onContinueShopping={() => setCurrentPage('plants')}
        />
      )}
    </div>
  );
}

export default App;
