# Event Management Platform

A full-stack web application for creating, managing, and attending events. Built with React, Node.js, Express, and PostgreSQL.

## Features

- Browse and search for events
- Create and manage events
- Purchase tickets
- User authentication and profile management
- Interactive maps for event locations

## Project Structure

The project is divided into two main parts:

- **Frontend**: React application with modern UI components
- **Backend**: Node.js API with Express and PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a PostgreSQL database and import the schema:
   ```
   psql -U postgres -c "CREATE DATABASE eventmanagement"
   psql -U postgres -d eventmanagement -f database.sql
   ```

4. Configure environment variables by copying the example file:
   ```
   cp .env.example .env
   ```
   Then edit `.env` with your database credentials.

5. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `POST /api/tickets` - Purchase tickets

## Technologies Used

- **Frontend**: React, React Router, Material-UI, Leaflet Maps
- **Backend**: Node.js, Express, PostgreSQL, JWT Authentication
- **Deployment**: Docker, Nginx (optional)

## Screenshots

(Screenshots will be added here)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 