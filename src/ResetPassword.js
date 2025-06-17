import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5002';
console.log("Backend URL:", BACKEND_URL);

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage('Both fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage('✅ Password reset successful! You can now log in from the home page.');
        // 🔁 Don't redirect to /login to avoid ngrok mismatch
      } else {
        setSuccess(false);
        setMessage(data.message || 'Reset failed. Token may be invalid or expired.');
      }
    } catch (err) {
      console.error('Reset error:', err);
      setSuccess(false);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-icon"
              title="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-icon"
              title="Toggle password visibility"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Reset Password</button>
        </form>

        {message && (
          <p className={success ? 'success' : 'error'}>{message}</p>
        )}

        {success && (
          <button
            onClick={() => window.location.href = '/'}
            style={{ marginTop: '10px', padding: '8px 16px', background: 'teal', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Go to Homepage
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
