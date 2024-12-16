// src/Contact.js
import React, { useState } from 'react';
import './contact.css';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="submit-button">Send Message</button>
        </form>

        <div className="social-links">
          <h3>Follow Us</h3>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

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
      
      export default Contact;