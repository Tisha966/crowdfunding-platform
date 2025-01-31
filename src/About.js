import React from "react";
import "./about.css";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      {/* Investor Stats Section */}
      <div className="stats-container">
        <h2 className="stats-header" style={{color:"teal"}}>JOIN OVER 1 MILLION INVESTORS</h2>
        <div className="stats">
          <div className="stat">
          <h1>₹18,750</h1>
        <p>Median Investment</p>
      </div>
      <div className="stat">
        <h1>3,571</h1>
        <p>Founders Funded</p>
      </div>
      <div className="stat">
        <h1 style={{ color:"#ff7f50"}}>₹6,300 Cr</h1>
        <p>Raised on Wefunder</p>
      </div>
        </div>
        <div className="tags-container">
  <div className="tags">
    <span className="no-move">📊 Virtual Reality Workspaces</span>
    <span className="no-move">🐾 A Cure for Cancer in Dogs</span>
    <span className="no-move">📰 Increasing Media Literacy</span>
    <span className="no-move">🛒 Community-Owned Supermarkets</span>
    <span className="no-move">🍶 Artisanal Korean Rice Wines</span>
    <span className="no-move">💉 Vaccine Distribution at Scale</span>
    <span className="no-move">🍺 A Brewery in the Heart of America</span>
    <span className="no-move">🌍 Global Climate Change Solutions</span>
    <span className="no-move">🎓 Free Education for Underprivileged Kids</span>
    <span className="no-move">🛠️ Innovations in Renewable Energy</span>
    <span className="no-move">🌱 Urban Farming Initiatives</span>
    <span className="move">🤖 AI-Powered Healthcare Systems</span>
    <span className="move">🚀 Space Exploration Technologies</span>
    <span className="move">📱 Next-Gen Mobile Applications</span>
    <span className="move">🍃 Zero-Waste Sustainable Products</span>
    <span className="move">📚 AI-Driven Learning Platforms</span>
    <span className="move">📰 Increasing Media Literacy</span>
    <span className="move">🛒 Community-Owned Supermarkets</span>
    <span className="move">🍶 Artisanal Korean Rice Wines</span>
    <span className="move">💉 Vaccine Distribution at Scale</span>
    
  </div>
</div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-container">
  <div className="testimonial-card">
    <p>"Investing in sustainable agriculture is the future. I believe in supporting farmers and their innovations."</p>
    <h4>Ravi Kumar</h4>
    <span>Invested in Organic Farm Innovations</span>
  </div>

  <div className="testimonial-card">
    <p>"This platform gives us an opportunity to invest in the green energy sector. Great way to be part of the change!"</p>
    <h4>Anjali Sharma</h4>
    <span>Invested in Solar Energy Solutions</span>
  </div>

  <div className="testimonial-card">
    <p>"I love that I can support local artisans. Crowdfunding is a fantastic way to empower Indian entrepreneurs!"</p>
    <h4>Vikram Singh</h4>
    <span>Invested in Handmade Indian Artifacts</span>
  </div>

  <div className="testimonial-card">
    <p>"The idea of making education affordable and accessible to everyone in India is something I'm deeply passionate about."</p>
    <h4>Priya Gupta</h4>
    <span>Invested in EdTech for Rural India</span>
  </div>

  <div className="testimonial-card">
    <p>"This platform is enabling a new era of crowdfunding in India. Exciting to see projects grow and make a difference!"</p>
    <h4>Raghav Mehta</h4>
    <span>Invested in India’s First Smart Village</span>
  </div>
  
  <div className="testimonial-card">
    <p>"I love that I can support local artisans. Crowdfunding is a fantastic way to empower Indian entrepreneurs!"</p>
    <h4>Mansi Shukla</h4>
    <span>Invested in Handmade Indian Artifacts</span>
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
                      <p style={{color:"gray"}}>Stay updated with our latest news and campaigns.</p>
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

export default About;
