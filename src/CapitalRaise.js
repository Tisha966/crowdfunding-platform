import React from "react";
import "./CapitalRaise.css";
import Image from "./assets/images/tisha.jpg"; // Correct path and extension
import { Link } from "react-router-dom";

const CapitalRaise = () => {
  return (
    <div className="capital-raise-container">
      <div className="capital-raise-header">
        <h1>More than just a capital raise</h1>
        <p>
          Now you have thousands of Indian investors who will support your vision.
          Just ask, and they might...
        </p>
      </div>

      <div className="testimonial-section">
        <div className="testimonial-sidebar">
          <ul>
            <li>Be your ambassadors</li>
            <li>Expand your network</li>
            <li>Refer customers to you</li>
            <li>Support your vision</li>
            <li>Enhance your credibility</li>
          </ul>
        </div>

        <div className="testimonial-content">
          <blockquote>
            "In year 1, we scaled our product sales to over ₹6 crore. Our community
            investors are proud to be associated with us and say, <span className="highlight">This is something I’m proud to back.</span>"
          </blockquote>
          <p className="author">
  <strong style={{ fontSize: "25px"}}>Tisha Gupta</strong>
  <br />
  <span style={{ color: "gray", fontWeight: "bold" }}>Founder, Indian Organic Foods</span>
  <br />
  <span style={{ color: "gray", fontWeight: "bold" }}>Raised ₹5 crore from 2,000 investors</span>
</p>

</div>
        <div className="testimonial-image">
          <img src={Image} alt="Tisha Gupta" />
        </div>
      </div>
    </div>
  );
};
export default CapitalRaise;
