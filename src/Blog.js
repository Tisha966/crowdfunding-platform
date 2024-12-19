/* blog.js */

import React from "react";
import "./blog.css";
import blogImage from "./assets/images/tisha.jpg";

function Blog() {
  return (
    <div className="blog-container">
      <h1 className="blog-title">Crowdfunding Blog</h1>
      <p className="blog-subtitle">
        We post industry news, investor guides, company updates and more.
      </p>
      <div className="blog-categories">
        <span className="active">ALL</span>
        {/* <span>COMPANY ANNOUNCEMENTS</span>
        <span>POLICY</span>
        <span>FROM OUR CEO</span>
        <span>INVESTOR EDUCATION</span>
        <span>FOUNDER STORIES</span> */}
      </div>
      <div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Ravi Kumar on 5 Dec 2023</span>
  </div>
  <h2>Empowering Local Startups in India</h2>
  <p>
    In 2023, Indian startups faced a unique set of challenges. This post discusses the growing opportunities and how innovation is becoming a key driver...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>45 Likes</span> <span style={{color:"#283044"}}>56 Comments</span> <span style={{color:"teal"}}>6 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Sneha Desai on 15 Nov 2023</span>
  </div>
  <h2>Building a Sustainable Future in India</h2>
  <p>
    Sustainability is becoming more important in India. This article explores how businesses can play a role in building a greener, more sustainable future...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>50 Likes</span> <span style={{color:"#283044"}}>30 Comments</span> <span style={{color:"teal"}}>8 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Vikram Singh on 22 Oct 2023</span>
  </div>
  <h2>India’s Digital Transformation: The Road Ahead</h2>
  <p>
    Digital transformation is accelerating in India. This blog discusses the potential impact of digital tools and technologies on businesses...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>60 Likes</span> <span style={{color:"#283044"}}>45 Comments</span> <span style={{color:"teal"}}>7 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Priya Mehta on 17 Oct 2023</span>
  </div>
  <h2>Financial Inclusion in Rural India</h2>
  <p>
    Rural India is gradually embracing digital banking. This post sheds light on the ongoing financial inclusion initiatives and the progress made...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>38 Likes</span> <span style={{color:"#283044"}}>25 Comments</span> <span style={{color:"teal"}}>5 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Amit Kumar on 3 Sep 2023</span>
  </div>
  <h2>The Future of Electric Vehicles in India</h2>
  <p>
    The Indian EV market is gaining momentum. This article explores the growth prospects and challenges for electric vehicles in India...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>72 Likes</span> <span style={{color:"#283044"}}>90 Comments</span> <span style={{color:"teal"}}>9 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Neha Sharma on 21 Aug 2023</span>
  </div>
  <h2>How India is Leading in Tech Innovations</h2>
  <p>
    India has emerged as a leader in technological advancements. This post highlights key innovations and how India is shaping the future of tech...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>85 Likes</span> <span style={{color:"#283044"}}>115 Comments</span> <span style={{color:"teal"}}>10 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Manoj Patel on 10 Aug 2023</span>
  </div>
  <h2>Blockchain Technology in India</h2>
  <p>
    Blockchain is revolutionizing various industries in India. This article explains how blockchain can benefit sectors such as banking, agriculture, and healthcare...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>62 Likes</span> <span style={{color:"#283044"}}>35 Comments</span> <span style={{color:"teal"}}>6 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Ritika Gupta on 25 Jul 2023</span>
  </div>
  <h2>Smart Cities: The Future of Urban India</h2>
  <p>
    India is rapidly adopting smart city solutions. This post delves into how technology is transforming cities like Ahmedabad, Pune, and Bengaluru...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>74 Likes</span> <span style={{color:"#283044"}}>50 Comments</span> <span style={{color:"teal"}}>7 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Karan Verma on 10 Jul 2023</span>
  </div>
  <h2>Entrepreneurship in India: Trends and Challenges</h2>
  <p>
    The Indian entrepreneurship ecosystem is booming. In this post, we explore the latest trends and the challenges entrepreneurs face while building their businesses...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>88 Likes</span> <span style={{color:"#283044"}}>120 Comments</span> <span style={{color:"teal"}}>8 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Geeta Yadav on 30 Jun 2023</span>
  </div>
  <h2>The Rise of E-commerce in India</h2>
  <p>
    E-commerce has seen significant growth in India, especially post-pandemic. This post discusses the future of e-commerce in the Indian market...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>90 Likes</span> <span style={{color:"#283044"}}>140 Comments</span> <span style={{color:"teal"}}>11 min read</span>
  </div>
</div>

<div className="blog-card">
  <div className="author-info">
    <img
      src={blogImage}
      alt="Author"
      className="author-image"
    />
    <span>Sanjay Rao on 15 Jun 2023</span>
  </div>
  <h2>Tech Startups in India: The Growth Story</h2>
  <p>
    India's startup ecosystem is thriving. This article discusses the growth of tech startups and how they are shaping the future of innovation in India...
  </p>
  <div className="blog-meta">
    <span style={{color:"red"}}>93 Likes</span> <span style={{color:"#283044"}}>160 Comments</span> <span style={{color:"teal"}}>12 min read</span>
  </div>
</div>

    </div>
  );
}

export default Blog;
