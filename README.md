# The Akashic Herbalist — Backend

A RESTful backend API for **The Akashic Herbalist**, a MERN application for exploring traditional herbal knowledge, saving favorite herbs, organizing herbs into collections, and maintaining a personal herbal journal.

## Description

The Akashic Herbalist backend provides the API and database infrastructure for the application. It manages herb data, user accounts, authentication, favorites, custom collections, and personal journal entries.

The API is built with Express and MongoDB and uses Mongoose for database modeling. JWT authentication protects user-specific resources, while external plant data sources are used to supplement the application's curated herbal knowledge library.

## Deployment

* **Live API:** https://theakashicherbalist-backend.onrender.com
* **Frontend Application:** https://theakashicherbalist-frontend.onrender.com


## Getting Started

### Dependencies

* Windows 10 or later
* Node.js
* npm
* MongoDB / MongoDB Atlas
* Express
* Mongoose
* JWT
* bcrypt
* Trefle API access

### Installing

Clone the backend repository and navigate into the project directory:

```bash 
git clone <your-backend-repository-url>
cd TheAkashicHerbalist_BACKEND
```

Install the required dependencies:

```
npm install
```

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TREFLE_TOKEN=your_trefle_api_token
```

The `.env` file contains private configuration and should not be committed to GitHub.

### Executing program

Start the development server:

```bash
npm run dev
```

The backend runs locally at:

```
http://localhost:8888
```

The API base URL is:

```
http://localhost:8888/api
```

## Features

* RESTful herb API
* Herb search and alphabetical sorting
* Filtering by:

  * Traditional usage
  * Continent
  * Country
* Individual herb details
* Traditional-use and plant-part data
* Geographic herb information
* Herb imagery
* User registration and login
* JWT authentication
* User profile management
* Favorite herbs
* Custom herb collections
* Personal journal entries
* Public/private journal entries
* Complete Journal CRUD functionality
* Protected user resources
* External botanical data integration

## API Routes

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Authenticate a user |
| GET    | `/api/auth/me`       | Get current user    |
| PUT    | `/api/auth/me`       | Update user profile |

### Herbs

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/herbs`     | Get herbs           |
| GET    | `/api/herbs/:id` | Get a specific herb |

Herbs support query parameters for searching and filtering:

```
/api/herbs?search=turmeric
/api/herbs?sort=name
/api/herbs?usage=Respiratory
/api/herbs?continent=Africa
/api/herbs?country=India
```

### Favorites

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/api/favorites`         | Get user's favorites |
| POST   | `/api/favorites/:herbId` | Add a favorite       |
| DELETE | `/api/favorites/:herbId` | Remove a favorite    |

### Collections

| Method | Endpoint                             | Description            |
| ------ | ------------------------------------ | ---------------------- |
| GET    | `/api/collections`                   | Get user's collections |
| POST   | `/api/collections`                   | Create a collection    |
| POST   | `/api/collections/:id/herbs/:herbId` | Add herb               |
| DELETE | `/api/collections/:id/herbId`        | Remove herb            |
| DELETE | `/api/collections/:id`               | Delete collection      |

### Journal

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/journal`          | Get journal entries    |
| GET    | `/api/journal/:entryId` | Get a journal entry    |
| POST   | `/api/journal`          | Create a journal entry |
| PUT    | `/api/journal/:entryId` | Update a journal entry |
| DELETE | `/api/journal/:entryId` | Delete a journal entry |

## CRUD Functionality

The **Journal** feature demonstrates complete CRUD functionality.

* **Create** — Add a new journal entry
* **Read** — View journal entries
* **Update** — Edit an existing entry
* **Delete** — Remove an entry

Journal routes are protected with JWT authentication and entries are associated with the authenticated user.

## Project Structure

```
config/         Database configuration
controllers/    Request and response logic
middleware/     Authentication middleware
models/         Mongoose database models
routes/         RESTful API routes
services/       External API services
scripts/        Herb data and database scripts
utils/          Helper functions
app.js          Express application
server.js       Server entry point
```

## Data Sources

The herb library combines curated herbal information with external botanical data.

* **IMPPAT** — Traditional therapeutic-use information
* **Trefle** — Botanical information, geographic data, and plant imagery
* **Curated application data** — Additional herb information and fallback imagery when needed

## Help

If the backend is not starting or the frontend cannot retrieve data:

1. Make sure dependencies are installed.
2. Make sure the `.env` file contains the required variables.
3. Make sure MongoDB is accessible.
4. Make sure the backend is running on port `8888`.
5. Check the terminal for server or database errors.

To restart the development server:

```bash
npm run dev
```

## Authors

**Onayah Thompson**

Per Scholas Software Engineering Capstone Project

## Version History

* **0.2**

  * Added user authentication and profiles
  * Added herb search and filtering
  * Added favorites
  * Added custom herb collections
  * Added complete journal CRUD functionality
  * Expanded the curated herb database
  * Added external botanical data integration

* **0.1**

  * Initial Express backend setup
  * Added MongoDB connection
  * Added initial herb API structure

## License

This project was created for educational purposes as part of the Per Scholas software engineering capstone program.

## Acknowledgments

* **Per Scholas** — Software engineering curriculum and capstone guidance
* **IMPPAT** — Traditional therapeutic-use plant data
* **Trefle** — Botanical data and plant imagery
* **MongoDB** — Database platform
* **Express** — Backend framework
* **Mongoose** — MongoDB object modeling
* **JWT** — Authentication
* **bcrypt** — Password hashing
