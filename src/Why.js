import React from "react";
import "./Why.css";
import CategoryHighlights from "./CategoryHighlights"; // Import the new section

const Why = () => {
  return (
    <>
      <div className="crowdfunding-container">
        <h1 
          className="crowdfunding-title" 
          style={{
            color: "gray", 
            fontFamily:"revert-layer",
            fontWeight: "350",
            fontStyle: "normal",
            letterSpacing: "0.5px",
          }}
        >
          Why invest in our Crowdfunding Platform?
        </h1>

        <p className="crowdfunding-subtitle" style={{color:"teal"}}>
          Empower projects, build your portfolio, and be a part of meaningful change.
        </p>

        <div className="crowdfunding-cards-wrapper">
          <div className="crowdfunding-cards">
            {/* Existing Cards */}
            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#128200;</div>
              <h2>Support Innovation</h2>
              <p>Invest in projects that align with your values and help ideas become reality.</p>
            </div>

            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#128181;</div>
              <h2>Earn Equity</h2>
              <p>Your contributions can give you a stake in the success of startups.</p>
            </div>

            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#128640;</div>
              <h2>Make an Impact</h2>
              <p>Support causes you care about and witness the results of your investments.</p>
            </div>

            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#128178;</div>
              <h2>Gain Experience</h2>
              <p>Explore varied investment opportunities and grow your financial acumen.</p>
            </div>

            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#128257;</div>
              <h2>Build Your Portfolio</h2>
              <p>Diversify by supporting multiple projects across sectors.</p>
            </div>

            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#128217;</div>
              <h2>Access Exclusive Deals</h2>
              <p>Get early-bird access to offers and limited-time investment opportunities.</p>
            </div>

            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#128221;</div>
              <h2>Be a Visionary</h2>
              <p>Help launch the next big ideas and contribute to a brighter future.</p>
            </div>

            {/* New Cards */}
            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#128736;</div>
              <h2>Support Local Startups</h2>
              <p>Invest in Indian entrepreneurs and small businesses with big potential.</p>
            </div>

            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#129309;</div>
              <h2>Join a Community</h2>
              <p>Connect with like-minded investors and creators passionate about change.</p>
            </div>

            <div className="crowdfunding-card">
              <div className="crowdfunding-icon">&#127758;</div>
              <h2>Promote Sustainability</h2>
              <p>Fund green and eco-friendly initiatives for a cleaner, better planet.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 👇 New Circular Category Section */}
      <CategoryHighlights />
    </>
  );
};

export default Why;
