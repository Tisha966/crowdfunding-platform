import React from 'react';
import './createCampaign.css';
import fundImage from './assets/images/fund12.jpg'; // Import the hero image

function CreateCampaign() {
  return (
    <div className="container">
      <div className="overlay">
        <div className="header">
          <h1>Explore Various Crowdfunding Ideas </h1>
        </div>
        <div className="options">
          <div className="option">
            <h2>Community Development</h2>
            <p>Help fund projects that improve local communities, such as building parks, creating shelters for the homeless.</p>
          </div>
          <div className="option">
            <h2>Education Scholarships</h2>
            <p>Support students who are struggling with tuition fees by contributing to educational scholarships.</p>
          </div>
          <div className="option">
            <h2>Disaster Relief</h2>
            <p>Assist communities affected by natural disasters like earthquakes, floods, and hurricanes.</p>
          </div>
          <div className="option">
            <h2>Small Business Support</h2>
            <p>Invest in local small businesses or startups. Crowdfunding can help entrepreneurs.</p>
          </div>
          <div className="option">
            <h2>Creative Projects</h2>
            <p>Support artists, musicians, filmmakers, and writers in bringing their creative projects to life.</p>
          </div>
          <div className="option">
            <h2>Environmental Causes</h2>
            <p>Fund initiatives that help protect the environment, like tree planting campaigns.</p>
          </div>
          <div className="option">
            <h2>Tech Innovation</h2>
            <p>Contribute to the development of new tech products and innovations that aim to solve real-world problems.</p>
          </div>
          <div className="option">
            <h2>Humanitarian Aid</h2>
            <p>Provide relief to refugees, displaced persons who are facing hardships due to political or social conflicts.</p>
          </div>
          <div className="option">
            <h2>Animal Welfare</h2>
            <p>Support animal shelters and wildlife conservation efforts that aim to protect endangered species.</p>
          </div>
          <div className="option">
            <h2>Sports Funding</h2>
            <p>Help athletes and sports teams with the resources they need to pursue their goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCampaign;
