import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
const handleSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    name,
    email,
    password,
  };

  try {
    const response = await fetch('https://cf-backend-57jj.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Account created successfully!');
      console.log('User details:', data);

      // Add this: Save user ID to localStorage if present
      if (data.user && (data.user._id || data.user.id)) {
        const userId = data.user._id || data.user.id;
        localStorage.setItem('userId', userId);
      }

      navigate('/login');
    } else {
      setMessage(data.message || 'Error creating account');
    }
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
};

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="social-section">
          <h2 className="social-title">Continue with</h2>
          <button className="social-btn google-btn" style={{ color: 'gray' }}>
            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" /> Google
          </button>
          <button className="social-btn facebook-btn" style={{ color: 'gray' }}>
            <img src="https://img.icons8.com/color/24/facebook-new.png" alt="Facebook" /> Facebook
          </button>
          <button className="social-btn apple-btn" style={{ color: 'gray' }}>
            <img src="https://img.icons8.com/ios-filled/24/mac-os.png" alt="Apple" /> Apple
          </button>
        </div>

        <div className="divider"></div>

        <div className="form-section">
          <h1 className="title" style={{ color: 'teal' }}>Join Us and Invest in the Future</h1>
          <p className="subtitle">
            Sign up now and be part of a community that believes in success, security, and boundless growth.
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="input-field"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>
          {message && <p className="message">{message}</p>}
          <p className="login-link">
            Already have an account?{' '}
            <span className="link" onClick={() => navigate('/login')}>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
