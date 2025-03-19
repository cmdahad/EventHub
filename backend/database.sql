CREATE DATABASE eventmanagement;

-- Connect to the database
\c eventmanagement;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  event_date TIMESTAMP NOT NULL,
  price DECIMAL(10, 2) DEFAULT 0,
  category VARCHAR(100),
  organizer_id INTEGER REFERENCES users(id),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tickets table
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  payment_status VARCHAR(50) DEFAULT 'pending',
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indices for better performance
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_tickets_user ON tickets(user_id);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_reviews_event ON reviews(event_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_category ON events(category);

-- Sample data: Users
INSERT INTO users (name, email, password) VALUES 
('John Doe', 'john@example.com', '$2b$10$1JnrX8pUMM1gBg1KJJwLgO2o5TplxCYsHhA0QpCrE/Ky3qvS6J6DW'), -- password: password123
('Jane Smith', 'jane@example.com', '$2b$10$1JnrX8pUMM1gBg1KJJwLgO2o5TplxCYsHhA0QpCrE/Ky3qvS6J6DW'); 

-- Sample data: Events
INSERT INTO events (name, description, location, event_date, price, category, organizer_id, image_url) VALUES 
('Tech Conference 2023', 'Annual tech conference featuring the latest innovations', 'New York Convention Center', '2023-12-15 09:00:00', 99.99, 'Technology', 1, 'https://example.com/images/tech-conf.jpg'),
('Summer Music Festival', 'Three days of amazing music with top artists', 'Central Park', '2023-07-20 13:00:00', 149.99, 'Music', 2, 'https://example.com/images/music-fest.jpg'),
('Startup Networking Mixer', 'Connect with entrepreneurs and investors', 'Downtown Business Hub', '2023-06-05 18:00:00', 25.00, 'Business', 1, 'https://example.com/images/startup-mixer.jpg'); 