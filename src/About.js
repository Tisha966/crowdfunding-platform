import React from "react";
import "./about.css";
import { Link } from "react-router-dom";

import profileImage from "./assets/images/fund10.jpg";

import img3 from "./assets/images/tishapic_blackcrop.jpg";

import img1 from "./assets/images/1_img.jpg";
import img2 from "./assets/images/2_img.jpg";

import img4 from "./assets/images/3_img.jpg";

const About = () => {
  return (
    <>
      {/* Hero / Mission Section */}
      <div className="about-bg-wrapper">
        <div className="about-box">
        <h2 className="stats-header" style={{ color: "teal" }}>
         Invest in the In-Between : Where Ideas Become Reality
        </h2>
        <hr className="line" />

        <div className="stats">
          <div className="stat">
            <h1>₹12,400</h1>
            <p>Median Investment</p>
          </div>
          <div className="stat">
            <h1>1,245</h1>
            <p>Founders Funded</p>
          </div>
          <div className="stat">
            <h1 style={{ color: "#ff7f50" }}>₹3,200 Cr</h1>
            <p>Raised on CROWDFUNDING</p>
          </div>
        </div>
          

          <div className="about-flex">
            <div className="about-text">
              <p>
                Hello! We are a passionate team committed to making crowdfunding more transparent,
                more personal, and more powerful. We believe in helping dreamers take bold steps.
              </p>
              <p>
                With a presence in 25+ countries, thousands of creators, and millions raised, our
                platform supports you from idea to impact.
              </p>
              <p>
                We're here not just to fund dreams—but to fuel revolutions, communities, and change.
              </p>
            </div>
            <div className="about-float-img">
              <img src={profileImage} alt="Founder" />
            </div>
          </div>
        </div>
    

      {/* Stats Section */}
   

        <div className="tags-container">
          <div className="tags">
            <span className="no-move">📊 Virtual Reality Workspaces</span>
            <span className="no-move">🐾 A Cure for Cancer in Dogs</span>
            <span className="no-move">📰 Increasing Media Literacy</span>
            <span className="no-move">🛒 Community-Owned Supermarkets</span>
            <span className="no-move">🍶 Artisanal Korean Rice Wines</span>
            <span className="no-move">💉 Vaccine Distribution at Scale</span>
            <span className="no-move">🍺 A Brewery in the Heart of America</span>
            <span className="no-move">🌍 Global Climate Change Solutions</span>
            <span className="no-move">🎓 Free Education for Underprivileged Kids</span>
            <span className="no-move">🛠 Innovations in Renewable Energy</span>
            <span className="no-move">🌱 Urban Farming Initiatives</span>

            <span className="move">🤖 AI-Powered Healthcare Systems</span>
            <span className="move">🚀 Space Exploration Technologies</span>
            <span className="move">📱 Next-Gen Mobile Applications</span>
            <span className="move">🍃 Zero-Waste Sustainable Products</span>
            <span className="move">📚 AI-Driven Learning Platforms</span>
          </div>
        </div>
      </div>

      {/* Crowdfunding Guide Section */}
   <div className="crowdfunding-container">
  <section className="section-block">
    <div className="text-content">
      <h2>What is Crowdfunding?<br />Everything You Should Know</h2>
      <p>
        Our crowdfunding platform is a user-friendly space where individuals and organizations in India can raise funds for causes that truly matter—whether it's medical emergencies, educational support, community development, or animal welfare.
      </p>
      <p>
        Campaigners can easily create a fundraiser, add compelling stories, set a funding goal, and upload real photos or videos to build trust. Each campaign is designed to connect emotionally and transparently with potential supporters.
      </p>
      {/* <p>
        We’ve made sharing seamless across WhatsApp, Instagram, Facebook, and more, helping you reach friends, family, and generous strangers in just a few clicks.
      </p> */}
      <p>
        Whether you're raising funds for yourself, someone you care about, or a larger cause, our platform offers real-time tracking, donor visibility, and updates to keep your supporters engaged throughout your journey.
      </p>
      <p>
        If you're ready to make a difference, start your own campaign and be part of a community that's creating real impact—one donation at a time.
      </p>
      <Link to={"/campaignDetails/:id"}>
        <button className="start-btn">Start a Campaign</button>
      </Link>
    </div>
    <div className="image-content">
      <img src={img3} alt="Crowdfunding explanation" />
    </div>
  </section>




        {/* SECTION 2 */}
        <section className="section-block reverse">
  <div className="text-content">
    <h2 style={{ color: "#283044" }}>Tell a Compelling Story</h2>
   <p>
  Whether you're fundraising for medical needs, education, or social causes in India, your story is the heartbeat of your campaign. A powerful narrative doesn't just inform—it inspires. From the very first line of your title to the images you use, every element should clearly convey why this cause matters.

  Begin by painting a vivid picture of the situation: Who is affected? What challenges are they facing? Why is immediate help needed? Be honest and transparent about the background—this builds credibility. Explain how the funds will be used in a step-by-step manner, whether for hospital bills, school fees, rehabilitation, or community development.
</p>

<br>

</br>
<p>
  Use real, high-quality photos to humanize your story. Show the faces behind the cause—smiles, struggles, and everyday moments. This creates a connection and reminds supporters that their contributions are impacting real lives. Include quotes, short testimonials, or updates to maintain engagement and show progress.

  Lastly, keep your tone hopeful yet urgent. People give not just because there's a need—but because they believe they can help create change. Your story should make them feel that.
</p>

  </div>
  <div className="image-content">
    <img src={img1} alt="Fundraising in India" />
  </div>
</section>

{/* SECTION 3 */}
<section className="section-block">
  <div className="text-content">
    <h2 style={{ color: "#283044" }}>Share and Stay Connected</h2>
    <p>
      Fundraisers in India often succeed through frequent sharing on platforms like WhatsApp,
      Instagram, and Facebook. Each share helps bring in more visibility and contributions.
      Keeping donors updated about progress or milestones builds credibility and motivates
      continued support.
      <br /><br />
      On our crowdfunding platform, sharing is seamless—campaigners can easily generate shareable links and update supporters with just a few clicks. The more your story is seen, the greater the chances of reaching your fundraising goals. Community involvement grows with every post, helping turn awareness into action.
    </p>
  </div>
  <div className="image-content">
    <img src={img2} alt="Sharing fundraiser updates" />
  </div>
</section>


<section className="section-block reverse">
  <div className="text-content">
    <h2 style={{ color: "#283044" }}>Thank Your Donors</h2>
    <p>
      A personal thank you goes a long way in India’s closely-knit communities. Whether it’s a
      message, email, or a social media shoutout, expressing gratitude makes donors feel valued.
      It also encourages them to share your campaign with others, increasing your reach.
      <br /><br />
      Our platform makes it easy to send quick thank-you notes or post public acknowledgments.
      You can highlight your top supporters, share updates that showcase their impact, and build lasting trust. Gratitude fosters a community of recurring donors who are more likely to support future causes and spread the word further.
    </p>
  </div>
  <div className="image-content">
    <img src={img4} alt="Thanking donors in India" />
  </div>
</section>


      </div>

      {/* Milestones Timeline */}
    
  
  {/* FAQ Section */}
<div className="faq-section">
  <h2 className="faq-title">4 of the most common questions about crowdfunding</h2>
  <div className="faq-list">
    <details>
      <summary>How do I know if crowdfunding is right for me?</summary>
      <p>
        Crowdfunding is ideal if you have a clear goal, a compelling story, and a supportive network. It's great for both personal needs and larger social causes.
      </p>
    </details>
    <details>
      <summary>What are the different types of crowdfunding?</summary>
      <p>
        There are several types, including donation-based, reward-based, equity-based, and debt crowdfunding—each suited for different funding goals.
      </p>
    </details>
    <details open>
      <summary>Is it okay to raise money for myself?</summary>
      <p>
        Absolutely. Asking for help online can feel hard, but many people understand financial hardship. You'll likely find generous people willing to support you.
      </p>
    </details>
    <details>
      <summary>What is the best way to get more donations?</summary>
      <p>
        Share your story regularly, add updates, post across social media, and thank your supporters. Engaging content leads to more visibility and support.
      </p>
    </details>
  </div>
</div>

      {/* Call to Action */}
      <div className="call-to-action">
        <h3>Ready to Get Started?</h3>
        <p>
          Whether you're looking to invest in the next big idea or raise funds for your own, we're
          here to support your journey.
        </p>
        <Link to="/explore">
          <button className="cta-button">Explore Campaigns</button>
        </Link>
      </div>
    </>
  );
};

export default About;
