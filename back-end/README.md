# ☕ Coffee Store System - Backend API

A RESTful API backend for Coffee Store Management System, built with Node.js, Express.js, and MongoDB.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Scripts](#-scripts)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Docker](#-docker)

## 🛠 Tech Stack

| Technology     | Version | Description         |
| -------------- | ------- | ------------------- |
| **Node.js**    | >= 18.x | JavaScript Runtime  |
| **Express.js** | 5.x     | Web Framework       |
| **TypeScript** | 5.x     | Typed JavaScript    |
| **MongoDB**    | 8.0     | NoSQL Database      |
| **Mongoose**   | 9.x     | MongoDB ODM         |
| **JWT**        | -       | User Authentication |
| **Argon2**     | -       | Password Hashing    |
| **Winston**    | -       | Logging Library     |
| **Joi**        | -       | Schema Validation   |
| **ESLint**     | 9.x     | Code Linting        |
| **Prettier**   | 3.x     | Code Formatting     |

## 📌 Prerequisites

- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **MongoDB**: 8.0 (or use Docker)
- **Docker & Docker Compose** (optional): For running with containers

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/khanhhoang209/coffee-store-system.git
cd coffee-store-system/back-end
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `back-end` directory (refer to `.env.example`):

```env
# App
COMPOSE_PROJECT_NAME=coffee-store
PORT=8080
HOST_PORT=80
CONTAINER_PORT=8080
FRONTEND_URL=http://localhost:5173

# Mongo
MONGO_URI=mongodb://admin:secret123@localhost:27017/coffee_store?authSource=admin
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=secret123
MONGO_INITDB_DATABASE=coffee_store
MONGO_PORT=27017
MONGO_HOST=localhost

# Argon2
ARGON_TYPE=2
ARGON_TIME_COST=2
ARGON_MEMORY_COST=65536
ARGON_PARALLELISM=4
ARGON_HASH_LENGTH=32

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
JWT_ISSUER=coffee-store-api
JWT_AUDIENCE=coffee-store-client
JWT_ALGORITHM=HS256
```

## 🏃 Running the Application

### Development mode (with hot-reload)

```bash
npm run dev
```

Server will run at: `http://localhost:8080`

### Production mode

```bash
# Build
npm run build

# Start
npm run start
```

## 📜 Scripts

| Script           | Command                | Description                                     |
| ---------------- | ---------------------- | ----------------------------------------------- |
| **dev**          | `npm run dev`          | Run the app in development mode with hot-reload |
| **build**        | `npm run build`        | Build TypeScript to JavaScript                  |
| **start**        | `npm run start`        | Run the app from build folder (production)      |
| **lint**         | `npm run lint`         | Check code errors with ESLint                   |
| **lint:fix**     | `npm run lint:fix`     | Auto-fix ESLint errors                          |
| **prettier**     | `npm run prettier`     | Check code formatting with Prettier             |
| **prettier:fix** | `npm run prettier:fix` | Auto-format code with Prettier                  |

### Usage Examples

```bash
# Check code for errors
npm run lint

# Auto-fix ESLint errors
npm run lint:fix

# Check code formatting
npm run prettier

# Auto-format code
npm run prettier:fix

# Build the project
npm run build
```

## 📁 Project Structure

```
back-end/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── common/                # Common types
│   │   ├── pagination-request.type.ts
│   │   └── service-response.type.ts
│   ├── configs/               # Configurations
│   │   ├── argon/             # Argon2 config
│   │   ├── database/          # MongoDB connection
│   │   ├── jwt/               # JWT config
│   │   └── logs/              # Winston logger config
│   ├── constants/             # Constants
│   ├── controllers/           # Route controllers
│   ├── middlewares/           # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error-handler.middleware.ts
│   │   └── validate.middleware.ts
│   ├── models/                # Mongoose models
│   │   ├── category.model.ts
│   │   ├── order.model.ts
│   │   ├── order-detail.model.ts
│   │   ├── product.model.ts
│   │   ├── role.model.ts
│   │   └── user.model.ts
│   ├── routes/                # API routes
│   │   ├── index.ts
│   │   ├── auth.route.ts
│   │   ├── category.route.ts
│   │   └── product.route.ts
│   ├── schemas/               # Joi validation schemas
│   ├── services/              # Business logic
│   ├── types/                 # TypeScript types/DTOs
│   └── utils/                 # Utility functions
├── migrations/                # Database migrations
├── logs/                      # Application logs
├── docker-compose.yml         # Docker compose config
├── Dockerfile                 # Docker image config
├── package.json
├── tsconfig.json
└── eslint.config.mjs
```

## 🔌 API Endpoints

### Health Check

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| GET    | `/api`   | Check if API is running |

### Authentication (`/api/auth`)

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register new account |
| POST   | `/api/auth/login`    | User login           |

### Categories (`/api/categories`)

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/categories`     | Get all categories  |
| GET    | `/api/categories/:id` | Get category by ID  |
| POST   | `/api/categories`     | Create new category |
| PUT    | `/api/categories/:id` | Update category     |
| DELETE | `/api/categories/:id` | Delete category     |

### Products (`/api/products`)

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/products`     | Get all products   |
| GET    | `/api/products/:id` | Get product by ID  |
| POST   | `/api/products`     | Create new product |
| PUT    | `/api/products/:id` | Update product     |
| DELETE | `/api/products/:id` | Delete product     |

## 🐳 Docker

### Running with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Services

| Service   | Container Name | Port  | Description      |
| --------- | -------------- | ----- | ---------------- |
| **mongo** | coffee-mongo   | 27017 | MongoDB database |
| **api**   | coffee-api     | 80    | Backend API      |

### Database Migrations

Migrations will run automatically when the API container starts. To run manually:

```bash
# Run migrations
npx migrate-mongo up

# Rollback migration
npx migrate-mongo down
```

## 📝 Logging

The application uses **Winston** for logging with the following features:

- Colorized console output
- Automatic daily log file rotation
- Logs stored in the `logs/` directory

## 🔐 Authentication

The API uses **JWT (JSON Web Token)** for authentication:

1. Login to receive an access token
2. Send the token in the header: `Authorization: Bearer <token>`
3. Token expires based on `JWT_EXPIRES_IN` configuration

## 👥 Author

- **khanhhoang209** - [GitHub](https://github.com/khanhhoang209)
