// blog.js
import React, { useState } from "react";
import "./blog.css";
import blogImage from "./assets/images/tisha.jpg";
import NewBlogForm from "./NewBlogForm";

const blogData = [
  {
    id: 1,
    title: "Empowering Local Startups in India",
    author: "Ravi Kumar",
    date: "5 Dec 2023",
    excerpt: "In 2023, Indian startups faced a unique set of challenges...",
    likes: 45,
    comments: 56,
    readTime: "6 min read",
    category: "STARTUPS",
  },
  {
    id: 2,
    title: "Building a Sustainable Future in India",
    author: "Sneha Desai",
    date: "15 Nov 2023",
    excerpt: "Sustainability is becoming more important in India...",
    likes: 50,
    comments: 30,
    readTime: "8 min read",
    category: "ENVIRONMENT",
  },
  // Add more blog objects here...
];

const categories = ["ALL", "STARTUPS", "ENVIRONMENT"];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [blogs, setBlogs] = useState(blogData); // new state

  const handleAddBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  const filteredBlogs =
    selectedCategory === "ALL"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

 return (
  <div className="blog-container">
    <h1 className="blog-title">Crowdfunding Blog</h1>
    <p className="blog-subtitle">
      We post industry news, investor guides, company updates and more.
    </p>

    <div className="blog-categories">
      {categories.map((cat) => (
        <span
          key={cat}
          className={selectedCategory === cat ? "active" : ""}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </span>
      ))}
    </div>

    {filteredBlogs.map((blog) => (
      <div className="blog-card" key={blog.id}>
        <div className="author-info">
          <img src={blogImage} alt="Author" className="author-image" />
          <span>
            {blog.author} on {blog.date}
          </span>
        </div>
        <h2>{blog.title}</h2>
        <p>{blog.excerpt}</p>
        <div className="blog-meta">
          <span style={{ color: "red" }}>{blog.likes} Likes</span>
          <span style={{ color: "#283044" }}>{blog.comments} Comments</span>
          <span style={{ color: "teal" }}>{blog.readTime}</span>
        </div>
      </div>
    ))}

    {/* 📌 Move form here */}
    <NewBlogForm onAddBlog={handleAddBlog} />
  </div>
);

}

export default Blog;
