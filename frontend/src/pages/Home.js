import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaSearch, FaTicketAlt, FaUsers, FaMusic } from 'react-icons/fa';
import concertBackground from '../images/concert-background.jpg';

const Home = () => {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${concertBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '140px 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={heroStyle}>
        <div className="hero-content">
          <h1>Experience Unforgettable Live Events</h1>
          <p>From electrifying concerts to immersive performances, find your next thrilling experience with EventHub.</p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary">Explore Events</Link>
            <Link to="/create-event" className="btn btn-secondary">Host an Event</Link>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <h2>Find Your Next Event</h2>
          <div className="search-form">
            <div className="search-input">
              <FaSearch />
              <input type="text" placeholder="Search events..." />
            </div>
            <select>
              <option value="">All Categories</option>
              <option value="music">Music</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="art">Art & Culture</option>
            </select>
            <button className="btn">Search</button>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="events-grid">
          {/* These would be dynamic in a real app */}
          <div className="event-card">
            <div className="event-image" style={{backgroundImage: "url('https://example.com/images/tech-conf.jpg')"}}>
              <span className="event-category">Technology</span>
            </div>
            <div className="event-details">
              <h3>Tech Conference 2023</h3>
              <p className="event-date">Dec 15, 2023 • 9:00 AM</p>
              <p className="event-location">New York Convention Center</p>
              <p className="event-price">$99.99</p>
              <Link to="/events/1" className="btn btn-sm">View Details</Link>
            </div>
          </div>
          
          <div className="event-card">
            <div className="event-image" style={{backgroundImage: "url('https://example.com/images/music-fest.jpg')"}}>
              <span className="event-category">Music</span>
            </div>
            <div className="event-details">
              <h3>Summer Music Festival</h3>
              <p className="event-date">Jul 20, 2023 • 1:00 PM</p>
              <p className="event-location">Central Park</p>
              <p className="event-price">$149.99</p>
              <Link to="/events/2" className="btn btn-sm">View Details</Link>
            </div>
          </div>
          
          <div className="event-card">
            <div className="event-image" style={{backgroundImage: "url('https://example.com/images/startup-mixer.jpg')"}}>
              <span className="event-category">Business</span>
            </div>
            <div className="event-details">
              <h3>Startup Networking Mixer</h3>
              <p className="event-date">Jun 5, 2023 • 6:00 PM</p>
              <p className="event-location">Downtown Business Hub</p>
              <p className="event-price">$25.00</p>
              <Link to="/events/3" className="btn btn-sm">View Details</Link>
            </div>
          </div>
        </div>
        <div className="view-all">
          <Link to="/events" className="btn btn-outline">View All Events</Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features">
        <h2>Why Choose EventHub?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <h3>Discover Events</h3>
            <p>Find events based on your interests, location, and availability.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <FaTicketAlt />
            </div>
            <h3>Easy Ticketing</h3>
            <p>Secure and hassle-free ticket purchasing for all events.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <FaCalendar />
            </div>
            <h3>Host Events</h3>
            <p>Create and manage your own events with our powerful tools.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Connect</h3>
            <p>Meet like-minded people and expand your network.</p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Experience Amazing Events?</h2>
          <p>Join thousands of people who use EventHub to discover and attend events.</p>
          <Link to="/register" className="btn btn-primary">Sign Up Now - It's Free!</Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 