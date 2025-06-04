import React, { useState } from 'react';
import './CapitalRaise.css';
import Image from './assets/images/tishaimage.jpg';
import { Link } from 'react-router-dom';

const CapitalRaise = () => {
  const [selectedOption, setSelectedOption] = useState('launchASAP');

  // Content for founders who want to take their time
  const renderContent = () => {
    if (selectedOption === 'takeTime') {
      return (
        <div className="timeline-section">
          <div className="timeline-step">
            <div className="step-card">
              <h3>Market Research & Validation</h3>
              <p>2-4 weeks</p>
              <p>Understand your target market, identify customer pain points, and validate your business idea to maximize success.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Business Model & Financial Planning</h3>
              <p>2-3 weeks</p>
              <p>Develop a detailed business plan including revenue models, projected financials, and funding requirements.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Pitch Preparation & Review</h3>
              <p>1 week</p>
              <p>Create compelling pitch materials (deck, executive summary) and refine them with feedback from mentors or advisors.</p>
            </div>
          </div>
        </div>
      );
    } else {
      // Content for founders who want to launch ASAP
      return (
        <div className="timeline-section">
          <div className="timeline-step">
            <div className="step-card">
              <h3>Campaign Setup & Launch</h3>
              <p>1 day</p>
              <p>Create your fundraising campaign page and start inviting investors immediately.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Regulatory Filing & Compliance</h3>
              <p>2-3 weeks</p>
              <p>We assist with filing necessary legal paperwork to ensure your campaign complies with all regulations.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Investor Communication & Support</h3>
              <p>Ongoing</p>
              <p>Receive hands-on support in engaging your investors, answering queries, and building trust.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Funds Disbursement</h3>
              <p>Within days of closing</p>
              <p>Access your raised funds quickly via wire transfer or scheduled disbursements.</p>
            </div>
          </div>
        </div>
      );
    }
  };

  // Additional steps after raising capital
  const renderAdditionalBoxes = () => {
    return (
      <div className="additional-timeline">
        <div className="timeline-step">
          <div className="step-card">
            <h3>Operational Scaling</h3>
            <p>2-3 months</p>
            <p>Use the capital raised to expand your team, develop products, and scale marketing efforts.</p>
          </div>
        </div>
        <div className="timeline-step">
          <div className="step-card">
            <h3>Investor Relations & Community</h3>
            <p>Ongoing</p>
            <p>Keep investors engaged with regular updates and foster a community to support long-term growth.</p>
          </div>
        </div>
        <div className="timeline-step">
          <div className="step-card">
            <h3>Impact Tracking & Reporting</h3>
            <p>Ongoing</p>
            <p>Measure and communicate your social, environmental, or financial impact to maintain transparency.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="capital-raise-container">
      <div className="capital-raise-header">
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '500',
          color: 'white',
          textAlign: 'center',
          marginBottom: '20px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          lineHeight: '1.3',
          fontFamily: "'Roboto', sans-serif"
        }}>
          Beyond Capital: Building a Community of Support
        </h1>
        <p style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
          Connect with thousands of passionate Indian investors who believe in your vision. 
          Raise funds, grow your network, and turn your dream into reality.
        </p>
      </div>

      <div className="testimonial-section">
        <div className="testimonial-sidebar">
          <ul>
            <li>Advocate for your mission</li>
            <li>Connect you with new customers</li>
            <li>Provide valuable referrals</li>
            <li>Boost your market credibility</li>
            <li>Offer ongoing feedback and support</li>
          </ul>
        </div>

        <div className="testimonial-content">
          <blockquote style={{
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: '#555',
            borderLeft: '4px solid #6c757d',
            paddingLeft: '15px',
            margin: '20px 0',
            lineHeight: '1.6',
            fontFamily: "sans-serif"
          }}>
            "In just one year, we grew our sales to over ₹6 crore thanks to the belief and backing of our investor community. 
            Their support means everything to us."
            <span className="highlight" style={{
              color: 'teal',
              fontWeight: 'bold'
            }}>
              &nbsp;This is a partnership I’m proud to be part of.
            </span>
          </blockquote>

          <p className="author">
            <strong style={{ fontSize: '25px' }}>Tisha Gupta</strong>
            <br />
            <span style={{ color: 'gray', fontWeight: 'bold' }}>Founder, Indian Organic Foods</span>
            <br />
            <span style={{ color: 'gray', fontWeight: 'bold' }}>Raised ₹5 crore from 2,000+ investors</span>
          </p>
        </div>
        <div className="testimonial-image">
          <img src={Image} alt="Tisha Gupta" />
        </div>
      </div>

      <div className="raise-page">
        <div className="header-section">
          <h1 className="main-heading">
            Take <span className="highlight">full control</span> of your capital raise
          </h1>
          <p className="sub-heading">
            Set your valuation, terms, and tell your story your way. 
            Our expert team supports you from fundraising strategy to legal compliance.
          </p>
          <div className="button-group">
            <button
              className={`btn ${selectedOption === 'takeTime' ? 'active' : ''}`}
              onClick={() => setSelectedOption('takeTime')}
            >
              I can take my time
            </button>
            <button
              className={`btn ${selectedOption === 'launchASAP' ? 'active' : ''}`}
              onClick={() => setSelectedOption('launchASAP')}
            >
              I need to launch ASAP
            </button>
          </div>
        </div>

        {renderContent()}
        {renderAdditionalBoxes()}
      </div>

      <section className="capital-raise">
        <h2>Support at Every Step, From Idea to Funding</h2>
        <div className="timeline">
          <div className="step">
            <div className="circle step-1"><span>1</span></div>
            <p>Apply Online</p>
          </div>
          <div className="step">
            <div className="circle step-2"><span>2</span></div>
            <p>Craft Your Story</p>
          </div>
          <div className="step">
            <div className="circle step-3"><span>3</span></div>
            <p>Set Terms & Valuation</p>
          </div>
          <div className="step">
            <div className="circle step-4"><span>4</span></div>
            <p>Prepare Legal Documents</p>
          </div>
          <div className="step">
            <div className="circle step-5"><span>5</span></div>
            <p>Launch Your Campaign</p>
          </div>
        </div>
        <button className="get-started">Get Started</button>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <h2>CrowdFunding</h2>
              <p className="footer-description">Empowering dreams and bringing projects to life. Join us to create meaningful change.</p>
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
};

export default CapitalRaise;
