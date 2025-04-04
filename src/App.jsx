import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';
import './ProductList.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGetStartedClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowProducts(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 500); // Delay to allow the fade-out animation to complete
  };

  const handleHomeClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowProducts(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 500);
  };

  // Reset animation state on component mount
  useEffect(() => {
    setIsAnimating(false);
  }, []);

  return (
    <div className="app-container">
      {!showProducts ? (
        // Modern Landing Page
        <div className={`landing-page ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          <div className="hero-section">
            <div className="overlay"></div>
            <div className="hero-content">
              <h1 className="main-title">Paradise Nursery</h1>
              <div className="tagline">Where Green Meets Serenity</div>
              <button 
                className="cta-button" 
                onClick={handleGetStartedClick}
              >
                Browse Our Collection
              </button>
            </div>
          </div>
          
          <div className="about-section">
            <AboutUs />
          </div>
          
          <div className="features-section">
            <div className="feature">
              <div className="feature-icon">🌱</div>
              <h3>Premium Plants</h3>
              <p>Carefully cultivated for your home and garden</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌿</div>
              <h3>Expert Advice</h3>
              <p>Guidance for both beginners and experienced gardeners</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌴</div>
              <h3>Sustainable Practices</h3>
              <p>Eco-friendly from seed to delivery</p>
            </div>
          </div>
        </div>
      ) : (
        // Product List with Animation
        <div className={`product-page ${isAnimating ? 'fade-out' : 'pop-in'}`}>
          <ProductList onHomeClick={handleHomeClick} />
        </div>
      )}
    </div>
  );
}

export default App;