import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { FaSun, FaMoon } from 'react-icons/fa';
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
import Chatbot from './Chatbot';
import Why from './Why';
import PrivateRoute from './PrivateRoute';
import TwoStepForm from './TwoStepForm';
import CapitalRaise from './CapitalRaise';
import PlayBook from './PlaybookSection';
import QRScanner from './QRScanner'; 
import QRCodeGenerator from './QRCodeGenerator';
import DonationPage from './DonationPage';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode function
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <Router>
      <div className={isDarkMode ? 'app dark-mode' : 'app'}>
        {/* Navigation Bar */}
        <nav className="navbar">
          {/* Logo */}
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
            <li><Link to="/why">Why Us</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/playBook" > PlayBook</Link></li>
            
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
          <Route path="/playbook" element={<PlayBook />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/why" element={<Why />} />
          <Route path="/capitalRaise" element={<CapitalRaise />} />
          <Route path="/campaignDetails/:id" element={<CampaignDetails />} />
          <Route path="/qrScanner" element={<QRScanner/>} />
          <Route path="/qrCodeGenerator" element={<QRCodeGenerator />} />
          <Route path="/donate/:campaignId" element={<DonationPage />} />


          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/TwoStepForm"
            element={
              <PrivateRoute>
                <TwoStepForm />
              </PrivateRoute>
            }
          />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
