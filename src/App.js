// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Explore from './Explore';
import CreateCampaign from './CreateCampaign';
import Login from './Login';
import Contact from './Contact';
import SignUp from './SignUp';
import './index.css';
import CampaignDetails from './CampaignDetails';

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <h1 className="logo">CrowdFunding</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {/* <li><Link to="/explore">Explore</Link></li>  */}
          {/* <li><Link to="/about">About</Link></li> */}
        
          {/* <li><Link to="/create-campaign">Create Campaign</Link></li>  */}
          <li><Link to="/login">Login</Link></li>
          {/* <li><Link to="/contact">Contact</Link></li> */}
          
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} /> 
      </Routes>
    </Router>
  );
};

export default App;
