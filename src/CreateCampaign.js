// src/CreateCampaign.js
import React, { useState } from 'react';
import './createCampaign.css';

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
      <section className="join-us">
        <h2>Ready to Launch Your Project?</h2>
        <p>Sign up today and bring your ideas to life!</p>
        <button className="cta-button">Join Now</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 CrowdFunding. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CreateCampaign;
