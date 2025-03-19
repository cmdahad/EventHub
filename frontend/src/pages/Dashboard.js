import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaTicketAlt, FaUser, FaHeart, FaCog } from 'react-icons/fa';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [userTickets, setUserTickets] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch the user's data from an API
    // For now, we'll use mock data
    const fetchUserData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock tickets data
        const mockTickets = [
          {
            id: 1,
            eventId: 1,
            eventName: 'Tech Conference 2023',
            eventDate: '2023-12-15T09:00:00',
            location: 'New York Convention Center',
            quantity: 2,
            price: 99.99,
            purchaseDate: '2023-05-15T14:30:00',
            status: 'confirmed'
          },
          {
            id: 2,
            eventId: 3,
            eventName: 'Startup Networking Mixer',
            eventDate: '2023-06-05T18:00:00',
            location: 'Downtown Business Hub',
            quantity: 1,
            price: 25.00,
            purchaseDate: '2023-05-20T10:15:00',
            status: 'confirmed'
          }
        ];
        
        // Mock events user has created
        const mockEvents = [
          {
            id: 4,
            name: 'Web Development Workshop',
            description: 'Learn the basics of HTML, CSS, and JavaScript in this hands-on workshop.',
            location: 'Tech Incubator Space',
            eventDate: '2023-08-10T13:00:00',
            price: 35.00,
            category: 'Technology',
            imageUrl: 'https://example.com/images/webdev-workshop.jpg',
            attendees: 12,
            capacity: 20
          }
        ];
        
        setUserTickets(mockTickets);
        setUserEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTabContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    switch (activeTab) {
      case 'tickets':
        return (
          <div className="dashboard-tickets">
            <h2>My Tickets</h2>
            {userTickets.length === 0 ? (
              <div className="empty-state">
                <p>You don't have any tickets yet.</p>
                <Link to="/events" className="btn btn-primary">Browse Events</Link>
              </div>
            ) : (
              <div className="tickets-list">
                {userTickets.map(ticket => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-header">
                      <h3>{ticket.eventName}</h3>
                      <span className={`ticket-status ticket-status-${ticket.status}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <div className="ticket-details">
                      <p><FaCalendar /> {formatDate(ticket.eventDate)}</p>
                      <p><FaTicketAlt /> {ticket.quantity} {ticket.quantity > 1 ? 'tickets' : 'ticket'}</p>
                      <p className="ticket-price">Total: ${(ticket.price * ticket.quantity).toFixed(2)}</p>
                    </div>
                    <div className="ticket-actions">
                      <Link to={`/events/${ticket.eventId}`} className="btn btn-sm">View Event</Link>
                      <Link to={`/tickets/${ticket.id}`} className="btn btn-outline btn-sm">View Ticket</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'events':
        return (
          <div className="dashboard-events">
            <div className="dashboard-header">
              <h2>My Events</h2>
              <Link to="/create-event" className="btn btn-primary">Create New Event</Link>
            </div>
            
            {userEvents.length === 0 ? (
              <div className="empty-state">
                <p>You haven't created any events yet.</p>
                <Link to="/create-event" className="btn btn-primary">Create an Event</Link>
              </div>
            ) : (
              <div className="events-table">
                <table>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Attendees</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userEvents.map(event => (
                      <tr key={event.id}>
                        <td>
                          <div className="event-name-cell">
                            <div className="event-thumbnail" style={{backgroundImage: `url(${event.imageUrl})`}}></div>
                            <div>
                              <h4>{event.name}</h4>
                              <p>{event.location}</p>
                            </div>
                          </div>
                        </td>
                        <td>{formatDate(event.eventDate)}</td>
                        <td>{event.attendees}/{event.capacity}</td>
                        <td>
                          <div className="table-actions">
                            <Link to={`/events/${event.id}`} className="btn btn-sm">View</Link>
                            <Link to={`/events/${event.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      
      case 'profile':
        return (
          <div className="dashboard-profile">
            <h2>My Profile</h2>
            <div className="profile-info">
              <div className="profile-header">
                <div className="profile-avatar">
                  <FaUser />
                </div>
                <div>
                  <h3>John Doe</h3>
                  <p>john@example.com</p>
                  <p>Member since May 2023</p>
                </div>
              </div>
              
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value="John Doe" readOnly />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value="john@example.com" readOnly />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="Add phone number" />
                </div>
                
                <div className="form-actions">
                  <button className="btn btn-primary">Edit Profile</button>
                  <button className="btn btn-outline">Change Password</button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <FaUser />
            </div>
            <h3>John Doe</h3>
            <p>john@example.com</p>
          </div>
          
          <ul className="dashboard-menu">
            <li className={activeTab === 'tickets' ? 'active' : ''}>
              <button onClick={() => setActiveTab('tickets')}>
                <FaTicketAlt /> My Tickets
              </button>
            </li>
            <li className={activeTab === 'events' ? 'active' : ''}>
              <button onClick={() => setActiveTab('events')}>
                <FaCalendar /> My Events
              </button>
            </li>
            <li className={activeTab === 'saved' ? 'active' : ''}>
              <button onClick={() => setActiveTab('saved')}>
                <FaHeart /> Saved Events
              </button>
            </li>
            <li className={activeTab === 'profile' ? 'active' : ''}>
              <button onClick={() => setActiveTab('profile')}>
                <FaUser /> Profile
              </button>
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''}>
              <button onClick={() => setActiveTab('settings')}>
                <FaCog /> Settings
              </button>
            </li>
          </ul>
        </div>
        
        <div className="dashboard-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 