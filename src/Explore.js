// src/Explore.js
import React from 'react';
import './explore.css';
import { Link } from 'react-router-dom';
import schoolImage from './assets/images/school1.jpg'; 
import waterImage from './assets/images/water.jpg'; 
import forestImage from './assets/images/forest.jpg'; 
import aidImage from './assets/images/aid.jpg'; 
import womanImage from './assets/images/woman1.jpg'; 
import artImage from './assets/images/art.jpg'; 
import oceanImage from './assets/images/ocean1.jpg'; 
import sportImage from './assets/images/sport.jpg'; 
import energyImage from './assets/images/energy.jpg'; 
import hungerImage from './assets/images/hunger.jpg'; 
import farmerImage from './assets/images/farmer.jpg'; 
import animalImage from './assets/images/animal.jpg'; 
import techImage from './assets/images/tech.jpg'; 
import disasterImage from './assets/images/disaster.jpg'; 
import mentalImage from './assets/images/mental.jpg'; 
import wildlifeImage from './assets/images/wildlife.jpg'; 

const Explore = () => {
  const campaigns = [
    {
      id: 1,
      title: 'Help Build a School',
      image: schoolImage,
      description: 'Support the construction of a school in a rural village to provide quality education.',
    },
    {
      id: 2,
      title: 'Clean Water Initiative',
      image: waterImage,
      description: 'Help bring clean drinking water to communities in need.',
    },
    {
      id: 3,
      title: 'Reforestation Project',
      image: forestImage,
      description: 'Join us in planting trees to combat climate change and protect wildlife.',
    },
    {
      id: 4,
      title: 'Medical Aid for All',
      image: aidImage,
      description: 'Provide medical assistance to underprivileged communities around the world.',
    },
    {
      id: 5,
      title: 'Empowering Women',
      image: womanImage,
      description: 'Support programs aimed at empowering women in disadvantaged areas.',
    },
    {
      id: 6,
      title: 'Art for Social Change',
      image: artImage,
      description: 'Help artists spread awareness about social issues through their art.',
    },
    {
      id: 7,
      title: 'Save the Oceans',
      image: oceanImage,
      description: 'Join efforts to clean and protect oceans from pollution and overfishing.',
    },
    {
      id: 8,
      title: 'Youth Sports Initiative',
      image: sportImage,
      description: 'Provide sports equipment and facilities for young athletes in need.',
    },
    {
      id: 9,
      title: 'Green Energy Solutions',
      image: energyImage,
      description: 'Promote renewable energy projects in communities lacking resources.',
    },
    {
      id: 10,
      title: 'Hunger Relief Fund',
      image: hungerImage,
      description: 'Help provide food and essential supplies to families in crisis.',
    },
    {
      id: 11,
      title: 'Support Local Farmers',
      image: farmerImage,
      description: 'Aid small farmers in adopting sustainable farming techniques.',
    },
    {
      id: 12,
      title: 'Animal Rescue Mission',
      image: animalImage,
      description: 'Assist in rescuing and providing shelter for abandoned animals.',
    },
    {
      id: 13,
      title: 'Tech for Education',
      image: techImage,
      description: 'Provide laptops and digital resources for students in need.',
    },
    {
      id: 14,
      title: 'Disaster Relief Program',
      image: disasterImage,
      description: 'Support relief efforts for communities affected by natural disasters.',
    },
    {
      id: 15,
      title: 'Mental Health Awareness',
      image: mentalImage,
      description: 'Promote mental health awareness and provide resources for support.',
    },
    {
      id: 16,
      title: 'Wildlife Conservation',
      image: wildlifeImage,
      description: 'Protect endangered species through habitat preservation and advocacy.',
    }
  ];

 return (
    <div className="explore-page">
      <h1 className="explore-title">Our Campaigns</h1>

      {/* Button or link to navigate to Create Campaign page */}
      <button
        onClick={() => window.location.href = '/create-campaign'}
        className="create-campaign-button"
      >
        Create a New Campaign
      </button>

      <div className="campaign-list">
        {/* Loop through campaigns and display each */}
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-container">
           <div className="campaign-image">
  {campaign.image && (
    <img
      src={campaign.image} // Use the imported image directly
      alt={campaign.title}
      className="campaign-image-box"
    />
  )}
</div>

            <div className="campaign-text">
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <p><strong>Funding Goal: ${campaign.goal}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;