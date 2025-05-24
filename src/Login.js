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

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Login Response Data:", data);

        localStorage.setItem('token', data.token);

        // ✅ Store correct user data
        if (data.user) {
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('username', data.user.username);
          setUser({ name: data.user.username, token: data.token });
        } else {
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('username', data.username);
          setUser({ name: data.username, token: data.token });
        }
        // ✅ Save token and user info
if (data.user && data.user.email) {
  localStorage.setItem('userEmail', data.user.email); // ✅ Corrected!
} else if (data.email) {
  localStorage.setItem('userEmail', data.email);
} else {
  console.warn("Email not found in response");
}


        setIsSuccess(true);
        setMessage('Logged in successfully! Please select your role: Contributor or Fundraiser');

        if (data.campaigns) {
          localStorage.setItem('contributedCampaigns', JSON.stringify(data.campaigns.contributed));
          localStorage.setItem('fundedCampaigns', JSON.stringify(data.campaigns.funded));
        }
      } else {
        const errorData = await response.json();
        setIsSuccess(false);
        setMessage(errorData.message || 'Login failed. Please check your credentials.');
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
      navigate('/capitalRaise');
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

          {message && <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>}

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
