import React, { useState, useEffect, useRef } from "react";
import "./PlaybookSection.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaybookSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    return token && token.length > 10 && userId;
  };

  useEffect(() => {
    const loggedIn = isUserLoggedIn();
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      setStatus({
        type: "error",
        message: "You must be logged in to submit feedback.",
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUserLoggedIn()) {
      setStatus({
        type: "error",
        message: "You must be logged in to submit feedback.",
      });
      navigate("/login");
      return;
    }
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    try {
      await axios.post(
        `${API_BASE_URL}/api/feedback/submit`,
        { name, email, message },
        { headers: { "Content-Type": "application/json" } }
      );

      setStatus({ type: "success", message: "Feedback successfully submitted!" });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  const toggleAnswer = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  // Close answer when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveItem(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="playbook-container" ref={containerRef}>
      {/* Templates */}
      <div className="section templates">
        <h2>Templates</h2>
        <p>Use these ready-made templates to save time and communicate with your backers.</p>
        <div className="list">
          {[
            ["template1", "Welcome Email", "Thank them personally and explain next steps."],
            ["template2", "Milestone Update", "Celebrate milestones with gratitude and progress info."],
            ["template3", "Final Reminder", "Remind your audience before the campaign ends."],
            ["template4", "Thank You Message", "Send a heartfelt note after campaign success."],
            ["template5", "Reward Update", "Share reward delivery timeline or changes."]
          ].map(([id, label, answer]) => (
            <div key={id}>
              <div className="list-item" onClick={() => toggleAnswer(id)}><a>{label}</a></div>
              {activeItem === id && <div className="solution-box"><p>{answer}</p></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="section resources">
        <h2>Resources</h2>
        <p>Essential guides, tools, and downloads to help your campaign succeed.</p>
        <div className="list">
          {[
            ["resource1", "Pre-launch Checklist", "Covers branding, video, timeline, outreach, and setup."],
            ["resource2", "Investor Deck Template", "A presentation framework to pitch effectively."],
            ["resource3", "Legal Compliance Pack", "Helps with terms, policies, and disclosures."],
            ["resource4", "Press Kit", "Get media-ready with bios, logos, and summaries."],
            ["resource5", "Budget Planner", "Track expenses and set clear campaign goals."]
          ].map(([id, label, answer]) => (
            <div key={id}>
              <div className="list-item" onClick={() => toggleAnswer(id)}><a>{label}</a></div>
              {activeItem === id && <div className="solution-box"><p>{answer}</p></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="section best-practices">
        <h2>Best Practices</h2>
        <p>Time-tested strategies from successful campaigns that you can apply today.</p>
        <div className="list">
          {[
            ["practice1", "Tell a Story", "Stories connect emotionally—share your journey."],
            ["practice2", "Offer Rewards", "Give thoughtful incentives to backers."],
            ["practice3", "Be Consistent", "Post regular updates and keep the audience engaged."],
            ["practice4", "Social Sharing", "Use Instagram, Twitter, and LinkedIn to amplify reach."],
            ["practice5", "Build Trust", "Respond promptly and be transparent about progress."]
          ].map(([id, label, answer]) => (
            <div key={id}>
              <div className="list-item" onClick={() => toggleAnswer(id)}><a>{label}</a></div>
              {activeItem === id && <div className="solution-box"><p>{answer}</p></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Video Tutorials */}
      <div className="section video-tutorials">
        <h2>Video Tutorials</h2>
        <p>Step-by-step guides to maximize your fundraising efforts.</p>
        <div className="list">
          {[
            ["video1", "Engage Backers", "Keep them involved through stories, Q&As, and updates."],
            ["video2", "Create Campaign Video", "Introduce yourself, your mission, and the ask clearly."],
            ["video3", "Pitch to Early Investors", "Focus on value, passion, and social proof."],
            ["video4", "Build a Network", "Leverage personal and professional circles."],
            ["video5", "Optimize Landing Page", "Use visuals, clear call-to-actions, and concise copy."]
          ].map(([id, label, answer]) => (
            <div key={id}>
              <div className="list-item" onClick={() => toggleAnswer(id)}><a>{label}</a></div>
              {activeItem === id && <div className="solution-box"><p>{answer}</p></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="section feedback-form grayish-box">
        <h2>Got Feedback or Questions?</h2>
        {!isLoggedIn ? (
          <div className="feedback-login-prompt">
            <p>If you have any feedback about our site or need help, please <a href="/login" className="highlight-link">log in</a> to get in touch with us.</p>
          </div>
        ) : (
          <>
            <p>We're here to help and love hearing from you!</p>
            <div className="feedback-options">
              <p>📬 Email us at <a href="mailto:tishagupta19nov@gmail.com" className="highlight-link">tishagupta19nov@gmail.com</a></p>
              <p>💡 Visit our <a href="/faq" className="highlight-link">Help Center</a> for FAQs and guides.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaybookSection;
