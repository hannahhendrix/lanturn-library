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
- Add new books to the system via a dedicated form
- Delete books from the system with authenticated confiration

---

## Usage
**Home Page**
- Greets users with a warm welcome.
- Shows login/register links for guests or a personalized greeting for logged-in users.

**Catalog Page**
- Displays books in a responsive grid layout styled like the pages of an open book.
- Background image and ambient visuals set a cozy library tone.
- Click on any book to open a detailed modal with:
  - Cover image, title, author, genre, year, price, stock status, and description
  - Add to Favorites or Remove from Favorites based on status
  - Delete Book (if authenticated), with a confirmation prompt
- Includes Prev/Next buttons for pagination (4 books per page).
- Add Book button navigates to the add book form.

**Search Page**
- Accessible via /search or the navigation bar.
- Allows users to search by title or author using a keyword input field.
- Displays matching results in the same grid layout as the catalog.
- Each result is clickable and opens the same modal with full book details and controls.
- Add Book button is centered below search results.

**Favorites Page**
- Accessible via /favorites for logged-in users.
- Displays only the books added to your favorites list.
- Clicking a favorite opens the modal with full details and a Remove from Favorites button.
- Favorites are synced with the backend and updated in real time.

**Add Book Page**
- Accessible via /add or the Add Book buttons on other pages.
- Lets users submit new books by filling in:
  - Title, author, genre, year, price, stock status, description, and cover image
- Requires authentication (JWT).
- On successful submission, redirects or refreshes the catalog.
  

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Context API for Auth
- LocalStorage for JWT token storage

**Backend**
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

**Create a .env file with:**
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

**Then start the server:**
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
lanturn-library/ </br>
├── bookstore-api/ </br>
│   ├── models/ </br>
│   ├── routes/ </br>
│   ├── middleware/ </br>
│   ├── uploads/ </br>
│   └── server.js </br>
├── bookstore-frontend/ </br>
│   ├── public/ </br>
│   ├── src/ </br>
│   │   ├── pages/ </br>
│   │   ├── components/ </br>
│   │   ├── context/ </br>
│   │   └── App.jsx </br>
│   └── vite.config.js </br>

---

## Future Improvements
- Front-end Register access
- Search by ISBN
- Add payment processor for business side sales

---

## Author
Hannah Hendrix </br>
Developer, Designer, and Book Enthusiast </br>
github.com/hannahhendrix </br>
