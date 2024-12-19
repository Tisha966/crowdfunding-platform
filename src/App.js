// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Explore from './Explore';
import CreateCampaign from './CreateCampaign';
import Login from './Login';
import Contact from './Contact';
import Blog from './Blog';
import FAQ from "./FAQ";
import SignUp from './SignUp';
import CampaignDetails from './CampaignDetails';
import Dashboard from './Dashboard';
import Chatbot from './Chatbot';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import sun/moon icons
import './index.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <nav className="navbar">
        <h1 className="logo">
          <FontAwesomeIcon
            icon={faHandHoldingUsd}
            style={{ color: '#ff7f50', marginRight: '8px' }}
          />
          CrowdFunding
        </h1>

        {/* Dark Mode Toggle Icon */}
        

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {/* <li><Link to="/explore">Explore</Link></li> */}
          {/* <li><Link to="/about">About</Link></li> */}
          {/* <li><Link to="/create-campaign">Create Campaign</Link></li> */} 
          <li><Link to="/login">Login</Link></li>
          {/* <li><Link to="/contact">Contact</Link></li> */}
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/chatbot">Chatbot</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/campaignDetails/:id" element={<CampaignDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />

      </Routes>
    </Router>
  );
};

export default App;
