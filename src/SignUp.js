// src/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './signup.css';

const SignUp = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulating an API call
    try {
      // Mocking a successful signup response
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
      alert('Sign Up successful! You can now log in.');
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      setError('Sign Up failed! Please try again.'); // Handle errors appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp} className="signup-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="login-button">
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
