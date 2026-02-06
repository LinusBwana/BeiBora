import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      alert('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="footer-custom">
      {/* Main Footer Section */}
      <div className="footer-main">
        <div className="container-xl">
          <div className="row g-4">
            
            {/* Column 1 - Brand & Social */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand mb-3">
                <span className="brand-shop">Bei</span>
                <span className="brand-nest">Bora</span>
              </div>
              <p className="footer-tagline">
                Your one-stop destination for quality products, curated with care. 
                Shop smarter, live better.
              </p>
              <div className="social-icons mt-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="col-lg-2 col-md-3 col-6">
              <h5 className="footer-heading">Quick Links</h5>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href="/deals">Deals</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            {/* Column 3 - Support */}
            <div className="col-lg-2 col-md-3 col-6">
              <h5 className="footer-heading">Support</h5>
              <ul className="footer-links">
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/shipping">Shipping & Delivery</a></li>
                <li><a href="/returns">Returns</a></li>
                <li><a href="/track">Track Order</a></li>
                <li><a href="/help">Help Center</a></li>
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div className="col-lg-4 col-md-6">
              <h5 className="footer-heading">Newsletter</h5>
              <p className="footer-tagline mb-3">
                Get exclusive deals & offers straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control newsletter-input" 
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn newsletter-btn" type="submit">
                    Subscribe <i className="fas fa-paper-plane ms-1"></i>
                  </button>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="trust-badges mt-3">
                <div className="trust-item">
                  <i className="fas fa-truck"></i>
                  <span>Free Shipping</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-lock"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-undo"></i>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container-xl">
          <div className="row align-items-center g-3">
            <div className="col-md-4 text-center text-md-start">
              <p className="mb-0">&copy; 2026 ShopNest. All rights reserved.</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="footer-links-inline">
                <a href="/privacy">Privacy Policy</a>
                <span className="divider">|</span>
                <a href="/terms">Terms of Service</a>
                <span className="divider">|</span>
                <a href="/cookies">Cookies</a>
              </div>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <div className="payment-icons">
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-paypal"></i>
                <i className="fab fa-cc-stripe"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;