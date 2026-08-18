# Zen Talk

A full-stack blog application built with **React + Vite, Node.js, Express.js, MongoDB/Mongoose, and JWT authentication**.

## Features

* 🏠 Home page
* 📝 Blog listing
* 🔍 Blog search and filtering
* 📖 Blog details
* 💬 Comments
* 🔐 Signup and login
* 🛡️ JWT-based authentication
* 📊 Protected user dashboard
* ➕ Create blogs
* ✏️ Edit blogs
* 🗑️ Delete blogs
* 📌 Draft and published blog status
* 👤 Profile update
* 📱 Responsive UI

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS / Responsive UI

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST API

### Database

* MongoDB
* Mongoose

## Project Structure

```text
zentalk/
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mern-blog.git
cd zentalk
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file from `.env.example`.

#### Windows

```bash
copy .env.example .env
```

#### macOS/Linux

```bash
cp .env.example .env
```

Add your environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```

Start the backend:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:8000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create the `.env` file:

#### Windows

```bash
copy .env.example .env
```

#### macOS/Linux

```bash
cp .env.example .env
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

## MongoDB Configuration

### Local MongoDB

```env
MONGO_URI=mongodb://127.0.0.1:27017/mern_blog
```

### MongoDB Atlas

For MongoDB Atlas, replace the value with your Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mern_blog
```

> Never commit your `.env` file or expose your MongoDB credentials and JWT secret publicly.

## Authentication

The application uses **JWT (JSON Web Token)** authentication to protect private routes and user-specific functionality.

Authenticated users can:

* Access their dashboard
* Create and manage blogs
* Edit and delete their own blogs
* Update their profile
* Manage published and draft content

## API

The backend provides RESTful APIs for:

* Authentication
* Users
* Blogs
* Comments
* Profile management

## Available Scripts

### Server

```bash
npm run dev
```

### Client

```bash
npm run dev
```

## Environment Variables

### Server `.env`

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Client `.env`

```env
VITE_API_URL=http://localhost:8000
```

## Future Improvements

* Image upload for blog posts
* Rich text editor
* Blog categories and tags
* Like/bookmark functionality
* Pagination
* Admin dashboard
* Social sharing
* Deployment with production environment

## Author

**Ranjan Kumar**

MERN Stack Developer

## License

This project is available for learning and development purposes.
