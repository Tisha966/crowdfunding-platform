import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './campaignDetails.css';

const CampaignDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const createCampaign = async (campaignData) => {
    try {
      const formData = new FormData();
      formData.append('image', campaignData.image);    // Append image
    formData.append('title', campaignData.title);
    formData.append('description', campaignData.description);
    formData.append('daysLeft', String(campaignData.daysLeft));    // Ensure string format
    // formData.append('numSupporters', String(campaignData.numSupporters)); 
    formData.append('supporters', String(campaignData.numSupporters));
    
      const response = await fetch('http://localhost:5002/api/campaigns/create', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('Campaign Created Successfully!');
        document.getElementById('campaignForm').reset();
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting campaign:', error);
      alert('Error submitting campaign: ' + error.message);
    } finally {
      setIsLoading(false); // Stop loading after the submission
    }
  };
  
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    const campaignData = {
      title: event.target.title.value,
      description: event.target.description.value,
      image: event.target.image.files[0],
      daysLeft: event.target.daysLeft.value,
      supporters: event.target.numSupporters.value,  // ✅ Updated key name
    };
    

    await createCampaign(campaignData);  // Call the createCampaign function with the form data
  };

  return (
    <div className="main-container">
      <div className="content">
        <h1 className="campaign-heading" style={{ textAlign: 'center', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', margin: '0', paddingTop: '85px' }}>
          <span style={{ color: 'teal' }}>WELCOME!</span> <span style={{ color: '#283044' }}>CREATE YOUR OWN CAMPAIGN</span>
        </h1>

        <div className="campaign-layout">
          {/* Left Side: Form */}
          <form id="campaignForm" onSubmit={handleSubmit} className="campaign-form">
            <label htmlFor="campaignTitle">Campaign Title</label>
            <input type="text" id="campaignTitle" name="title" required placeholder="Enter campaign title" />

            <label htmlFor="campaignDescription">Campaign Description</label>
            <textarea id="campaignDescription" name="description" rows="4" required placeholder="Describe your campaign"></textarea>

            <label htmlFor="campaignImage">Campaign Image</label>
            <input type="file" id="campaignImage" name="image" accept="image/*" required />

            <label htmlFor="daysLeft">Days Left</label>
            <input type="number" id="daysLeft" name="daysLeft" min="1" required placeholder="Enter days left" />

            <label htmlFor="numSupporters">Number of Supporters</label>
            <input type="number" id="numSupporters" name="numSupporters" min="0" required placeholder="Enter number of supporters" />

            <button type="submit" id="submitBtn">Create Campaign</button>
          </form>

          {/* Right Side: Steps and Information */}
          <section className="campaign-info">
            <h2 style={{ color: '#283044' }}>Why Create a Campaign?</h2>
            <p>
              Starting a campaign on CrowdFunding gives you the platform to bring your ideas to life.
              Whether it’s a project that supports a cause, a business venture, or a personal goal, a well-executed campaign can attract the right backers and create lasting change.
            </p>

            {/* Goals and Steps */}
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

      {/* Footer Section */}
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

export default CampaignDetails;
