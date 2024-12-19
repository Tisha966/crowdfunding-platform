import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CrowdFunding</h2>
        <nav>
          <ul>
            <li className="active"><span>Dashboard</span></li>
            <li><span>My Campaigns</span></li>
            <li><span>Create Campaign</span></li>
            <li><span>Donations</span></li>
            <li><span>Messages</span></li>
            <li><span>Profile</span></li>
            <li><span>Settings</span></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="content-header">
          <h1>Dashboard</h1>
        </header>

        {/* Welcome Panel */}
        <section className="welcome-panel">
          <div className="welcome-content">
            <h2>Welcome to Your Campaign Dashboard!</h2>
            <p>Manage your crowdfunding campaigns, track donations, and connect with supporters easily.</p>
            <div className="buttons" style={{color:"teal"}}>
              <button className="\campaignDetails">Start a New Campaign</button>
              <p>or, <span className="\explore" style={{color:"teal"}}>explore trending campaigns</span></p>
            </div>
          </div>

          {/* Login Options Card */}
          <div className="card login-options">
            <h3>Login Options</h3>
            <div className="login-buttons">
              <button className="contributor-btn">Login as a Contributor</button>
              <button className="fundraiser-btn">Login as a Fundraiser</button>
            </div>
          </div>
        </section>

        {/* Content Cards */}
        <section className="content-cards">
          {/* Overview Card */}
          <div className="card">
            <h3>Overview</h3>
            <p><strong>3</strong> Active Campaigns | <strong>150</strong> Supporters</p>
            <p>Total Donations Received: <strong>$12,000</strong></p>
          </div>

          {/* Quick Draft */}
          <div className="card">
            <h3>Quick Campaign Setup</h3>
            <input type="text" placeholder="Campaign Title" />
            <textarea placeholder="Brief Description of Your Campaign"></textarea>
            <button className="save-btn">Save Draft</button>
          </div>

          {/* Next Steps */}
          <div className="card">
            <h3>Next Steps</h3>
            <ul>
              <li>Create a new campaign</li>
              <li>Update your existing campaigns</li>
              <li>Connect with your supporters</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
