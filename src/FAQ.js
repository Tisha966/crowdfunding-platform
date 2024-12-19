import React, { useState } from "react";
import "./faq.css";

function FAQ() {
  const [activeCategory, setActiveCategory] = useState("investor"); 
  const [searchTerm, setSearchTerm] = useState(""); 

  // FAQ data for all categories
  const faqData = {
    investor: [
        "• What is Crowdfunding?",
        "• Why should I invest in startups?",
        "• What are the risks of investing?",
        "• How much can I invest?",
        "• Can I lose money while investing?",
        "• How do I track my investments?",
        "• When can I expect returns on my investment?",
        "• What is the minimum investment amount?",
        "• Are there any tax benefits for investing in startups?",
        "• How do I withdraw my investments?",
        "• What happens if a startup fails?",
        "• Can I invest in multiple startups at once?",
        "• How do I know if a startup is credible?",
        "• What kind of returns can I expect?",
        "• What industries can I invest in?",
        "• How do I update my investor profile?",
        "• What happens after I invest?",
      ],
      founder: [
        "• How do I raise funds for my startup?",
        "• What is the process for getting started?",
        "• Are there any fees for founders?",
        "• What documents do I need to start fundraising?",
        "• How long does the fundraising process take?",
        "• What happens after I raise funds?",
        "• How do I pitch to potential investors?",
        "• Can I raise funds without giving up equity?",
        "• What information should I share with investors?",
        "• How do I set the right valuation for my startup?",
        "• How many investors can I have in my round?",
        "• How do I attract lead investors?",
        "• What happens if I don’t meet my fundraising goal?",
        "• Can I raise funds in multiple rounds?",
        "• What is a SAFE note and how does it work?",
        "• How do I promote my startup campaign?",
        "• Can I withdraw my campaign at any time?",
      ],
    glossary: [
        "• What is equity crowdfunding?",
        "• What is a lead investor?",
        "• What is valuation cap?",
        "• What is a SAFE note?",
        "• What is pre-money valuation?",
        "• What is post-money valuation?",
        "• What is a convertible note?",
        "• What is an accredited investor?",
        "• What is dilution in equity crowdfunding?",
      " •  What is a cap table?",
      " • What is an exit strategy?",
      " • What is a funding round?",
      "• What is carry in investments?",
      "• What is the difference between debt and equity?",
      "• What is ROI (Return on Investment)?",
      "• What is a pro-rata right?",
      "• What is an angel investor?",
    ],
    stuffToRead: [
      " • Beginner’s guide to startup investing",
      " • How to evaluate a startup’s potential",
      "• Success stories in crowdfunding",
      "• How to read a startup’s financials",
      "• What makes a startup a good investment?",
      "• Top mistakes to avoid when investing in startups",
      "• Crowdfunding vs. traditional fundraising",
      "• Why startups fail and how to spot risks early",
      " • How to diversify your investment portfolio",
      " • The future of crowdfunding in technology",
      " • How to identify disruptive startups",
      "• Understanding startup market trends",
      " • Case study: Startup success stories",
      " • How equity crowdfunding has evolved",
      " • Top tips for first-time startup investors",
      " • Learning from failed crowdfunding campaigns",
      " • The role of due diligence in investing",
    ],
  };
  
  // Get the filtered questions based on search term
  const filteredQuestions = faqData[activeCategory].filter((question) =>
    question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-container">
      {/* Header Section */}
      <div className="faq-header">
        <h1>Got a question? We'd love to help!</h1>
        <h2 style={{color:'gray'}}>Can't find what you're looking for?</h2>
        <a href="mailto:support@crowdfunding123.com">Email us: support@crowdfunding123.com</a>
        <div className="faq-search">
          <input
            type="text"
            placeholder="Search the FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
      <h1 style={{color:"teal"}}> GETTING STARTED</h1>

      {/* Category Tabs */}
      <div className="faq-categories">
        <span
          className={activeCategory === "investor" ? "active" : ""}
          onClick={() => {
            setActiveCategory("investor");
            setSearchTerm(""); // Reset search when switching tabs
          }}
        >
          INVESTOR FAQ
        </span>
        <span
          className={activeCategory === "founder" ? "active" : ""}
          onClick={() => {
            setActiveCategory("founder");
            setSearchTerm("");
          }}
        >
          FOUNDER FAQ
        </span>
        <span
          className={activeCategory === "glossary" ? "active" : ""}
          onClick={() => {
            setActiveCategory("glossary");
            setSearchTerm("");
          }}
        >
          GLOSSARY
        </span>
        <span
          className={activeCategory === "stuffToRead" ? "active" : ""}
          onClick={() => {
            setActiveCategory("stuffToRead");
            setSearchTerm("");
          }}
        >
          STUFF TO READ
        </span>
      </div>
    

      {/* Dynamic FAQ Content */}
      <div className="faq-content">
        <h2>
          {activeCategory === "investor" && "Investor Questions"}
          {activeCategory === "founder" && "Founder Questions"}
          {activeCategory === "glossary" && "Glossary Terms"}
          {activeCategory === "stuffToRead" && "Stuff to Read"}
        </h2>
        <ul>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => <li key={index}>{question}</li>)
          ) : (
            <li>No questions found for your search.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FAQ;
