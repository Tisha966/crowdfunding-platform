import React from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account created successfully!');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="social-section">
          <h2 className="social-title">Continue with</h2>
          <button className="social-btn google-btn">
            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" /> Google
          </button>
          <button className="social-btn facebook-btn">
            <img src="https://img.icons8.com/color/24/facebook-new.png" alt="Facebook" /> Facebook
          </button>
          <button className="social-btn apple-btn">
            <img src="https://img.icons8.com/ios-filled/24/mac-os.png" alt="Apple" /> Apple
          </button>
        </div>

        <div className="divider"></div>

        <div className="form-section">
        <h1 className="title">
    Join Us and Invest in the Future
  </h1>
  <p className="subtitle">
    Sign up now and be part of a community that believes in success, security, 
    and boundless growth.
  </p>
          <form onSubmit={handleSubmit} className="signup-form">
            <input type="email" placeholder="Email" className="input-field" required />
            <input type="text" placeholder="Full Name" className="input-field" required />
            <input type="password" placeholder="Password" className="input-field" required />
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>
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
