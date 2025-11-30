# ☕ Coffee Store System

A full-stack web application for Coffee Store Management, built with modern technologies.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Documentation](#-documentation)
- [Author](#-author)
- [License](#-license)

## 🎯 Overview

Coffee Store System is a comprehensive solution for managing coffee shop operations, including product management, order processing, user authentication, and more.

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration with JWT
- 📦 **Product Management** - CRUD operations for products
- 🏷️ **Category Management** - Organize products by categories
- 🛒 **Order Management** - Process and track customer orders
- 👥 **Role-based Access Control** - Admin and user roles
- 📝 **Logging** - Comprehensive application logging

## 🛠 Tech Stack

### Backend

| Technology     | Version | Description        |
| -------------- | ------- | ------------------ |
| **Node.js**    | >= 18.x | JavaScript Runtime |
| **Express.js** | 5.x     | Web Framework      |
| **TypeScript** | 5.x     | Typed JavaScript   |
| **MongoDB**    | 8.0     | NoSQL Database     |
| **Mongoose**   | 9.x     | MongoDB ODM        |
| **JWT**        | -       | Authentication     |

### Frontend

| Technology    | Version | Description |
| ------------- | ------- | ----------- |
| _Coming soon_ | -       | -           |

## 📁 Project Structure

```
coffee-store-system/
├── back-end/              # Backend API (Node.js, Express, MongoDB)
│   ├── src/
│   ├── migrations/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── README.md          # Backend documentation
│
└── front-end/             # Frontend (Coming soon)
    └── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** 8.0 (or use Docker)
- **Docker & Docker Compose** (optional)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/khanhhoang209/coffee-store-system.git
   cd coffee-store-system
   ```

2. **Setup Backend**

   ```bash
   cd back-end
   npm install
   cp .env.example .env
   # Configure your .env file
   npm run dev
   ```

3. **Setup Frontend** _(Coming soon)_
   ```bash
   cd front-end
   # Instructions will be added
   ```

## 📚 Documentation

| Component   | Documentation                              |
| ----------- | ------------------------------------------ |
| Backend API | [back-end/README.md](./back-end/README.md) |
| Frontend    | _Coming soon_                              |

## 👥 Author

- **khanhhoang209** - [GitHub](https://github.com/khanhhoang209)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
