import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './campaignDetails.css';

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
          <span style={{ color: 'teal' }}>WELCOME!</span>{' '}
          <span style={{ color: '#283044' }}>CREATE YOUR OWN CAMPAIGN</span>
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
            <h2 style={{ color: '#283044' }}>Why Create a Campaign?</h2>
            <p>
              Starting a campaign on CrowdFunding gives you the platform to
              bring your ideas to life. Whether it’s a project that supports a
              cause, a business venture, or a personal goal, a well-executed
              campaign can attract the right backers and create lasting change.
            </p>

            <h2 style={{ color: '#283044' }}>Goals of Fundraising:</h2>
            <ul>
              <li><strong>Support Your Cause:</strong> Raise funds for personal projects, charity work, or community development.</li>
              <li><strong>Reach a Wider Audience:</strong> Engage with a broader network of people who resonate with your project.</li>
              <li><strong>Build Credibility:</strong> A successful campaign helps in building trust and credibility for your ideas.</li>
              <li><strong>Achieve Financial Independence:</strong> Empower yourself or your community by creating opportunities for financial growth.</li>
              <li><strong>Foster Innovation:</strong> Fund innovative ideas that can lead to new products, services, or solutions to societal challenges.</li>
              <li><strong>Create a Stronger Community:</strong> Bring people together who share similar values, goals, or passions, helping to build a strong, supportive community.</li>
              <li><strong>Make an Impact:</strong> Have a lasting effect by funding projects that solve real-world problems, benefiting others in the long term.</li>
            </ul>

            <h2 style={{ color: '#283044' }}>Steps to Creating a Successful Campaign:</h2>
            <ol>
              <li><strong>Set Clear Objectives:</strong> Clearly define your campaign's purpose and the amount of money you need.</li>
              <li><strong>Tell Your Story:</strong> Share why your project matters. People connect with stories.</li>
              <li><strong>Engage Your Audience:</strong> Promote your campaign through social media, word of mouth, and other channels.</li>
              <li><strong>Offer Rewards:</strong> Consider offering incentives to those who contribute to your cause.</li>
            </ol>
          </section>
        </div>
      </div>

      {/* Loader */}
      {isLoading && <div id="loader" className="loader">Loading...</div>}

      {/* Footer (add your own content if not already included globally) */}
      <footer className="footer">
        {/* Add footer content here if needed */}
      </footer>
    </div>
  );
};

export default CampaignDetails;
