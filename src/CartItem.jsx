import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { useState } from 'react';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.cost.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    setShowComingSoon(true);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowComingSoon(false);
    }, 3000);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="get-started-button" onClick={handleContinueShopping}>Start Shopping</button>
        </div>
      ) : (
        <>
          <h2 className="total-amount">Total Cart Amount: ${calculateTotalAmount()}</h2>
          
          <div className="cart-items-container">
            {cart.map(item => (
              <div className="cart-item" key={item.id || item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-description">{item.description}</div>
                  <div className="cart-item-cost">Price: {item.cost}</div>
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-button cart-item-button-dec" 
                      onClick={() => handleDecrement(item)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button 
                      className="cart-item-button cart-item-button-inc" 
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="total-cart-amount">
              <span>Subtotal:</span>
              <span>${calculateTotalAmount()}</span>
            </div>
            <div className="total-cart-amount">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-cart-amount grand-total">
              <span>Total:</span>
              <span>${calculateTotalAmount()}</span>
            </div>
          </div>
          
          <div className="cart-actions">
            <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
            <button className="get-started-button1" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
          
          {showComingSoon && (
            <div className="coming-soon-toast">
              <div className="coming-soon-content">
                <span className="coming-soon-icon">🚀</span>
                <p>Checkout functionality coming soon!</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartItem;