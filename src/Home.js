import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

import fundsImage from './assets/images/fund3.jpg';
import './home.css';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if the user has a saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);


const [hoveredBtn, setHoveredBtn] = useState(null);
  return (
    <div className={`home-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="home-hero">
      {/* <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  /> */}
        <h1>Welcome to CrowdFunding</h1>
        <p style={{color:"white"}}>Empowering ideas, one contribution at a time.</p>
        <Link to="/about">
          <button className="cta-button" style={{backgroundColor:"#ff7f50"}}>ABOUT CROWDFUNDING</button>
        </Link>
      </header>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-heading" style={{fontSize:'300%'}}>Empower Ideas, Fund Dreams</h1>
            <p className="hero-subtext">
              Join our community to explore and support creative campaigns that bring change to the world.
            </p>
            
           <div className="hero-buttons" style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "20px" }}>
  <Link
    to="/explore"
    onMouseEnter={() => setHoveredBtn("explore")}
    onMouseLeave={() => setHoveredBtn(null)}
    style={{
      padding: '12px 24px',
      backgroundColor: hoveredBtn === "explore" ? "#3a475e" : "#283044",
      color: 'white',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '1rem',
      transform: hoveredBtn === "explore" ? "scale(1.05)" : "scale(1)",
      transition: 'all 0.3s ease',
    }}
  >
    Explore Campaigns
  </Link>

  <a
    href="/create-campaign"
    onMouseEnter={() => setHoveredBtn("ideas")}
    onMouseLeave={() => setHoveredBtn(null)}
    style={{
      padding: '12px 24px',
      backgroundColor: hoveredBtn === "ideas" ? "#888" : "gray",
      color: 'white',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '1rem',
      transform: hoveredBtn === "ideas" ? "scale(1.05)" : "scale(1)",
      transition: 'all 0.3s ease',
    }}
  >
    Explore Ideas
  </a>
</div>
          </div>

          <div className="hero-image">
            <img src={fundsImage} alt="Hero Image" />
          </div>
        </div>
      </section>
<section
  style={{
    backgroundColor: 'lightgray',
    padding: '100px 20px',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
  }}
>
  {/* Moving Testimonials */}
  <div style={{ overflow: 'hidden', marginBottom: '50px', position: 'relative' }}>
    <h2
      style={{
        color: '#283044',
        fontSize: '2rem',
        fontWeight: '600',
        marginBottom: '30px',
      }}
    >
      Backers' Voices: Every Perspective Matters
    </h2>

    <div
      style={{
        display: 'flex',
        animation: 'scrollMarquee 30s linear infinite',
        width: 'max-content',
      }}
    >
      {[
        "“Incredible support. My idea finally took off!” — Riya Sharma",
        "“Funding made simple and impactful. Loved it!” — Ravi Patel",
        "“Smooth process, real change. I'm impressed.” — Meena Kapoor",
        "“Great UI. Felt part of something bigger.” — Ankit Desai",
        "“Dreams met funding. Truly empowering platform.” — Sneha Roy",
        "“Very easy to contribute. Super intuitive.” — Dhruv Mehta",
        "“Big difference with small help. Beautiful!” — Kavita Bansal",
        "“Crowdfunding reimagined. I’m now a believer.” — Aarav Khanna",
      ]
        .concat([
          "“Incredible support. My idea finally took off!” — Riya Sharma",
          "“Funding made simple and impactful. Loved it!” — Ravi Patel",
          "“Smooth process, real change. I'm impressed.” — Meena Kapoor",
          "“Great UI. Felt part of something bigger.” — Ankit Desai",
          "“Dreams met funding. Truly empowering platform.” — Sneha Roy",
          "“Very easy to contribute. Super intuitive.” — Dhruv Mehta",
          "“Big difference with small help. Beautiful!” — Kavita Bansal",
          "“Crowdfunding reimagined. I’m now a believer.” — Aarav Khanna",
        ])
        .map((text, index) => (
          <div
            key={index}
            style={{
              display: 'inline-block',
              backgroundColor: '#fff',
              padding: '16px 24px',
              borderRadius: '12px',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
              minWidth: '320px',
              maxWidth: '360px',
              fontStyle: 'italic',
              color: '#333',
              fontSize: '1rem',
              lineHeight: '1.5',
              marginRight: '30px',
            }}
          >
            {text}
          </div>
        ))}
    </div>

    <style>
      {`
        @keyframes scrollMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}
    </style>
  </div>

  {/* Main Call-to-Action */}
  <div style={{ maxWidth: '850px', margin: '0 auto' }}>
    <h2
      style={{
        color: '#283044',
        fontSize: '2.8rem',
        fontWeight: '700',
        marginBottom: '20px',
      }}
    >
      Ready to Make a Difference?
    </h2>
    <p style={{ color: '#444', fontSize: '1.2rem', margin: '12px 0' }}>
      Whether you're launching a new idea or supporting a cause — the time is now.
    </p>
    <p style={{ color: '#444', fontSize: '1.2rem', margin: '12px 0' }}>
      Join us to empower communities and turn visions into reality.
    </p>

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '30px',
      }}
    >
      <Link
        to="/campaigndetails/:id"
        style={{
          padding: '14px 30px',
          borderRadius: '10px',
          backgroundColor: '#283044',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textDecoration: 'none',
        }}
      >
        🎯 Start a Campaign
      </Link>
      <Link
        to="/explore"
        style={{
          padding: '14px 30px',
          borderRadius: '10px',
          border: '2px solid #283044',
          color: '#283044',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textDecoration: 'none',
          backgroundColor: 'transparent',
        }}
      >
        🤝 Contribute Now
      </Link>
    </div>
  </div>
 

