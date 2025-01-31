import React, { useState, useEffect } from 'react';
import './CapitalRaise.css';
import Image from './assets/images/tisha.jpg'; // Correct path and extension
import { Link } from 'react-router-dom';

function CapitalRaise() {
  const [selectedOption, setSelectedOption] = useState('launchASAP');
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000); // Adjust target amount as needed
  const [percentageRaised, setPercentageRaised] = useState(0);
  const [donors, setDonors] = useState([]);



  useEffect(() => {
    // Calculate the percentage raised whenever the raisedAmount changes
    setPercentageRaised((raisedAmount / targetAmount) * 100);
  }, [raisedAmount, targetAmount]);

  const handleDonation = async (e) => {
    e.preventDefault();
    const donorName = e.target.donorName.value;
    const donationAmount = parseFloat(e.target.donationAmount.value);
  
    if (!isNaN(donationAmount) && donationAmount > 0 && donorName) {
      try {
        const response = await fetch("http://localhost:5001/api/donations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: donorName, amount: donationAmount }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to save donation");
        }
  
        const data = await response.json();
  
        // Update state only after a successful API call
        setRaisedAmount((prev) => prev + donationAmount);
        setDonors((prev) => [...prev, { name: donorName, amount: donationAmount }]);
  
        // Clear input fields
        e.target.donorName.value = "";
        e.target.donationAmount.value = "";
  
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  

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

        {/* Donation Section */}
        <div className="donation-section">
          <h2>Donate to Support Our Vision</h2>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${percentageRaised}%` }}></div>
          </div>
          <div className="fund-info">
            <p>Raised: ₹{raisedAmount.toFixed(2)}</p>
            <p>Target: ₹{targetAmount}</p>
            <p>Percentage Raised: {percentageRaised.toFixed(2)}%</p>
          </div>

          <form onSubmit={handleDonation} className="donation-form">
  <input
    type="text"
    name="donorName"
    placeholder="Enter your name"
    required
  />
  <input
    type="number"
    name="donationAmount"
    placeholder="Enter donation amount"
    min="0.01"
    step="0.01"
    required
  />
  <button type="submit">Donate</button>
</form>


<h3>Donor List</h3>
<ul className="donor-list">
  {donors.map((donor, index) => (
    <li key={index}>
      {donor.name} donated: ₹{donor.amount.toFixed(2)}
    </li>
  ))}
</ul>

        </div>
      </div>
    </div>
  );
}

export default CapitalRaise;
