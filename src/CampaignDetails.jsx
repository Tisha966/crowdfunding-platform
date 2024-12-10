import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './campaignDetails.css';
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

const CampaignDetails = () => {
  const { id } = useParams();  // Get the campaign ID from the URL

  // Static list of campaigns (in a real app, this would come from your backend)
  const campaigns = [
    { 
      id: 1, 
      title: 'Help Build a School', 
      image: schoolImage , 
      description: 'Support the construction of a school in a rural village to provide quality education.The physical infrastructure of a school, such as classrooms, libraries, laboratories, and playgrounds, significantly impacts students learning experiences. Constructing and maintaining well-equipped facilities is essential for ensuring quality education example, a well-stocked library nurtures a culture of reading and intellectual curiosity, while functional laboratories provide hands-on learning opportunities critical for subjects like science and technology. However, these efforts require not only financial resources but also thoughtful planning to meet the diverse needs of students and staff. ',
      contributors: 150, 
      minContribution: 1000 // Minimum contribution amount in rupees
    },
    { 
      id: 2, 
      title: 'Clean Water Initiative', 
      image: waterImage, 
      description: 'Help bring clean drinking water to communities in need.Clean water is essential for life, yet many communities lack access to it. This initiative aims to provide safe and sustainable drinking water solutions to underserved areas. By supporting this cause, you can help improve health, reduce waterborne diseases, and create a brighter future for countless families.Clean water is essential for life, yet many communities lack access to it. This initiative aims to provide safe and sustainable drinking water solutions to underserved areas. By supporting this cause, you can help improve health, reduce waterborne diseases, and create a brighter future for countless families',
      contributors: 120, 
      minContribution: 1500 // Minimum contribution amount in rupees
    },
    { 
      id: 3, 
      title: 'Save the Rainforest', 
      image: forestImage, 
      description: 'Join the fight to protect the world’s rainforests.Forests are the lungs of our planet, playing a vital role in maintaining ecological balance and combating climate change. The Reforestation of Forests Initiative is a dedicated effort to restore degraded forests, rejuvenate biodiversity, and replenish the environment for future generations. Trees not only provide oxygen but also serve as a habitat for countless species, regulate water cycles, and prevent soil erosion. Over the past few decades, rampant deforestation has led to the loss of precious ecosystems, contributing to global warming and endangering countless species. This initiative aims to reverse this damage by planting diverse native trees in affected areas, ensuring the restoration of vibrant and resilient ecosystems',
      contributors: 200, 
      minContribution: 2000 // Minimum contribution amount in rupees
    },
    { 
      id: 4, 
      title: 'Animal Rescue & Rehabilitation', 
      image: animalImage, 
      description: 'Support the rescue and rehabilitation of animals in need.Together, we can make a difference for countless animals who cannot speak for themselves. By supporting the Animal Rescue and Rehabilitation Initiative, you become part of a movement to protect and care for vulnerable creatures, ensuring they get a second chance at life. Let us come together to create a world where every animal is valued, respected, and given the chance to live free from harm',
      contributors: 80, 
      minContribution: 2500 // Minimum contribution amount in rupees
    },
    { 
      id: 5, 
      title: 'Food for All', 
      image: aidImage, 
      description: 'Donate to provide food to underprivileged families in the community.',
      contributors: 300, 
      minContribution: 500 // Minimum contribution amount in rupees
    },
    { 
      id: 6, 
      title: 'Education for Girls', 
      image: womanImage, 
      description: 'Help fund education for underprivileged girls across India.',
      contributors: 250, 
      minContribution: 1200 // Minimum contribution amount in rupees
    },
    { 
      id: 7, 
      title: 'Homeless Shelter Project', 
      image: disasterImage, 
      description: 'Help build shelters for the homeless in major cities.',
      contributors: 450, 
      minContribution: 1800 // Minimum contribution amount in rupees
    },
    { 
      id: 8, 
      title: 'Health for All', 
      image: energyImage, 
      description: 'Contribute to free healthcare services for the marginalized communities.',
      contributors: 120, 
      minContribution: 2000 // Minimum contribution amount in rupees
    },
    { 
      id: 9, 
      title: 'Sustainable Farming Initiative', 
      image: farmerImage, 
      description: 'Support sustainable farming practices and eco-friendly farming tools.',
      contributors: 180, 
      minContribution: 1300 // Minimum contribution amount in rupees
    },
    { 
      id: 10, 
      title: 'Disaster Relief Fund', 
      image: disasterImage, 
      description: 'Donate to help those affected by natural disasters like floods and earthquakes.',
      contributors: 550, 
      minContribution: 2200 // Minimum contribution amount in rupees
    },
    { 
      id: 11, 
      title: 'Help Build a School', 
      image: schoolImage , 
      description: 'Support the construction of a school in a rural village to provide quality education.',
      contributors: 150, 
      minContribution: 1000 // Minimum contribution amount in rupees
    },
    { 
      id: 12, 
      title: 'Clean Water Initiative', 
      image: waterImage, 
      description: 'Help bring clean drinking water to communities in need.',
      contributors: 120, 
      minContribution: 1500 // Minimum contribution amount in rupees
    },
    { 
      id: 13, 
      title: 'Save the Rainforest', 
      image: forestImage, 
      description: 'Join the fight to protect the world’s rainforests.',
      contributors: 200, 
      minContribution: 2000 // Minimum contribution amount in rupees
    },
    { 
      id: 14, 
      title: 'Animal Rescue & Rehabilitation', 
      image: animalImage, 
      description: 'Support the rescue and rehabilitation of animals in need.',
      contributors: 80, 
      minContribution: 2500 // Minimum contribution amount in rupees
    },
    { 
      id: 15, 
      title: 'Food for All', 
      image: aidImage, 
      description: 'Donate to provide food to underprivileged families in the community.',
      contributors: 300, 
      minContribution: 500 // Minimum contribution amount in rupees
    },
    { 
      id: 16, 
      title: 'Education for Girls', 
      image: womanImage, 
      description: 'Help fund education for underprivileged girls across India.',
      contributors: 250, 
      minContribution: 1200 // Minimum contribution amount in rupees
    },
    
  ];

  // Find the campaign matching the id from the URL
  const campaignIndex = campaigns.findIndex(c => c.id === parseInt(id));
  const campaign = campaigns[campaignIndex];

  // State to manage whether a user has clicked to contribute
  const [hasContributed, setHasContributed] = useState(false);
  const [contributors, setContributors] = useState(campaign.contributors);
  const [loaderProgress, setLoaderProgress] = useState(25); // Start at 25% fill for the loader
  const [loading, setLoading] = useState(false); // To manage the loading state

  useEffect(() => {
    if (loading && loaderProgress < 75) { // Set the upper limit to 75% of the circle
      const timer = setInterval(() => {
        setLoaderProgress((prevProgress) => Math.min(prevProgress + 5, 75)); // Fill up by 5% each time
      }, 300);
      return () => clearInterval(timer);
    }
  }, [loading, loaderProgress]);

  const handleContribution = () => {
    setHasContributed(true);
    setLoading(true);
    setContributors(contributors + 1); // Increase the contributor count
    
    // Ideally, send the updated contributor count to your backend here
    // Example (using fetch):
    // fetch(`/api/campaigns/${id}/contribute`, {
    //   method: 'POST',
    //   body: JSON.stringify({ contributors: contributors + 1 }),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    // .then(response => response.json())
    // .then(data => console.log('Contribution updated!', data))
    // .catch(error => console.log('Error updating contribution:', error));
  };

  return (
    <div className="campaign-details-page">
      {campaign ? (
        <>
          <h1>{campaign.title}</h1>
          <img src={campaign.image} alt={campaign.title} className="campaign-image" />
          <p>{campaign.description}</p>

          {/* Display minimum contribution amount in rupees */}
          <div className="min-contribution">
            <h3>Minimum Contribution: ₹{campaign.minContribution}</h3>
          </div>

          {/* Poll or Contributor Counter */}
          <div className="contribution-section">
            <h3>{hasContributed ? 'Thank you for your contribution!' : 'Would you like to contribute?'}</h3>
            <button 
              className="contribute-button" 
              onClick={handleContribution}
              disabled={hasContributed || loading}  // Disable if already contributed or loading
            >
              {hasContributed ? 'Thank You!' : 'Contribute Now'}
            </button>
            <p>{contributors} people have contributed to this campaign</p>
          </div>

          {/* Circle Loader */}
          {loading && (
            <div className="loader-container">
              <div className="loader">
                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#3498db"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * loaderProgress) / 100}
                    className="circle-loader"
                  />
                  <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle" fontSize="12" fill="#3498db">
                    {loaderProgress}%
                  </text>
                </svg>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Campaign not found!</p>
      )}

      <Link to="/explore" className="back-button">Back to Explore</Link>
    </div>
  );
};

export default CampaignDetails;
