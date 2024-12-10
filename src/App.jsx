import React, { useEffect } from 'react';
import './index.css';  // Import the CSS file

const App = () => {
  useEffect(() => {
    // Add animation classes when the component mounts
    const aboutSection = document.querySelector('.about-crowdfunding');
    const heroText = document.querySelector('.hero-section p');
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      // Animate the about section when it's in view
      if (aboutSection.getBoundingClientRect().top < window.innerHeight - 100) {
        aboutSection.classList.add('visible');
      }

      // Animate hero section text
      if (scrollPosition > 50) {
        heroText.classList.add('visible');
      }
    });
  }, []);

  return (
    <div>
      <nav>
        <div className="logo">CrowdFunding</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/explore">Explore</a></li>
          <li><a href="#">Create Campaign</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url('../public/images/funding15.jpg')` }}>
        <h1>Raise funds for your creative projects and bring your ideas to life.</h1>
        <p id="hero-typing">
          Our platform connects passionate creators with supporters who believe in their vision. Whether you're launching a new product,
          organizing an event, or working on an artistic project, we're here to help you make it a reality.
          Start your journey with us today and turn your dreams into success!
        </p>
        <a href="/signup" className="cta-button">Get Started</a>
      </div>

      {/* About Crowdfunding Section */}
      <section className="about-crowdfunding">
        <div className="content">
          <h2>What is Crowdfunding?</h2>
          <p>
            Crowdfunding is a way of raising money from a large number of people to fund a project, idea, or cause.
            By connecting with backers who believe in your vision, you can turn your ideas into reality.
          </p>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Crowdfund Designed By Tisha Gupta. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
