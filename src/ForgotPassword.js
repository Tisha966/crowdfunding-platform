import React, { useState } from 'react';
import './ForgotPassword.css'; // ✅ Make sure this file exists

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5002/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setIsSuccess(res.ok);
      setMessage(data.message || 'Check your email for reset link');
    } catch (err) {
      setIsSuccess(false);
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && (
          <p className={isSuccess ? 'success' : 'error'}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
