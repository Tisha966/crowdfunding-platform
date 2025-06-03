import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './campaignDetails.css';
import { Link } from 'react-router-dom';


const CampaignDetails = ({ userId: propUserId }) => {
  const [userId, setUserId] = useState(propUserId || '');

  useEffect(() => {
    if (!propUserId) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [propUserId]);

  console.log("CampaignDetails userId:", userId);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();


  const createCampaign = async (campaignData) => {
    try {
      const formData = new FormData();
      formData.append('image', campaignData.image);
      formData.append('title', campaignData.title);
      formData.append('description', campaignData.description);
      formData.append('daysLeft', campaignData.daysLeft);
      formData.append('numSupporters', campaignData.numSupporters);
      formData.append('creatorId', userId);

      const response = await fetch('http://localhost:5002/api/campaigns/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Campaign Created Successfully!' });
        document.getElementById('campaignForm').reset();
        // Optional: redirect to another page after success
        // navigate('/campaigns');
      } else {
        const errData = await response.json();
        throw new Error(errData.error || response.statusText);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error submitting campaign: ' + error.message });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  // Check if userId is defined before proceeding
  if (!userId) {
    alert("User ID is missing! Please login or try again.");
    return; // stop submission if no userId
  }

  setIsLoading(true);
  setMessage({ type: '', text: '' });

  const campaignData = {
    title: event.target.title.value.trim(),
    description: event.target.description.value.trim(),
    image: event.target.image.files[0],
    daysLeft: event.target.daysLeft.value,
    numSupporters: event.target.numSupporters.value,
  };

  // Basic image validation
  if (!campaignData.image || !campaignData.image.type.startsWith('image/')) {
    setMessage({ type: 'error', text: 'Please upload a valid image file.' });
    setIsLoading(false);
    return;
  }

  await createCampaign(campaignData);
};

  return (
    <div className="main-container">
      <div className="content">
        <h1
          className="campaign-heading"
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: '0',
            paddingTop: '85px',
          }}
        >
          <span style={{ color: 'teal', paddingTop: '8px', display: 'inline-block' }}>
  WELCOME!
</span>{' '}
<span style={{ color: '#283044', paddingTop: '8px', display: 'inline-block' }}>
  CREATE YOUR OWN CAMPAIGN
</span>

        </h1>

        <div className="campaign-layout">
          <form
            id="campaignForm"
            onSubmit={handleSubmit}
            className="campaign-form"
            encType="multipart/form-data"
          >
            <label htmlFor="campaignTitle">Campaign Title</label>
            <input
              type="text"
              id="campaignTitle"
              name="title"
              required
              placeholder="Enter campaign title"
            />

            <label htmlFor="campaignDescription">Campaign Description</label>
            <textarea
              id="campaignDescription"
              name="description"
              rows="4"
              required
              placeholder="Describe your campaign"
            />

            <label htmlFor="campaignImage">Campaign Image</label>
            <input
              type="file"
              id="campaignImage"
              name="image"
              accept="image/*"
              required
            />

            <label htmlFor="daysLeft">Days Left</label>
            <input
              type="number"
              id="daysLeft"
              name="daysLeft"
              min="1"
              required
              placeholder="Enter days left"
            />

            <label htmlFor="numSupporters">Number of Supporters</label>
            <input
              type="number"
              id="numSupporters"
              name="numSupporters"
              min="0"
              required
              placeholder="Enter number of supporters"
            />

            <button type="submit" id="submitBtn" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Campaign'}
            </button>

            {/* Feedback message */}
            {message.text && (
              <p className={message.type === 'error' ? 'error-message' : 'success-message'}>
                {message.text}
              </p>
            )}
          </form>

          {/* Right Side: Information Section */}
         <section className="campaign-info">
  <h2>Why Create a Campaign?</h2>
  <p>
    Launching a campaign on CrowdFunding helps bring your ideas to life—whether it's for a cause, business, or personal goal. A strong campaign attracts the right backers and drives real impact.
  </p>

  <h2>Fundraising Goals</h2>
  <ul>
    <li><strong>Support Your Cause:</strong> Fund personal projects, charity, or community efforts.</li>
    <li><strong>Reach More People:</strong> Connect with a wider audience who share your vision.</li>
    <li><strong>Build Trust:</strong> Successful campaigns boost credibility for your ideas.</li>
    <li><strong>Financial Growth:</strong> Create opportunities for yourself or your community.</li>
    <li><strong>Drive Innovation:</strong> Fund ideas that solve real challenges.</li>
    <li><strong>Strengthen Community:</strong> Unite people with shared goals and values.</li>
    <li><strong>Make Impact:</strong> Support projects with lasting benefits.</li>
  </ul>

  <h2>Steps for Success</h2>
  <ol>
    <li><strong>Define Objectives:</strong> Be clear about your purpose and funding needs.</li>
    <li><strong>Tell Your Story:</strong> Share why your project matters.</li>
    <li><strong>Engage Supporters:</strong> Promote your campaign actively.</li>
    <li><strong>Offer Rewards:</strong> Incentivize contributions with meaningful rewards.</li>
  </ol>
</section>

        </div>
      </div>

      {/* Loader */}
      {isLoading && <div id="loader" className="loader">Loading...</div>}

      {/* Footer (add your own content if not already included globally) */}
     <footer className="footer ">
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
                  <li><a href="/faq">FAQ</a></li>
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
                <p style={{color:"gray"}}>Stay updated with our latest news and campaigns.</p>
                <input type="email" placeholder="Your Email" className="newsletter-input" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p style={{color:"whitesmoke"}}>&copy; 2024 CrowdFunding. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default CampaignDetails;
