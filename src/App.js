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
// import PrivateRoute from './PrivateRoute';
// import TwoStepForm from './TwoStepForm';

import PlayBook from './PlaybookSection';
import QRScanner from './QRScanner'; 
import QRCodeGenerator from './QRCodeGenerator';
import DonationPage from './DonationPage';

import RoleSelection from './RoleSelection.jsx';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
// Removed: import PhoneInputPage from './components/PhoneInputPage';

const App = () => {
  const [user, setUser] = useState(null);

  // Check for token and user info on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');
  
    if (token && username) {
      setUser({ name: username, token, type: userType });
    }
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    setUser(null);
  };

  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="logo">
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              style={{ color: '#ff7f50', marginRight: '8px' }}
            />
            CrowdFunding
          </h1>
        </Link>
       <ul className="nav-links">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/why">Our Impact</Link></li>
  <li><Link to="/explore">Explore</Link></li>
  <li><Link to="/playbook">PlayBook</Link></li>
  {/* <li><Link to="/capitalRaise">CapitalRaise</Link></li> */}
  <li><Link to="/blog">Blog</Link></li>
  {user ? (
    <>
      <li><Link to="/dashboard">Dashboard</Link></li>
     <li>
  <button
    onClick={handleLogout}
    style={{
      backgroundColor: '#888',     // Gray background
      color: '#fff',               // White text
      border: 'none',
      borderRadius: '6px',
      padding: '8px 16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#666')}
    onMouseOut={(e) => (e.target.style.backgroundColor = '#888')}
  >
    Logout
  </button>
</li>

    </>
  ) : (
    <>
      <li><Link to="/login">Login</Link></li>
      {/* <li><Link to="/role-selection">Select Role</Link></li> */}
    </>
  )}
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
        {/* <Route path="/capitalRaise" element={<CapitalRaise />} /> */}
        <Route path="/campaignDetails/:id" element={<CampaignDetails />} />
        <Route path="/qrScanner" element={<QRScanner />} />
        <Route path="/qrCodeGenerator" element={<QRCodeGenerator />} />
        <Route path="/donate/:campaignId" element={<DonationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* <Route path="/role-selection" element={<PhoneInputPage />} /> */}
        <Route path="/role-selection" element={<RoleSelection user={user} setUser={setUser} />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