</section>
<div className="crowdfunding-warning" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '40px' }}>
  <div className="crowdfunding-warning-content">
    <p>
  Invest with purpose and awareness.
  <br />
  While startups offer exciting opportunities and big rewards, it’s important to understand the risks.
  <br />
  Learn how to make informed decisions in our <strong>Investor FAQ</strong> below.
</p>

    <Link to="/faq" className="faq-button">
      Learn more in our Investor FAQ →
    </Link>
  </div>
</div>



      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <h2>CrowdFunding</h2>
              <p className="footer-description">Empowering dreams and bringing projects to life. Join us to create change.</p>
            </div>

            <div className="footer-links">
              <div className="footer-link-column">
                <h3>Quick Links</h3>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/explore">Explore</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  
                </ul>
              </div>

              <div className="footer-link-column">
                <h3>Resources</h3>
                <ul>
                  <li><a href="/faq">Help Center</a></li>
                  <li><a href="/faq">Terms of Service</a></li>
                  <li><a href="/faq">Privacy Policy</a></li>
                  <li><a href="/faq">FAQ</a></li>
                </ul>
              </div>

               <div className="footer-link-column">
                <h3>Follow Us</h3>
               <div className="footer-social">
  <a href="mailto:tishagupta19nov@gmail.com" className="social-link" title="Email">
    <i className="fas fa-envelope"></i>
  </a>
  <a href="https://www.instagram.com/tishaguptaa" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://github.com/Tisha966" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
    <i className="fab fa-github"></i>
  </a>
  <a href="https://www.linkedin.com/in/tisha-gupta-762626283/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
    <i className="fab fa-linkedin-in"></i>
  </a>
</div>
</div>

              <div className="footer-link-column">
                <h3>How It Works?</h3>
                <p style={{color:"gray"}}>Create Account</p>
                <p style={{color:"gray"}}>Share Idea and Set Goals</p>
                {/* <p style={{color:"gray"}}>Set Goals</p> */}
                {/* <p style={{color:"gray"}}>Promote Widely</p> */}
                <p style={{color:"gray"}}>Collect Funds and Track Progress with our latest news and campaigns.</p>
                {/* <input type="email" placeholder="Your Email" className="newsletter-input" /> */}
                {/* <button className="newsletter-btn">Subscribe</button> */}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p style={{color:"whitesmoke"}}>&copy; 2024 CrowdFunding. All Rights Reserved.</p>
          </div>
        </div>
        
      </footer>
   
    </div>
  );
};

export default Home;
