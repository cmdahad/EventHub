import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real app, this would make an API call to authenticate
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, hardcoded credentials
      if (email === 'user@example.com' && password === 'password123') {
        // Create mock user data and token
        const userData = {
          id: 1,
          name: 'John Doe',
          email: 'user@example.com'
        };
        const token = 'mock-jwt-token';
        
        // Call the login function from context
        login(userData, token);
        
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Try user@example.com / password123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login to Your Account</h1>
        <p className="auth-subtitle">Welcome back! Please enter your credentials to access your account.</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <small>Use: user@example.com / password123</small>
          </div>
          
          <div className="form-group">
            <div className="remember-forgot">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 