// src/CreateCampaign.js
import React, { useState } from 'react';
import './createCampaign.css';
import { Link } from 'react-router-dom';

const CreateCampaign = ({ addCampaign }) => {
  const [campaign, setCampaign] = useState({
    title: '',
    description: '',
    goal: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign({ ...campaign, [name]: value });
  };

  const handleImageUpload = (e) => {
    setCampaign({ ...campaign, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the campaign to the parent component state
    addCampaign(campaign);
    alert('Campaign created successfully!');
    // Clear the form
    setCampaign({
      title: '',
      description: '',
      goal: '',
      image: null,
    });
  };

  return (
    <div className="create-campaign-page">
      <h1 className="create-campaign-title">Create a New Campaign</h1>
      <form onSubmit={handleSubmit} className="campaign-form">
        <label htmlFor="title">Campaign Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={campaign.title}
          onChange={handleChange}
          placeholder="Enter campaign title"
          required
        />

        <label htmlFor="description">Campaign Description</label>
        <textarea
          id="description"
          name="description"
          value={campaign.description}
          onChange={handleChange}
          placeholder="Describe your campaign"
          required
        />

        <label htmlFor="goal">Funding Goal ($)</label>
        <input
          type="number"
          id="goal"
          name="goal"
          value={campaign.goal}
          onChange={handleChange}
          placeholder="Enter funding goal"
          required
        />

        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageUpload}
          required
        />

        <button type="submit" className="submit-button">Create Campaign</button>
      </form>

      {/* Join Us Section */}
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
      
      export default CreateCampaign;
      
