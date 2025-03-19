import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaMapMarkerAlt, FaTag, FaImage, FaDollarSign, FaInfoCircle } from 'react-icons/fa';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    eventDate: '',
    eventTime: '',
    price: '',
    category: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, description, location, eventDate, eventTime, price, category, imageUrl } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real app, this would be an API call to create the event
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, just log the event data
      console.log('Event created:', {
        ...formData,
        price: parseFloat(price),
        eventDateTime: `${eventDate}T${eventTime}`
      });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <h1>Create a New Event</h1>
        <p className="page-subtitle">Fill in the details below to create your event</p>

        {error && <div className="form-error">{error}</div>}

        <form className="create-event-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Event Details</h2>

            <div className="form-group">
              <label htmlFor="name">Event Name*</label>
              <div className="input-with-icon">
                <FaInfoCircle />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter event name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Describe your event"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <div className="input-with-icon">
                <FaTag />
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Music">Music</option>
                  <option value="Business">Business</option>
                  <option value="Sports">Sports</option>
                  <option value="Art">Art & Culture</option>
                  <option value="Food">Food & Drink</option>
                  <option value="Health">Health & Wellness</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Date & Location</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="eventDate">Date*</label>
                <div className="input-with-icon">
                  <FaCalendar />
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={eventDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="eventTime">Time*</label>
                <div className="input-with-icon">
                  <FaCalendar />
                  <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    value={eventTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location*</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleChange}
                  placeholder="Enter venue name and address"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Information</h2>

            <div className="form-group">
              <label htmlFor="price">Ticket Price ($)*</label>
              <div className="input-with-icon">
                <FaDollarSign />
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
              <small>Set to 0 for free events</small>
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Event Image URL</label>
              <div className="input-with-icon">
                <FaImage />
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <small>Provide a URL for your event image (recommended size: 1200x630px)</small>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent; 