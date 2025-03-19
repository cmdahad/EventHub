import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaSignInAlt, FaUserPlus, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaCalendarAlt /> EventHub
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link">Events</Link>
          </li>
          
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <FaUser /> {user?.name || 'My Dashboard'}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-event" className="nav-link">Create Event</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  <FaUserPlus /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 