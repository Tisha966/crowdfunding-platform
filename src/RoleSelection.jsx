import React from 'react';
import './RoleSelection.css';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
  return (
    <div className="role-selection-page">
      <div className="overlay"></div>
      <div className="role-selection-container"> 
        <h1 className="title">Choose Your Role</h1>
        <p className="subtitle">Select a role to proceed with your crowdfunding journey.</p>
        <div className="roles">
  <Link to="/explore" style={{ textDecoration: 'none' }}> 
    <div className="role-card">
      <h2>Contributor</h2>
      <p>Support causes that matter to you. Contribute to verified campaigns and change lives.</p>
    </div>
  </Link>

  <Link to="/campaignDetails/:id" style={{ textDecoration: 'none' }}>
    <div className="role-card">
      <h2>Fundraiser</h2>
      <p>Start a fundraiser for a medical emergency, education, or community project in minutes.</p>
    </div> 
  </Link>
</div>
      </div>
      </div>
   
  );
};

export default RoleSelection;
