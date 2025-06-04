import React from 'react';
import './createCampaign.css';
 // Scoped footer styles
import fundImage from './assets/images/fund12.jpg'; // Ensure the path is correct
import { Link } from 'react-router-dom';

function CreateCampaign() {
  return (
    <div className="create-campaign-wrapper">
      <div className="container">
        <div className="overlay">
          <div className="header">
            <h1>Explore Various Crowdfunding Ideas </h1>
          </div>
          <div className="options">
            <div className="option">
              <h2>Community Development</h2>
              <p>Help fund projects that improve local communities, such as building parks, creating shelters for the homeless.</p>
            </div>
            <div className="option">
              <h2>Education Scholarships</h2>
              <p>Support students who are struggling with tuition fees by contributing to educational scholarships.</p>
            </div>
            <div className="option">
              <h2>Disaster Relief</h2>
              <p>Assist communities affected by natural disasters like earthquakes, floods, and hurricanes.</p>
            </div>
            <div className="option">
              <h2>Small Business Support</h2>
              <p>Invest in local small businesses or startups. Crowdfunding can help entrepreneurs.</p>
            </div>
            <div className="option">
              <h2>Creative Projects</h2>
              <p>Support artists, musicians, filmmakers, and writers in bringing their creative projects to life.</p>
            </div>
            <div className="option">
              <h2>Environmental Causes</h2>
              <p>Fund initiatives that help protect the environment, like tree planting campaigns.</p>
            </div>
            <div className="option">
              <h2>Tech Innovation</h2>
              <p>Contribute to the development of new tech products and innovations that aim to solve real-world problems.</p>
            </div>
            <div className="option">
              <h2>Humanitarian Aid</h2>
              <p>Provide relief to refugees, displaced persons who are facing hardships due to political or social conflicts.</p>
            </div>
            <div className="option">
              <h2>Animal Welfare</h2>
              <p>Support animal shelters and wildlife conservation efforts that aim to protect endangered species.</p>
            </div>
            <div className="option">
              <h2>Sports Funding</h2>
              <p>Help athletes and sports teams with the resources they need to pursue their goals.</p>
            </div>
          </div>
        </div>
      </div>
 
      {/* Custom Footer only for this page */}
      <footer className="create-campaign-footer">
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
                  <li><Link to="/faq">FAQ</Link></li>
                </ul>
              </div>

              <div className="footer-link-column">
                <h3>Follow Us</h3>
                <div className="footer-social">
                  <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>

              <div className="footer-link-column">
                <h3>Newsletter</h3>
                <p style={{ color: "gray" }}>Stay updated with our latest news and campaigns.</p>
                <input type="email" placeholder="Your Email" className="newsletter-input" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p style={{ color: "whitesmoke" }}>&copy; 2024 CrowdFunding. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CreateCampaign;
