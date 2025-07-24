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
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const loginData = { email, password };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login Response Data:", data);

        localStorage.setItem('token', data.token);

        if (data.user) {
          if (!data.user._id && data.user.id) {
            data.user._id = data.user.id;
          }
          localStorage.setItem('userId', data.user._id);
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser({ name: data.user.username || data.user.name, token: data.token, role: '' });
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
        setMessage('Logged in successfully! Redirecting to role selection...');

        setTimeout(() => {
          navigate('/role-selection');
        }, 2000);
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

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="social-section">
<h1 className="social-title" style={{fontSize:"250%"}}>Access Your Account</h1>

  <p style={{ fontSize: '14px', color: '#555', marginTop: '8px' }}>
    Use your registered email and password to log in to your CrowdFunding account.
  </p>
  <p style={{ fontSize: '14px', color: '#555' }}>
    Make sure your credentials are correct to access your dashboard and campaigns.
  </p>
</div>

        <div className="divider"></div>

        <div className="form-section">
          <h1 className="title" style={{ color: 'teal' }}>Hi! Welcome back!</h1>
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
            <p className="forgot-link" onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer', color: 'teal' }}>
  Forgot password?
</p>

          </form>

          {message && (
            <p className={`message ${isSuccess ? 'success' : 'error'}`}> 
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
