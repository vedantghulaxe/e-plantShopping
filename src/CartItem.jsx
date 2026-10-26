
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onNavigate }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const navigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else if (page === 'plants' && onContinueShopping) {
      onContinueShopping();
    }
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.cost) * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    window.alert('Checkout Coming Soon!');
  };

  return (
    <div className="cart-page">
      <nav
        className="cart-navbar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '16px 5%',
          backgroundColor: '#2e7d32',
          color: '#fff',
        }}
      >
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('home')}
        >
          Paradise Nursery
        </h2>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('home')}>Home</button>
          <button onClick={() => navigate('plants')}>Plants</button>
          <button onClick={() => navigate('cart')}>
            Cart ({totalItems})
          </button>
        </div>
      </nav>

      <main className="cart-container">
        <h1>Shopping Cart</h1>

        <h2 style={{ color: '#222' }}>
          Total Cart Amount: ₹{totalAmount.toFixed(2)}
        </h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty!</h3>
            <p>Add some beautiful plants to get started.</p>
            <button
              className="get-started-button"
              onClick={() => navigate('plants')}
            >
              Browse Plants
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>

                  <p className="cart-item-cost">
                    Unit Price: ₹{Number(item.cost).toFixed(2)}
                  </p>

                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button cart-item-button-dec"
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </button>

                    <span className="cart-item-quantity-value">
                      {item.quantity}
                    </span>

                    <button
                      className="cart-item-button cart-item-button-inc"
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-total">
                    Total: ₹
                    {(Number(item.cost) * item.quantity).toFixed(2)}
                  </p>

                  <button
                    className="cart-item-delete"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <h2 className="total_cart_amount">
              Grand Total: ₹{totalAmount.toFixed(2)}
            </h2>

            <div className="continue_shopping_btn">
              <button
                className="get-started-button"
                onClick={() => navigate('plants')}
              >
                Continue Shopping
              </button>

              <button
                className="get-started-button1"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CartItem;
