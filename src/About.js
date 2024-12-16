import React from 'react';
import './about.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <header className="about-header">
        <h1>About Us</h1>
        <p className="intro-text">
          We are committed to creating innovative solutions that make a real impact. Our focus is on delivering value to both our clients and the wider community.
        </p>
        <button className="cta-button">Learn More About Us</button>
      </header>

      {/* Core Values Section */}
      <section className="core-values">
        <h2>Our Core Values</h2>
        <div className="value-cards">
          <div className="value-card">
            <FaCheckCircle className="value-icon" />
            <h3>Innovation</h3>
            <p>
              We believe in pushing boundaries to deliver creative and forward-thinking solutions that drive change.
            </p>
          </div>
          <div className="value-card">
            <FaCheckCircle className="value-icon" />
            <h3>Integrity</h3>
            <p>
              Transparency, accountability, and honesty guide our every decision, ensuring trust with our clients and partners.
            </p>
          </div>
          <div className="value-card">
            <FaCheckCircle className="value-icon" />
            <h3>Community</h3>
            <p>
              We are committed to building a collaborative and inclusive community that empowers individuals to thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Do's and Don'ts Section */}
      <section className="dos-donts">
        <h2>Our Do's and Don'ts</h2>
        <div className="dos-donts-cards">
          <div className="dos-card">
            <h3>Do's</h3>
            <ul>
              <li><FaCheckCircle className="checkmark" /> Deliver high-quality results</li>
              <li><FaCheckCircle className="checkmark" /> Foster positive relationships with clients</li>
              <li><FaCheckCircle className="checkmark" /> Be proactive in problem-solving</li>
            </ul>
          </div>
          <div className="donts-card">
            <h3>Don'ts</h3>
            <ul>
              <li><FaTimesCircle className="crossmark" /> Compromise on integrity</li>
              <li><FaTimesCircle className="crossmark" /> Ignore feedback from clients</li>
              <li><FaTimesCircle className="crossmark" /> Cut corners to save time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      {/* <section className="join-us">
        <h2>Join Our Mission</h2>
        <p>
          Become part of a team that values creativity, integrity, and a passion for making a positive impact. Together, we can shape the future.
        </p>
        <button className="cta-button">Join Us Today</button>
      </section> */}

      {/* Footer */}
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
                       <li><a href="#">Help Center</a></li>
                       <li><a href="#">Terms of Service</a></li>
                       <li><a href="#">Privacy Policy</a></li>
                       <li><a href="#">FAQ</a></li>
                     </ul>
                   </div>
     
                   <div className="footer-link-column">
                     <h3>Follow Us</h3>
                     <div className="footer-social">
                       <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                       <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                       <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                       <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                     </div>
                   </div>
     
                   <div className="footer-link-column">
                     <h3>Newsletter</h3>
                     <p>Stay updated with our latest news and campaigns.</p>
                     <input type="email" placeholder="Your Email" className="newsletter-input" />
                     <button className="newsletter-btn">Subscribe</button>
                   </div>
                 </div>
               </div>
     
               <div className="footer-bottom">
                 <p>&copy; 2024 CrowdFunding. All Rights Reserved.</p>
               </div>
             </div>
           </footer>
    </div>
  );
};

export default About;
