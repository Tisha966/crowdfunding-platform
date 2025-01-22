import React, { useState } from 'react';
import './Testimonials.css';

// Updated testimonials with longer text, Indian names, and added Explore Campaigns link
const testimonials = [
  {
    text: "This platform helped me raise funds for my startup effortlessly. The entire process was seamless, and I received amazing support from donors worldwide. It's the best crowdfunding platform I've ever used.",
    name: "Amit Sharma",
  },
  {
    text: "I was able to support a cause close to my heart through this platform. The transparency and communication throughout the campaigns are remarkable. ",
    name: "Priya Deshmukh",
  },
  {
    text: "The platform's transparency and ease of use are commendable! I could start my campaign in minutes and track every donation in real-time. Thank you for helping me bring my dream project to life.",
    name: "Rajesh Kumar",
  },
  {
    text: "I reached my fundraising goal within two weeks. The user interface is incredibly intuitive, and I could connect with donors easily. It's an outstanding experience overall!",
    name: "Sneha Gupta",
  },
  {
    text: "This platform connected me to thousands of donors who believed in my cause. It changed my life for the better, and I can't thank the team enough for their unwavering support.",
    name: "Vivek Verma",
  },
  {
    text: "The 'Explore Campaigns' feature makes it easy to find meaningful causes. I donated to a campaign that saved hundreds of lives and couldn't be happier with my decision.",
    name: "Ananya Iyer",
  },
  {
    text: "I raised funds for my medical treatment with great ease here. It was an emotional journey, but the platform and its community stood by me like a family.",
    name: "Karan Singh",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="testimonials-container">
      <button className="arrow left" onClick={goToPrevious}>
        &lt; {/* Left arrow */}
      </button>
      <div
        className="testimonials-carousel"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <p>"{testimonial.text}"</p>
            <span className="testimonial-name">- {testimonial.name}</span>
            {/* Link to Explore Page */}
            <a href="/explore" className="explore-link">
              Explore Campaigns
            </a>
          </div>
        ))}
      </div>
      <button className="arrow right" onClick={goToNext}>
        &gt; {/* Right arrow */}
      </button>
    </div>
  );
}

export default Testimonials;
