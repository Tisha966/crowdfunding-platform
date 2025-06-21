import React from "react";
import "./CategoryHighlights.css";
import tech from "./assets/images/tech.jpg";
import water from "./assets/images/water.jpg";
import hunger from "./assets/images/hunger.jpg";
import mental from "./assets/images/mental.jpg";
import oldlady from "./assets/images/oldlady.jpeg";
import orphan from "./assets/images/orphan.jpg";
import { Link } from "react-router-dom";

const categories = [
  { name: "Medical", image: tech },
  { name: "Education", image: water },
  { name: "Emergency", image: hunger },
  { name: "Business", image: mental },
  { name: "Animal", image: oldlady },
  { name: "Your Cause", image: orphan },
];


const CategoryHighlights = () => {
  return (
    <section className="category-highlight-container">
      <h2 className="highlight-title">Explore Campaign Categories</h2>
      <p className="highlight-subtitle">Support the causes that matter most to you</p>
      <div className="circle-category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-circle">
            <img src={cat.image} alt={cat.name} />
            {/* <span>{cat.name}</span> */}
          </div>
        ))}
      </div>
      <Link to="/create-campaign" className="highlight-link">
      <button className="highlight-btn">Ideas await - let's explore!</button>
      </Link>
    </section>
  );
};

export default CategoryHighlights;
