# The Akashic Herbalist — Backend

Backend API for The Akashic Herbalist, a MERN application for exploring herbs, saving herbs, keeping a personal herbal journal, and interacting with a community of herbal enthusiasts.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript
- REST API

## Current Setup

The backend currently includes:

- Express server
- CORS configuration
- JSON request parsing
- Environment variables
- MongoDB connection
- Nodemon development server

## Development Server

The API runs locally on:

http://localhost:8888

Start the development server with:

```bash
npm run dev
```

## Planned Features

- Herb data and exploration
- Herb search and filtering
- User authentication
- Favorites
- Custom herb collections
- Personal journal entries
- Public/private journal entries
- User profiles
- Community comments and reviews
- Likes/hearts
- Following

## Project Structure
```bash
config/         Database configuration
controllers/    Request/response logic
middleware/     Reusable Express middleware
models/         Mongoose models
routes/         API routes
services/       External API and business logic
scripts/        Database and seed scripts
utils/          Helper functions

app.js          Express application
server.js       Server entry point
```

## Environment Variables

The application uses a .env file for private configuration.

Required variables currently include:

`MONGODB_URI`

The `.env` file must not be committed to GitHub