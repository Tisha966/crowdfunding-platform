import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

import './index.css';

// Import Components
import Home from './Home';
import About from './About';
import Explore from './Explore';
import CreateCampaign from './CreateCampaign';
import CampaignDetails from './CampaignDetails';
import Login from './Login';
import SignUp from './SignUp';
import Contact from './Contact';
import Blog from './Blog';
import FAQ from './FAQ';
import Dashboard from './Dashboard';

import Why from './Why';
//import PrivateRoute from './PrivateRoute';
//import TwoStepForm from './TwoStepForm';
import CapitalRaise from './CapitalRaise';
import PlayBook from './PlaybookSection';
import QRScanner from './QRScanner'; 
import QRCodeGenerator from './QRCodeGenerator';
import DonationPage from './DonationPage';

const App = () => {

  const [user, setUser] = useState(null);

  // ✅ Check for token and user info on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType'); // 👈
  
    if (token && username) {
      setUser({ name: username, token, type: userType }); // 👈 Add type
    }
  }, []);
  

  // Toggle dark mode function
 

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <Router>
      
        
        {/* Navigation Bar */}
        <nav className="navbar">
          <h1 className="logo">
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              style={{ color: '#ff7f50', marginRight: '8px' }}
            />
            CrowdFunding
          </h1>

          {/* Dark Mode Toggle */}
         

          {/* Navigation Links */}
          <ul className="nav-links">
  <li><Link to="/">Home</Link></li>

  {user ? (
    <>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><button onClick={handleLogout}>Logout</button></li>
    </>
  ) : (
    <li><Link to="/login">Login</Link></li>
  )}

  <li><Link to="/why">Why Us</Link></li>
  <li><Link to="/explore">Explore</Link></li>
  <li><Link to="/playBook">PlayBook</Link></li>
  <li><Link to="/capitalRaise">CapitalRaise</Link></li>
  <li><Link to="/blog">Blog</Link></li>
</ul>

</nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/playbook" element={<PlayBook />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          
          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/why" element={<Why />} />
          <Route path="/capitalRaise" element={<CapitalRaise />} />
          <Route path="/campaignDetails/:id" element={<CampaignDetails />} />
          <Route path="/qrScanner" element={<QRScanner />} />
          <Route path="/qrCodeGenerator" element={<QRCodeGenerator />} />
          <Route path="/donate/:campaignId" element={<DonationPage />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
   
    </Router>
  );
};

export default App;
