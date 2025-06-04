import React, { useState } from "react";
import "./NewBlogForm.css";

function NewBlogForm({ onAddBlog }) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    excerpt: "",
    category: "STARTUPS",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString("en-GB"),
      likes: 0,
      comments: 0,
      readTime: "5 min read",
    };
    onAddBlog(newBlog);
    setFormData({ author: "", title: "", excerpt: "", category: "STARTUPS" });
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>Post a New Blog</h2>
      <input
        type="text"
        name="author"
        placeholder="Author Name"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Blog Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="excerpt"
        placeholder="Short Description"
        value={formData.excerpt}
        onChange={handleChange}
        rows={4}
        required
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="STARTUPS">Startups</option>
        <option value="ENVIRONMENT">Environment</option>
        <option value="TECH">Tech</option>
        <option value="FINANCE">Finance</option>
      </select>
      <button type="submit">Publish</button>
    </form>
  );
}

export default NewBlogForm;
