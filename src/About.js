// src/About.js
import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Our Company</h1>
        <p className="intro-text">
          We’re committed to delivering innovative solutions that drive real-world impact and provide value to our clients and community.
        </p>
        <button className="cta-button">Learn More</button>
      </header>
      <section className="features">
        <h2>Our Core Values</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Innovation</h3>
            <p>
              We embrace creativity and push the boundaries to bring fresh ideas to life, shaping the future of technology.
            </p>
          </div>
          <div className="feature-card">
            <h3>Integrity</h3>
            <p>
              Honesty and accountability are at the core of everything we do, ensuring trust and transparency.
            </p>
          </div>
          <div className="feature-card">
            <h3>Community</h3>
            <p>
              We foster an inclusive environment and prioritize meaningful relationships that empower people.
            </p>
          </div>
        </div>
      </section>
      <section className="join-us">
        <h2>Join Our Mission</h2>
        <p>
          Be part of a community that values growth, creativity, and meaningful impact. Together, let’s shape a better future.
        </p>
        <button className="cta-button">Join Now</button>
      </section>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
