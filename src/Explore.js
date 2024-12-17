import React, { useState } from 'react';
import './explore.css'; // CSS file for styling
import { Link } from 'react-router-dom';
import schoolImage from "./assets/images/school1.jpg";
import waterImage from "./assets/images/water.jpg";
import shelterImage from "./assets/images/disaster.jpg";
import farmerImage from "./assets/images/farmer.jpg";
import aidImage from "./assets/images/aid.jpg";
import forestImage from "./assets/images/forest.jpg";


const Explore = () => {
  // Campaigns data (sample)
  const [campaigns] = useState([
    {
      id: 1,
      title: 'Help My Mother, Anjana Vats Fight Recurrence of Very Aggressive Cancer',
      raised: '₹4,06,089',
      daysLeft: 41,
      supporters: 208,
      donationTime: 'Last donation an hour ago',
      image: 'https://via.placeholder.com/300x200', // Replace with actual image URL
    },
    {
      id: 2,
      title: 'Help Tushar Soni Fight Acute Mixed Phenotype Leukemia',
      raised: '₹3,00,931',
      daysLeft: 10,
      supporters: 121,
      donationTime: 'Last donation 40 minutes ago',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      title: 'Contribution for Ravi - Cancer Treatment Support',
      raised: '₹12,73,339',
      daysLeft: 4,
      supporters: 275,
      donationTime: 'Last donation 2 days ago',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 4,
      title: 'Help Provide Medical Aid to Street Children',
      raised: '₹2,14,589',
      daysLeft: 25,
      supporters: 132,
      donationTime: 'Last donation 1 hour ago',
      image: aidImage,
    },
    {
      id: 5,
      title: 'Support Ramesh’s Family After Tragic Accident',
      raised: '₹1,85,000',
      daysLeft: 15,
      supporters: 98,
      donationTime: 'Last donation 5 hours ago',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 6,
      title: 'Empower Rural Students with Education Resources',
      raised: '₹5,00,000',
      daysLeft: 60,
      supporters: 500,
      donationTime: 'Last donation 2 hours ago',
      image: schoolImage,
    },
    {
      id: 7,
      title: 'Provide Clean Drinking Water to Remote Villages',
      raised: '₹3,50,000',
      daysLeft: 30,
      supporters: 215,
      donationTime: 'Last donation 3 hours ago',
      image: waterImage,
    },
    {
      id: 8,
      title: 'Help Build Shelters for Homeless People',
      raised: '₹7,20,000',
      daysLeft: 12,
      supporters: 380,
      donationTime: 'Last donation 1 day ago',
      image: forestImage,
    },
    {
      id: 9,
      title: 'Assistance for Victims of Natural Disasters',
      raised: '₹6,50,000',
      daysLeft: 9,
      supporters: 290,
      donationTime: 'Last donation 30 minutes ago',
      image: shelterImage,
    },
    {
      id: 10,
      title: 'Donate for Education of Orphan Children',
      raised: '₹2,95,000',
      daysLeft: 18,
      supporters: 162,
      donationTime: 'Last donation 4 hours ago',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 11,
      title: 'Help Fund Surgical Procedures for Children',
      raised: '₹9,10,000',
      daysLeft: 28,
      supporters: 360,
      donationTime: 'Last donation 3 hours ago',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 12,
      title: 'Assist Farmers with Seed and Water Supply',
      raised: '₹3,50,000',
      daysLeft: 19,
      supporters: 210,
      donationTime: 'Last donation 1 day ago',
      image: farmerImage,
    },
  
  ]);

  return (
    <div className="explore-page">
     {/* Filtering Section */}
<div className="filters">
  <span style={{ fontWeight: 'bold', color: '#333' }}>Showing fundraisers for </span>
  <select>
    <option>All Categories</option>
    <option>Education</option>
    <option>Medical</option>
  </select>
  <span style={{ fontWeight: 'bold', color: '#333' }}> under </span>
  <select>
    <option>Trending</option>
    <option>Newest</option>
  </select>
  <span style={{ fontWeight: 'bold', color: '#333' }}> from </span>
  <select>
    <option>All Locations</option>
    <option>India</option>
    <option>USA</option>
  </select>
  <button className="reset-filters">Reset Filters</button>
</div>

      {/* Campaign Cards */}
      <div className="campaign-container">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <img src={campaign.image} alt={campaign.title} className="campaign-image" />
            <h3 className="campaign-title">{campaign.title}</h3>
            <p className="campaign-raised">{campaign.raised} raised</p>
            <p className="campaign-info">{campaign.donationTime}</p>
            <div className="campaign-footer">
              <span>{campaign.daysLeft} Days Left</span>
              <span>{campaign.supporters} Supporters</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="bottom-banner">
        <h3>Start Monthly Donations To Save Lives</h3>
        <button className="monthly-donation-btn">Start Giving Monthly</button>
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

export default Explore;