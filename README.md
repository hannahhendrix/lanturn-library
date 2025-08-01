# Lanturn Library

Lanturn Library is a cozy, book-themed full stack application for browsing, saving, and managing a personal library. Users can explore a paginated catalog of books, view detailed information, and save favorites with smooth visuals like page-turning effects and sound.

---

## Features

- User Authentication (JWT-based login/register)
- Paginated book catalog with smooth transition animations
- Clickable book cards that open detailed modals
- Add or remove books from your personal favorites list
- Search page for finding books by title or author
- Immersive UI with layers, old book backgrounds, and ambient design
- Page-turning sound effect synced with animations

---

## Tech Stack

** Frontend **
- React (Vite)
- Tailwind CSS
- React Context API for Auth
- LocalStorage for JWT token storage

** Backend **
- Node.js with Express
- MongoDB with mongoose
- JWT for secure user auth
- Multer for file uploads (cover images)

---

## Installation

### Prerequisites
- Node.js and npm
- MongoDB database (local or hosted)
- Git

### Backend Setup
```
cd bookstore-api
npm install
```

####Create a .env file with:
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

####Then start the server:
```npm run dev```

### Frontend Setup
```
cd bookstore-frontend
npm install
npm run dev
```

---

## API Endpoints

### Book Routes
- GET /api/books?page=1&limit=8 – Get paginated book list
- GET /api/books/:id – Get a single book by ID
- POST /api/books – Add a book

### Favorites Routes
- GET /api/favorites – Get current user’s favorites
- POST /api/favorites/:bookId – Add book to favorites
- DELETE /api/favorites/:bookId – Remove book from favorites

### User Auth Roles
- POST /api/users/login – Authenticate and return JWT
- POST /api/users/register – Create new account (front-end implementation in a future update)

---

## Authentication
- JWT stored in LocalStorage
- Protected routes checked with auth middleware
- Users can only access their own favorites

---

## Project Structure
lanturn-library/
├── bookstore-api/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
├── bookstore-frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│   └── vite.config.js

---

## Future Improvements
- Front-end Register access
- Search by ISBN
- Add payment processor for business side sales

---

## Author
Hannah Hendrix
Developer, Designer, and Book Enthusiast
github.com/hannahhendrix
