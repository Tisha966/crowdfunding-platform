import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Logged in successfully!');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="social-section">
          <h1 className="social-title">Continue with</h1>
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
          <h1 className="title">Hi! Welcome back!</h1>
          <p className="subtitle">
            New to CrowdFunding?{' '}
            <span className="link" onClick={() => navigate('/signup')}>
              Sign up
            </span>
          </p>
          <form onSubmit={handleSubmit} className="login-form">
            <input type="email" placeholder="Email" className="input-field" required />
            <input type="password" placeholder="Password" className="input-field" required />
            <button type="submit" className="submit-btn">
              Log in
            </button>
            <p className="forgot-link">Forgot password?</p>
          </form>
        </div>
        
      </div> 
    </div>
  );
};

export default Login;
