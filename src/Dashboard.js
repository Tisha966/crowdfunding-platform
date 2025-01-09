import React from 'react';
import './Dashboard.css';
import { Link } from "react-router-dom";
import TwoStepForm from './TwoStepForm';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
  <nav>
    <ul>
      <li className="active"><span>Dashboard</span></li>
      <li><span>My Campaigns</span></li>
      
      <li>
        <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
          <span>About</span>
        </Link>
      </li>
      <li>
        <Link to="/faq" style={{ textDecoration: "none", color: "inherit" }}>
          <span>FAQ</span>
        </Link>
      </li>
      <li>
        <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
          <span>Explore</span>
        </Link>
      </li>
      <li>
        <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
          <span>Blog</span>
        </Link>
      </li>
      <li><span>Logout</span></li>
    </ul>
  </nav>
</aside>

      {/* Main Content */}
      <main className="content">
        <header className="content-header">
          {/* <h1>Dashboard</h1> */}
        </header>

        {/* Welcome Panel */}
        <section className="welcome-panel">
  <div className="welcome-content">
    <h2 style={{textAlign:"left"}}>Welcome to Your Campaign Dashboard!</h2>
    <p>Manage your crowdfunding campaigns, track donations, and connect with supporters easily.</p>
    <div className="buttons" style={{color:"teal"}}>
      {/* Start a New Campaign Button as a Link */}
      <Link to="/campaignDetails/:id">
  <button
    style={{
      backgroundColor: "gray",
      color: "white",
      border: "none",
      padding: "5px 10px",  // Reduced padding
      borderRadius: "5px",
      fontSize: "0.875rem",  // Reduced font size
      cursor: "pointer",  // Optional: adds a pointer cursor on hover
      width: "150px",  // Set a fixed width for the button
      textAlign: "center",  // Ensures the text is centered
    }}
  >
    Start a New Campaign
  </button>
</Link>

      <p>or, <Link to="/explore" style={{color: "teal"}}>explore trending campaigns</Link></p>
    </div>
  </div>

  {/* Login Options Card */}
  <div className="card login-options">
    <h3>Login Options</h3>
    <div className="login-buttons" >
      {/* Add Links for Login Options */}
      <Link to="/login">
        <button className="contributor-btn">Login as a Contributor</button>
      </Link>
      <Link to="/TwoStepForm">
  <button className="fundraiser-btn" >Login as a Fundraiser</button>
</Link>

    </div>
  </div>
</section>
        {/* Content Cards */}
        <section className="content-cards">
          {/* Overview Card */}
          <div className="card">
            <h3>Overview</h3>
            <p><strong style={{color:"teal"}}>3</strong> Active Campaigns | <strong  style={{color:"teal"}}>150</strong> Supporters</p>
            <p>Total Donations Received: <strong  style={{color:"teal"}}>$12,000</strong></p>
          </div>

          {/* Quick Draft */}
          <div className="card">
            <h3>Quick Campaign Setup</h3>
            <input type="text" placeholder="Campaign Title" />
            <textarea placeholder="Brief Description of Your Campaign"></textarea>
            <button className="save-btn">Save Draft</button>
          </div>

          {/* Next Steps */}
          <div className="card" style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Next Steps</h3>
  <ul style={{ listStyle: "none", padding: 0 }}>
    <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <span style={{ color: "rgb(255, 127, 80)", marginRight: "8px" }}>
        <i className="fas fa-plus-circle"></i>
      </span>
      Create a new campaign
    </li>
    <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <span style={{ color: "rgb(255, 127, 80)", marginRight: "8px" }}>
        <i className="fas fa-edit"></i>
      </span>
      Update your existing campaigns
    </li>
    <li style={{ display: "flex", alignItems: "center" }}>
      <span style={{ color: "rgb(255, 127, 80)", marginRight: "8px" }}>
        <i className="fas fa-users"></i>
      </span>
      Connect with your supporters
    </li>
  </ul>
</div>

        </section>
      </main>
    </div>
  );
};

export default Dashboard;
