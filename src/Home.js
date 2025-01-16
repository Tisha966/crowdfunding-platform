import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import moneyImage from './assets/images/moneyimg.jpg'; 
import fundsImage from './assets/images/fund3.jpg';
import './home.css';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if the user has a saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);



  return (
    <div className={`home-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="home-hero">
      {/* <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  /> */}
        <h1>Welcome to CrowdFunding</h1>
        <p>Empowering ideas, one contribution at a time.</p>
        <Link to="/about">
          <button className="cta-button" style={{backgroundColor:"#ff7f50"}}>ABOUT CROWDFUNDING</button>
        </Link>
      </header>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-heading">Empower Ideas, Fund Dreams</h1>
            <p className="hero-subtext">
              Join our community to explore and support creative campaigns that bring change to the world.
            </p>
            <div className="hero-buttons">
              <Link to="/explore" className="btn-primary">Explore Campaigns</Link>
              <a href="/create-campaign" className="btn-secondary">Explore Ideas</a>
            </div>
          </div>

          <div className="hero-image">
            <img src={fundsImage} alt="Hero Image" />
          </div>
        </div>
      </section>

      <section className="features">
        <h2 style={{color: "#ff7f50"}}>Why Choose Us?</h2>
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
                  <li><a href="/faq">FAQ</a></li>
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
