import React, { useState } from "react";
import "./faq.css";

function FAQ() {
  const [activeCategory, setActiveCategory] = useState("investor");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = {
    investor: [
      {
        question: "What is crowdfunding for investors?",
        answer: "Crowdfunding for investors is an opportunity to support startups and gain potential equity in return.",
      },
      {
        question: "Is it safe to invest in crowdfunding startups?",
        answer: "While every investment carries risk, we vet campaigns for credibility and offer transparency throughout the process.",
      },
      {
        question: "What returns can I expect from my investment?",
        answer: "Returns depend on startup performance. Early-stage investments can yield high returns but come with higher risks.",
      },
      {
        question: "How can I track my investments?",
        answer: "Your dashboard provides real-time updates, funding milestones, and regular reports from campaigners.",
      },
      {
        question: "Can I invest in multiple campaigns?",
        answer: "Yes, diversifying across different campaigns can help manage risk.",
      },
      {
        question: "Is there a minimum investment amount?",
        answer: "Yes, each campaign sets its own minimum. Typically, it starts from INR 500.",
      },
      {
        question: "What happens if a campaign fails?",
        answer: "If a campaign doesn't reach its goal, your funds may be refunded, depending on campaign terms."
      },
    ],
    founder: [
      {
        question: "How can I start a fundraising campaign?",
        answer: "Sign up, complete your profile, and submit your campaign idea. Our team reviews and approves within 48 hours.",
      },
      {
        question: "Do I need a company to raise funds?",
        answer: "Not necessarily. Individuals can raise funds for personal causes or social initiatives as well.",
      },
      {
        question: "How long does my campaign stay active?",
        answer: "You can run your campaign for up to 60 days. Extensions may be available upon request.",
      },
      {
        question: "What kind of media should I include in my campaign?",
        answer: "High-quality images and a heartfelt video pitch are highly recommended to gain trust.",
      },
      {
        question: "How do I promote my campaign?",
        answer: "Use our integrated share tools to spread your campaign across social media and messaging apps.",
      },
      {
        question: "Do I need to return the funds if the goal is not reached?",
        answer: "It depends on whether your campaign is all-or-nothing or keep-what-you-raise.",
      },
      {
        question: "How are donations transferred to me?",
        answer: "Once your campaign closes, verified funds are securely transferred to your bank account."
      },
    ],
    glossary: [
      {
        question: "What is equity crowdfunding?",
        answer: "A method of raising capital where investors receive a stake in the company in exchange for funds.",
      },
      {
        question: "What is a pitch deck?",
        answer: "A presentation that provides an overview of your startup, your goals, and financial projections.",
      },
      {
        question: "What does due diligence mean?",
        answer: "The research investors conduct before investing to verify a startup’s claims and credibility.",
      },
      {
        question: "What is a SAFE note?",
        answer: "A Simple Agreement for Future Equity, used to raise money without setting a valuation.",
      },
      {
        question: "What is pre-money valuation?",
        answer: "The valuation of a company before receiving external funding or investment.",
      },
      {
        question: "What is dilution?",
        answer: "Dilution refers to the decrease in existing shareholders’ ownership when new shares are issued.",
      },
      {
        question: "What is a lead investor?",
        answer: "An investor who sets the terms and leads the investment round, often bringing credibility to the campaign."
      },
    ],
    stuffToRead: [
      {
        question: "Beginner’s guide to crowdfunding",
        answer: "Covers all basics—from how to start a campaign to attracting donors and achieving your goals.",
      },
      {
        question: "Case studies of successful campaigns",
        answer: "Real stories from campaigns that raised funds successfully using our platform.",
      },
      {
        question: "How to market your fundraiser",
        answer: "Learn strategies for using social media, email, and community networks to promote your campaign.",
      },
      {
        question: "Common mistakes in crowdfunding",
        answer: "Avoid pitfalls like unclear goals, poor visuals, or lack of updates to increase your chances.",
      },
      {
        question: "Understanding donor behavior",
        answer: "Insights into what motivates people to donate and how you can appeal to their values.",
      },
      {
        question: "Tips for first-time fundraisers",
        answer: "Guidance on campaign structure, tone, and realistic goal-setting.",
      },
      {
        question: "Post-campaign engagement",
        answer: "How to keep donors informed and involved even after your campaign ends."
      },
    ],
  };

  const filteredQuestions = faqData[activeCategory].filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Got a question? We'd love to help!</h1>
        <h2 style={{ color: 'gray' }}>Can't find what you're looking for?</h2>
        <a href="mailto:support@crowdfunding123.com">Email us: tishagupta19nov@gmail.com</a>
        <div className="faq-search">
          <input
            type="text"
            placeholder="Search the FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon" role="img" aria-label="search icon">🔍</span>
        </div>
      </div>

      <h1 style={{ color: "teal" }}>GETTING STARTED</h1>

      <div className="faq-categories">
        {Object.keys(faqData).map((cat) => (
          <span
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => {
              setActiveCategory(cat);
              setSearchTerm("");
              setActiveIndex(null);
            }}
          >
            {cat.toUpperCase().replace(/([A-Z])/g, ' $1').trim()}
          </span>
        ))}
      </div>

      <div className="faq-content">
        <h2>{activeCategory.toUpperCase()}</h2>
        <ul>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, index) => (
              <li
                key={index}
                className="faq-item"
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              >
                <strong>{item.question}</strong>
                {activeIndex === index && (
                  <p className="faq-answer">{item.answer}</p>
                )}
              </li>
            ))
          ) : (
            <li>No questions found for your search.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FAQ;