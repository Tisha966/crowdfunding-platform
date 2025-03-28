import React, { useState } from "react";  
import "./PlaybookSection.css"; 
import axios from 'axios';

const PlaybookSection = () => {
  const [name, setName] = useState('');          // ✅ Added name field
  const [email, setEmail] = useState('');  
  const [message, setMessage] = useState('');  
  const [status, setStatus] = useState(null);  

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting:', { name, email, message });

    try {
      const response = await axios.post(
        'http://localhost:5001/api/feedback/submit',
        { name, email, message },   // ✅ Sending all required fields
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setStatus({ type: "success", message: "Feedback successfully submitted!" });

      // ✅ Clear input fields after submission
      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {
      console.error('Error:', error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again."
      });
    }
  };

  return (
    <div className="playbook-container">

      {/* ✅ Templates Section */}
      <div className="section templates">
        <h2>Templates</h2>
        <p>
          Grab our email and SMS templates, campaign graphic packs <em>(coming soon)</em> to save time.
        </p>
        <div className="list">
          <div className="list-item">
            <a href="#">Validating your community round</a>
            <span>1 min read</span>
          </div>
          <div className="list-item">
            <a href="#">Asking for feedback on your pitch</a>
            <span>1 min read</span>
          </div>
          <div className="list-item">
            <a href="#">Marketing your fundraise in TTW (9 emails)</a>
            <span>7 min read</span>
          </div>
          <div className="list-item">
            <a href="#">Marketing your fundraise post-Form C (9 emails)</a>
            <span>6 min read</span>
          </div>
        </div>
      </div>

      {/* ✅ Resources Section */}
      <div className="section resources">
        <h2>Resources</h2>
        <p>Additional resources to share with your team or deepen your fundraising strategy.</p>
        <div className="list">
          <div className="list-item">
            <a href="#">Community Round Case Studies</a>
          </div>
          <div className="list-item">
            <a href="#">Shareable Board Memo</a>
          </div>
          <div className="list-item">
            <a href="#">Founder FAQs</a>
          </div>
          <div className="list-item">
            <a href="#">Contracts to send your investors</a>
          </div>
          <div className="list-item">
            <a href="#">Investor Presentation Templates</a>
          </div>
          <div className="list-item">
            <a href="#">Fundraising Strategy Guide</a>
          </div>
          <div className="list-item">
            <a href="#">Crowdfunding Legal Considerations</a>
          </div>
        </div>
      </div>

      {/* ✅ Best Practices Section */}
      <div className="section best-practices">
        <h2>Best Practices</h2>
        <p>Discover expert insights and proven techniques for a successful crowdfunding campaign.</p>
        <div className="list">
          <div className="list-item">
            <a href="#">Set Clear Goals</a>
            <span>Define your funding objectives and timeline.</span>
          </div>
          <div className="list-item">
            <a href="#">Engage Your Audience</a>
            <span>Use storytelling and testimonials to build credibility.</span>
          </div>
          <div className="list-item">
            <a href="#">Leverage Social Media</a>
            <span>Promote your campaign on multiple platforms.</span>
          </div>
          <div className="list-item">
            <a href="#">Keep Backers Updated</a>
            <span>Regular communication builds trust and transparency.</span>
          </div>
        </div>
      </div>

      {/* ✅ Video Tutorials Section */}
      <div className="section video-tutorials">
        <h2>Video Tutorials</h2>
        <p>Step-by-step guides to maximize your fundraising efforts.</p>
        <div className="list">
          <div className="list-item">
            <a href="#">Creating a compelling campaign video</a>
            <span>5 min watch</span>
          </div>
          <div className="list-item">
            <a href="#">How to attract early investors</a>
            <span>8 min watch</span>
          </div>
          <div className="list-item">
            <a href="#">Email marketing strategies for backers</a>
            <span>6 min watch</span>
          </div>
          <div className="list-item">
            <a href="#">Building a Strong Investor Network</a>
            <span>7 min watch</span>
          </div>
          <div className="list-item">
            <a href="#">Optimizing Your Campaign Landing Page</a>
            <span>4 min watch</span>
          </div>
        </div>
      </div>

      {/* ✅ Feedback Form Section */}
      <div className="section feedback-form">
        <h2>Questions? Feedback?</h2>
        <p>We'd love to know how we can make these guides more helpful for you. Drop us a note below!</p>

        <form onSubmit={handleSubmit}>
          {/* ✅ Name Field */}
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>What's on your mind?</label>
          <textarea
            placeholder="Share your thoughts..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>

        {status && (
          <div className={`status ${status.type}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaybookSection;
