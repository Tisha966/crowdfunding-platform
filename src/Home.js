// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import moneyImage from './assets/images/moneyimg.jpg'; 
import fundsImage from './assets/images/fund3.jpg';
import './home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-hero">
        <h1>Welcome to CrowdFunding</h1>
        <p>Empowering ideas, one contribution at a time.</p>
        <button className="cta-button">Get Started</button>
      </header>

      <section className="features">
  <h2>Why Choose Us?</h2>
  <div className="feature-cards">
    <div className="feature-card">
      <h3>Easy to Use</h3>
      <p>Simple tools to get your project up and running in minutes.</p>
    </div>
    <div className="feature-card">
      <h3>Community Driven</h3>
      <p>Join a community of creators and supporters worldwide.</p>
    </div>
    <div className="feature-card">
      <h3>Secure Payments</h3>
      <p>Fast and secure transactions to keep your contributions safe.</p>
    </div>
  </div>
</section>


      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-heading">Empower Ideas, Fund Dreams</h1>
            <p className="hero-subtext">
              Join our community to explore and support creative campaigns that bring change to the world.
            </p>
            <div className="hero-buttons">
              <Link to="/explore" className="btn-primary">Explore Campaigns</Link> {/* Link for Explore */}
              <a href="/create-campaign" className="btn-secondary">Create Campaign</a>
            </div>
          </div>

          <div className="hero-image">
            <img src={fundsImage} alt="Hero Image" />
          </div>
        </div>
      </section>

      {/* Updated Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <h2>CrowdFunding</h2>
              <p className="footer-description">Empowering dreams and bringing projects to life. Join us to create change.</p>
            </div>

            <div className="footer-links">
              <div className="footer-link-column">
                <h3>Quick Links</h3>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/explore">Explore</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </ul>
              </div>

              <div className="footer-link-column">
                <h3>Resources</h3>
                <ul>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>

              <div className="footer-link-column">
                <h3>Follow Us</h3>
                <div className="footer-social">
                  <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>

              <div className="footer-link-column">
                <h3>Newsletter</h3>
                <p>Stay updated with our latest news and campaigns.</p>
                <input type="email" placeholder="Your Email" className="newsletter-input" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 CrowdFunding. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
