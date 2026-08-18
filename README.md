# MERN Blog

A full-stack blog application using React + Vite, Node.js, Express, MongoDB/Mongoose and JWT authentication.

## Features

- Home page
- Blog listing and search/filter
- Blog details and comments
- Signup/login
- JWT protected dashboard
- Create/edit/delete blogs
- Draft/published status
- Profile update
- Responsive UI

## Run

### Backend

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux use:

```bash
cp .env.example .env
```

Set `MONGO_URI` and `JWT_SECRET` in `.env`.

### Frontend

Open a second terminal:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux:

```bash
cp .env.example .env
```

Frontend: http://localhost:5173
Backend: http://localhost:8000

## MongoDB

For local MongoDB use:

MONGO_URI=mongodb://127.0.0.1:27017/mern_blog

For MongoDB Atlas, replace it with your Atlas connection string.
