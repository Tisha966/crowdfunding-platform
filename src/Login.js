// src/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Simulated login logic
    if (email === "test@example.com" && password === "password") {
      alert('Login successful!');
      navigate('/home'); // Redirect to the home page
    } else {
      alert('Login failed. Redirecting to sign-up page.');
      navigate('/signup'); // Redirect to sign-up page
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login to Your Account</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="separator">
        <span>OR</span>
      </div>
      <button className="google-login-button">
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google icon" />
        Continue with Google
      </button>
      <div className="signup-link">
        <p>Don't have an account? 
          <button onClick={() => navigate('/signup')} className="signup-button"> Sign Up</button>
        </p>
      </div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
