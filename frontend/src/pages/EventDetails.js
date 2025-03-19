import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaMapMarkerAlt, FaTag, FaUser, FaTicketAlt } from 'react-icons/fa';
import MapComponent from '../components/MapComponent';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    // In a real app, this would be an API call to fetch event details
    // For now, we'll use mock data
    const mockEvents = [
      {
        id: 1,
        name: 'Tech Conference 2023',
        description: 'Annual tech conference featuring the latest innovations. Join industry experts and thought leaders for a day of inspiring talks, hands-on workshops, and networking opportunities. This conference covers emerging technologies like AI, blockchain, and more.',
        location: 'New York Convention Center',
        eventDate: '2023-12-15T09:00:00',
        price: 99.99,
        category: 'Technology',
        organizerId: 1,
        organizer: 'Tech Events Inc.',
        imageUrl: 'https://example.com/images/tech-conf.jpg',
        detailedLocation: '123 Convention Ave, New York, NY 10001',
        availableTickets: 250,
        coordinates: [40.758896, -73.985130] // Example coordinates for NYC
      },
      {
        id: 2,
        name: 'Summer Music Festival',
        description: 'Three days of amazing music with top artists from around the world. Experience live performances across multiple stages, food vendors, art installations, and camping options. This year features headliners from rock, pop, hip-hop, and electronic genres.',
        location: 'Central Park',
        eventDate: '2023-07-20T13:00:00',
        price: 149.99,
        category: 'Music',
        organizerId: 2,
        organizer: 'Festival Productions',
        imageUrl: 'https://example.com/images/music-fest.jpg',
        detailedLocation: 'Central Park Great Lawn, New York, NY',
        availableTickets: 5000,
        coordinates: [40.781364, -73.966571] // Example coordinates for Central Park
      },
      {
        id: 3,
        name: 'Startup Networking Mixer',
        description: 'Connect with entrepreneurs and investors in a relaxed setting. Perfect for founders looking to pitch their ideas, professionals wanting to join startups, and investors seeking new opportunities. Includes complimentary drinks and appetizers.',
        location: 'Downtown Business Hub',
        eventDate: '2023-06-05T18:00:00',
        price: 25.00,
        category: 'Business',
        organizerId: 1,
        organizer: 'Startup Network',
        imageUrl: 'https://example.com/images/startup-mixer.jpg',
        detailedLocation: '456 Business Blvd, Suite 200, Downtown',
        availableTickets: 75,
        coordinates: [40.712742, -74.013382] // Example coordinates for Downtown
      }
    ];
    
    // Simulate API delay
    setTimeout(() => {
      const foundEvent = mockEvents.find(e => e.id === parseInt(id));
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        setError('Event not found');
      }
      setLoading(false);
    }, 500);
  }, [id]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleTicketQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (event?.availableTickets || 1)) {
      setTicketQuantity(value);
    }
  };

  const handlePurchase = () => {
    // In a real app, this would send a request to purchase tickets
    alert(`You've purchased ${ticketQuantity} tickets for ${event.name}!`);
  };

  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }

  if (error || !event) {
    return <div className="error">Error: {error || 'Event not found'}</div>;
  }

  return (
    <div className="event-details-page">
      <div className="event-header" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${event.imageUrl})`}}>
        <div className="event-header-content">
          <span className="event-category">{event.category}</span>
          <h1>{event.name}</h1>
          <div className="event-meta">
            <p><FaCalendar /> {formatDate(event.eventDate)}</p>
            <p><FaMapMarkerAlt /> {event.location}</p>
            <p><FaUser /> Organized by: {event.organizer}</p>
          </div>
        </div>
      </div>
      
      <div className="event-content">
        <div className="event-info">
          <h2>About This Event</h2>
          <p className="event-description">{event.description}</p>
          
          <h2>Location</h2>
          <p className="event-location">{event.detailedLocation}</p>
          <div className="event-map">
            <MapComponent 
              location={event.detailedLocation} 
              name={event.name} 
              position={event.coordinates}
            />
          </div>
        </div>
        
        <div className="event-sidebar">
          <div className="ticket-purchase-card">
            <h3>Tickets</h3>
            <p className="event-price">${event.price.toFixed(2)}</p>
            <p><FaTicketAlt /> {event.availableTickets} tickets available</p>
            
            <div className="ticket-quantity">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={event.availableTickets}
                value={ticketQuantity}
                onChange={handleTicketQuantityChange}
              />
            </div>
            
            <div className="ticket-total">
              <p>Total: ${(event.price * ticketQuantity).toFixed(2)}</p>
            </div>
            
            <button className="btn btn-primary btn-block" onClick={handlePurchase}>
              Purchase Tickets
            </button>
          </div>
          
          <div className="event-share">
            <h3>Share This Event</h3>
            <div className="share-buttons">
              {/* These would be actual share buttons in a real app */}
              <button className="btn btn-sm">Facebook</button>
              <button className="btn btn-sm">Twitter</button>
              <button className="btn btn-sm">Email</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="back-link">
        <Link to="/events" className="btn btn-outline">← Back to Events</Link>
      </div>
    </div>
  );
};

export default EventDetails; 