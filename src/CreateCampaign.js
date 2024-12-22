// src/CreateCampaign.js
import React, { useState } from "react";
import "./createCampaign.css";
import { Link } from "react-router-dom";
import fundImage from "./assets/images/fund8.png";

const CreateCampaign = ({ addCampaign }) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    goal: "",
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
    addCampaign(campaign);
    alert("Campaign created successfully!");
    setCampaign({
      title: "",
      description: "",
      goal: "",
      image: null,
    });
  };

  return (
    <div className="create-campaign-page">
      {/* Campaign Form */}
      <h1 className="categories-title" style={{ color: "teal" }}>
        Explore Fundraising Ideas
      </h1>

      <div className="fundraising-container">
        <div className="content">
          <div className="steps">
            <div className="step">
              <h1>1.</h1>
              <div>
                <h2>Start a free fundraiser</h2>
                <p>Start a free fundraiser by filling in all the relevant details</p>
              </div>
            </div>
            <div className="step">
              <h1>2.</h1>
              <div>
                <h2>Share Your Fundraiser</h2>
                <p>Share your fundraiser with friends, family, and strangers to raise funds quickly</p>
              </div>
            </div>
            <div className="step">
              <h1>3.</h1>
              <div>
                <h2>Withdraw All Donations</h2>
                <p>Withdraw all the money you receive at any point in your fundraising journey</p>
              </div>
            </div>

            <p className="success-message">
              Your fundraising journey is successful! We wish you a speedy recovery!
            </p>

            <div className="buttons">
              <button className="cta-btn">START A FREE FUNDRAISER</button>
              <button className="secondary-btn">GET A CALLBACK</button>
            </div>
          </div>

          {/* Lottie Animation */}
          <div className="animation">
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json"
              background="transparent"
              speed="1"
              style={{ width: "100%", height: "auto" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>

      {/* Fundraising Categories */}
      <section className="categories">
        <div className="category-list">
          <div className="category-column">
            <h3 className="category-heading">Popular Causes</h3>
            <ul>
              <li>🐾 Animal Causes</li>
              <li>🩺 Cancer</li>
              <li>🚀 Entrepreneurial Projects</li>
              <li>🎓 Kids</li>
              <li>🌟 Nonprofit Causes</li>
              <li>🏃 Runs, Walks, and Rides</li>
            </ul>
          </div>
          <div className="category-column">
            <h3 className="category-heading">Additional Causes</h3>
            <ul>
              <li>✈️ Trips and Adventures</li>
              <li>🎖️ Military and Veterans</li>
              <li>🏥 Medical Expenses</li>
              <li>🏫 Schools and Education</li>
              <li>⚽ Sports Teams</li>
              <li>🗳️ Political Campaigns</li>
            </ul>
          </div>
        </div>
        {/* Image next to the categories */}
        <div className="category-image">
          <img src={fundImage} alt="Fundraising Ideas" />
        </div>
      </section>

      {/* Explore Ideas Section */}
      <section className="explore-ideas-section">
        <div className="campaign-ideas-container">
          <div className="campaign-idea">
            <h3>Health & Wellness Initiative</h3>
            <p>
              Raising funds to provide health services and wellness programs for underprivileged
              communities.
            </p>
          </div>
          <div className="campaign-idea">
            <h3>Animal Shelter Development</h3>
            <p>Supporting the creation of safe spaces for abandoned and rescued animals.</p>
          </div>
          <div className="campaign-idea">
            <h3>Educational Support Fund</h3>
            <p>
              Creating scholarships and programs to support students from disadvantaged
              backgrounds.
            </p>
          </div>
          <div className="campaign-idea">
            <h3>Clean Water Access</h3>
            <p>Campaign to bring clean and safe drinking water to remote villages.</p>
          </div>
          <div className="campaign-idea">
            <h3>Startup Incubator</h3>
            <p>
              Support for innovative entrepreneurs looking to launch their startups and ideas.
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="join-us">
        <h2>Join Us and Make a Difference!</h2>
        <p>
          Start a campaign, share your story, and gather support to make your dream a reality.
        </p>
        <Link to="/explore" className="join-us-button">
          Explore Campaigns
        </Link>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <h2>CrowdFunding</h2>
              <p className="footer-description">
                Empowering dreams and bringing projects to life. Join us to create change.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-link-column">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/explore">Explore</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-link-column">
                <h3>Resources</h3>
                <ul>
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="footer-link-column">
                <h3>Follow Us</h3>
                <div className="footer-social">
                  <a href="#" className="social-link">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div className="footer-link-column">
                <h3>Newsletter</h3>
                <p>Stay updated with our latest news and campaigns.</p>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="newsletter-input"
                />
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
