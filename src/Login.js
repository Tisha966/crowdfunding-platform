// src/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Simulated login logic
    if (email === "test@example.com" && password === "password") {
      alert('Login successful!');
      navigate('/home'); // Redirect to the home page
    } else {
      alert('Login failed. Redirecting to sign-up page.');
      navigate('/signup'); // Redirect to sign-up page
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login to Your Account</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="separator">
        <span>OR</span>
      </div>
      <button className="google-login-button">
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google icon" />
        Continue with Google
      </button>
      <div className="signup-link">
        <p>Don't have an account? 
          <button onClick={() => navigate('/signup')} className="signup-button"> Sign Up</button>
        </p>
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
      
      export default Login;