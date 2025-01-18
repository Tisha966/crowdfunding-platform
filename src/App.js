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
import Why from './Why';

import PrivateRoute from './PrivateRoute';
import TwoStepForm from './TwoStepForm'; // Import TwoStepForm
import CapitalRaise from './CapitalRaise';


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
          <li><Link to="/why">Why Us</Link></li>
          <li><Link to="/capitalRaise">CapitalRaise</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/chatbot">Chatbot</Link></li>
          
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
        <Route path="/why" element={<Why />} />
        <Route path="/capitalRaise" element={<CapitalRaise />} />
        <Route path="/campaignDetails/:id" element={<CampaignDetails />} />
        <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        
       
        <Route
    path="/TwoStepForm"
    element={
      <PrivateRoute>
        <TwoStepForm />
      </PrivateRoute>
    }
  />
      </Routes>
    </Router>
  );
};

export default App;
