import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:5002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json(); // Parse only once

      if (response.ok) {
        console.log("✅ Login Response Data:", data);

        localStorage.setItem('token', data.token);

        if (data.user) {
          if (!data.user._id && data.user.id) {
            data.user._id = data.user.id;
          }

          localStorage.setItem('user', JSON.stringify(data.user));
          setUser({ name: data.user.username || data.user.name, token: data.token });
        } else {
          setIsSuccess(false);
          setMessage('Login failed: No user data returned. Please check your credentials or try again later.');
          return;
        }

        if (data.campaigns) {
          localStorage.setItem('contributedCampaigns', JSON.stringify(data.campaigns.contributed || []));
          localStorage.setItem('fundedCampaigns', JSON.stringify(data.campaigns.funded || []));
        }

        setIsSuccess(true);
        setMessage('Logged in successfully! Please select your role: Contributor or Fundraiser');
      } else {
        console.error("❌ Login failed response:", data);
        setIsSuccess(false);
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = (role) => {
    setUserRole(role);
    localStorage.setItem('role', role);
    if (role === 'contributor') {
      navigate('/explore');
    } else if (role === 'fundraiser') {
      navigate('/campaignDetails/:id');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="social-section">
          <h1 className="social-title">Continue with</h1>
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
          <h1 className="title">Hi! Welcome back!</h1>
          <p className="subtitle">
            New to CrowdFunding?{' '}
            <span className="link" onClick={() => navigate('/signup')}>
              Sign up
            </span>
          </p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
            <p className="forgot-link">Forgot password?</p>
          </form>

          {message && (
            <p className={`message ${isSuccess ? 'success' : 'error'}`}>
              {message}
            </p>
          )}

          {isSuccess && !userRole && (
            <div className="role-selection">
              <p>Select your role:</p>
              <button onClick={() => handleRoleSelection('contributor')}>Contributor</button>
              <button onClick={() => handleRoleSelection('fundraiser')}>Fundraiser</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
