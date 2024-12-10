// src/Home.js
import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-hero">
        <h1>Welcome to CrowdFunding</h1>
        <p>Empowering ideas, one contribution at a time.</p>
        <button className="cta-button">Get Started</button>
      </header>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>Simple tools to get your project up and running in minutes.</p>
          </div>
          <div className="feature-card">
            <h3>Community Driven</h3>
            <p>Join a community of creators and supporters worldwide.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Payments</h3>
            <p>Fast and secure transactions to keep your contributions safe.</p>
          </div>
        </div>
      </section>

      <section className="join-us">
        <h2>Ready to Launch Your Project?</h2>
        <p>Sign up today and bring your ideas to life!</p>
        <button className="cta-button">Join Now</button>
      </section>

      <footer className="footer">
        <p>&copy; 2024 CrowdFunding. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
