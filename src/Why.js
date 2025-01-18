import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Why.css";

const Why = () => {
  return (
    <div className="crowdfunding-container">
      <h1 className="crowdfunding-title">Why invest in our Crowdfunding Platform?</h1>
      <p className="crowdfunding-subtitle">
        Empower projects, build your portfolio, and be a part of meaningful change.
      </p>
      <div className="crowdfunding-cards-wrapper">
        <div className="crowdfunding-cards">
          <div className="crowdfunding-card">
            <div className="crowdfunding-icon">&#128200;</div>
            <h2>Support Innovation</h2>
            <p>
              Invest in projects that align with your values and vision. Be a catalyst for innovation and help ideas become reality.
            </p>
          </div>
          <div className="crowdfunding-card">
            <div className="crowdfunding-icon">&#128181;</div>
            <h2>Earn Equity</h2>
            <p>
              Your contributions don’t just support projects; they can also give you a stake in the success of innovative startups.
            </p>
          </div>
          <div className="crowdfunding-card">
            <div className="crowdfunding-icon">&#128640;</div>
            <h2>Make an Impact</h2>
            <p>
              Contribute to causes you care about and see the tangible results of your investments on our platform.
            </p>
          </div>
          {/* Add unique cards with different content */}
          <div className="crowdfunding-card">
            <div className="crowdfunding-icon">&#128178;</div>
            <h2>Gain Experience</h2>
            <p>
              Participate in a variety of investment opportunities and learn valuable lessons along the way.
            </p>
          </div>
          <div className="crowdfunding-card">
            <div className="crowdfunding-icon">&#128257;</div>
            <h2>Build Your Portfolio</h2>
            <p>
              Diversify your investment portfolio by supporting multiple projects and startups.
            </p>
          </div>
          
          <div className="crowdfunding-card">
            <div className="crowdfunding-icon">&#128217;</div>
            <h2>Access Exclusive Deals</h2>
            <p>
              Get access to special offers, early-bird investments, and other exclusive opportunities.
            </p>
          </div>
          
          <div className="crowdfunding-card">
            <div className="crowdfunding-icon">&#128221;</div>
            <h2>Be a Visionary</h2>
            <p>
              Support groundbreaking projects and become part of the next big thing in the entrepreneurial world.
            </p>
          </div>
        </div>
      </div>
      <div className="crowdfunding-warning">
        <p>
          Never invest more than you can afford to lose.
          <br />
          Investing in startups carries risks, but it also opens doors to high rewards and meaningful contributions.
        </p>
        <Link to="/faq" className="faq-button">
          Learn more in our Investor FAQ →
        </Link>
      </div>
      
    </div>
  );
};

export default Why;
