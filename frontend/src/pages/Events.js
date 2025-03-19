import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaCalendar, FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [usingNearbyFilter, setUsingNearbyFilter] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call to fetch events
    // For now, we'll use mock data
    const mockEvents = [
      {
        id: 1,
        name: 'Tech Conference 2023',
        description: 'Annual tech conference featuring the latest innovations',
        location: 'New York Convention Center',
        eventDate: '2023-12-15T09:00:00',
        price: 99.99,
        category: 'Technology',
        organizerId: 1,
        imageUrl: 'https://example.com/images/tech-conf.jpg',
        coordinates: [40.758896, -73.985130] // NYC
      },
      {
        id: 2,
        name: 'Summer Music Festival',
        description: 'Three days of amazing music with top artists',
        location: 'Central Park',
        eventDate: '2023-07-20T13:00:00',
        price: 149.99,
        category: 'Music',
        organizerId: 2,
        imageUrl: 'https://example.com/images/music-fest.jpg',
        coordinates: [40.781364, -73.966571] // Central Park
      },
      {
        id: 3,
        name: 'Startup Networking Mixer',
        description: 'Connect with entrepreneurs and investors',
        location: 'Downtown Business Hub',
        eventDate: '2023-06-05T18:00:00',
        price: 25.00,
        category: 'Business',
        organizerId: 1,
        imageUrl: 'https://example.com/images/startup-mixer.jpg',
        coordinates: [40.712742, -74.013382] // Downtown
      }
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  // Function to get user's current location
  const getUserLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoordinates);
          setUsingNearbyFilter(true);
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to access your location. Please check your browser permissions.");
          setLocationLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
    }
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  // Clear nearby filter
  const clearNearbyFilter = () => {
    setUsingNearbyFilter(false);
  };

  // Filter events based on search term, category, and location
  const filteredEvents = events.filter(event => {
    const nameMatch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = category === '' || event.category === category;
    
    // Apply location filter if user location is available and nearby filter is active
    if (usingNearbyFilter && userLocation && event.coordinates) {
      const distance = calculateDistance(
        userLocation.lat, userLocation.lng, 
        event.coordinates[0], event.coordinates[1]
      );
      // Return events within 50km
      return nameMatch && categoryMatch && distance <= 50;
    }
    
    return nameMatch && categoryMatch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>All Events</h1>
        <p>Discover and book events that match your interests</p>
      </div>
      
      <div className="filters">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <FaFilter />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Art">Art & Culture</option>
          </select>
        </div>
        
        <button 
          className={`btn ${usingNearbyFilter ? 'btn-primary' : ''}`} 
          onClick={usingNearbyFilter ? clearNearbyFilter : getUserLocation}
          disabled={locationLoading}
        >
          <FaLocationArrow /> 
          {locationLoading 
            ? 'Getting location...' 
            : usingNearbyFilter 
              ? 'Clear Nearby Filter' 
              : 'Events Near Me'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="events-list">
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>No events found matching your criteria.</p>
            {usingNearbyFilter && (
              <button className="btn" onClick={clearNearbyFilter}>
                Clear Nearby Filter
              </button>
            )}
          </div>
        ) : (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image" style={{backgroundImage: `url(${event.imageUrl})`}}>
                <span className="event-category">{event.category}</span>
              </div>
              <div className="event-details">
                <h3>{event.name}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-meta">
                  <p><FaCalendar /> {formatDate(event.eventDate)}</p>
                  <p><FaMapMarkerAlt /> {event.location}</p>
                </div>
                <p className="event-price">${event.price.toFixed(2)}</p>
                <Link to={`/events/${event.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events; 