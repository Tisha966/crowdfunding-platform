import React, { useState, useEffect } from 'react';
import './CapitalRaise.css';
import { Link } from 'react-router-dom';
import Image from './assets/images/tisha.jpg'; // Ensure the path is correct


function CapitalRaise() {
  const [selectedOption, setSelectedOption] = useState('launchASAP');

  const renderContent = () => {
    if (selectedOption === 'takeTime') {
      return (
        <div className="timeline-section">
          <div className="timeline-step">
            <div className="step-card">
              <h3>Research & Planning</h3>
              <p>2-4 weeks</p>
              <p>Take your time to strategize and plan your campaign effectively.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Drafting & Review</h3>
              <p>2-3 weeks</p>
              <p>Draft your pitch and get feedback to refine your campaign.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Launch Prep</h3>
              <p>1 week</p>
              <p>Finalize materials and prepare for a smooth launch.</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="timeline-section">
          <div className="timeline-step">
            <div className="step-card">
              <h3>Set Up & Launch</h3>
              <p>1 day</p>
              <p>Create your pitch and invite customers to invest in the same day.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>SEC Filing</h3>
              <p>3 weeks</p>
              <p>We’ll file your paperwork with the SEC so you can get your funds ASAP.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Legal Setup</h3>
              <p>2 weeks</p>
              <p>We’ll support you every step of the way.</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-card">
              <h3>Get Funds</h3>
              <p>1 day</p>
              <p>Receive a single wire, or draw down in tranches.</p>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderAdditionalBoxes = () => {
    return (
      <div className="additional-timeline">
        <div className="timeline-step">
          <div className="step-card">
            <h3>Scale Operations</h3>
            <p>2-3 months</p>
            <p>Expand your team and operations to match your growth goals.</p>
          </div>
        </div>
        <div className="timeline-step">
          <div className="step-card">
            <h3>Community Engagement</h3>
            <p>Ongoing</p>
            <p>Leverage your community of investors for continuous feedback and support.</p>
          </div>
        </div>
        <div className="timeline-step">
          <div className="step-card">
            <h3>Impact Measurement</h3>
            <p>Ongoing</p>
            <p>Track and share the impact of your business with stakeholders.</p>
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
          More than just a capital raise
        </h1>

        <p>
          Now you have thousands of Indian investors who will support your vision.
          Just ask, and they might...
        </p>
      </div>

      <div className="testimonial-section">
        <div className="testimonial-sidebar">
          <ul>
            <li>Be your ambassadors</li>
            <li>Expand your network</li>
            <li>Refer customers to you</li>
            <li>Support your vision</li>
            <li>Enhance your credibility</li>
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
            "In year 1, we scaled our product sales to over ₹6 crore. Our community
            investors are proud to be associated with us and say, 
            <span className="highlight" style={{
              color: 'teal',
              fontWeight: 'bold'
            }}>
              This is something I’m proud to back.
            </span>"
          </blockquote>

          <p className="author">
            <strong style={{ fontSize: '25px' }}>Tisha Gupta</strong>
            <br />
            <span style={{ color: 'gray', fontWeight: 'bold' }}>Founder, Indian Organic Foods</span>
            <br />
            <span style={{ color: 'gray', fontWeight: 'bold' }}>Raised ₹5 crore from 2,000 investors</span>
          </p>
        </div>
        <div className="testimonial-image">
          <img src={Image} alt="Tisha Gupta" />
        </div>
      </div>

      <div className="raise-page">
        <div className="header-section">
          <h1 className="main-heading">
            Take <span className="highlight">total control</span> of your raise
          </h1>
          <p className="sub-heading">
            Set your own valuation, terms, and narrative on your campaign page. Our team will
            support you with anything ranging from fundraising strategy to legal.
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
    </div>
  );
}

export default CapitalRaise;
