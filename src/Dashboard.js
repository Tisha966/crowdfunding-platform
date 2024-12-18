import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import for routing
import './Dashboard.css'; // Import the CSS for styling
import saveImage from './assets/images/mental.jpg';
import waterImage from './assets/images/water.jpg';
import schoolImage from './assets/images/school1.jpg';

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h2>All Categories</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            ×
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard/contribute">Contribute</Link>
          </li>
          <li>
            <Link to="/dashboard/fundraise">Fundraise</Link>
          </li>
          <li>
            <Link to="/dashboard/my-profile">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/my-campaigns">My Campaigns</Link>
          </li>
          <li>
            <Link to="/dashboard/logout">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`dashboard-content ${sidebarVisible ? 'shifted' : ''}`}>
        {/* Open Menu Icon */}
        <div className="toggle-btn" onClick={toggleSidebar}>
          &gt;
        </div>

        {/* Option Selection */}
        <div className="options">
          <div className="option-card">
            <h3 style={{ color: 'teal' }}>Login as a Contributor</h3>
            <p>Want to contribute to a campaign? Click below.</p>
            <Link to="/contribute" className="option-btn">
              Contribute
            </Link>
          </div>
          <div className="option-card">
            <h3 style={{ color: 'teal' }}>Login as a Fundraiser</h3>
            <p>Want to create a campaign? Click below.</p>
            <Link to="/fundraise" className="option-btn">
              Fundraise
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-container">
        
            <Link to={`/campaignDetails/12345`} className="action-card">
              <i className="fas fa-plus"></i>
              <p>Create New Campaign</p>
            </Link>
            <Link to="/explore" className="action-card">
              <i className="fas fa-eye"></i>
              <p>View Campaigns</p>
            </Link>
            <Link to="/create-Campaign" className="action-card">
              <i className="fas fa-chart-line"></i>
              <p>View Analytics</p>
            </Link>
            <Link to="/dashboard/settings" className="action-card">
              <i className="fas fa-cog"></i>
              <p>Settings</p>
            </Link>
          </div>
        </div>

        {/* Footer */}
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
    </div>
  );
};

export default Dashboard;
