# ECommerce
![Run Tests](https://github.com/tylerrknightly/eCommerce/actions/workflows/test.yml/badge.svg)

A full-stack e-commerce demo site built with the MERN stack (MongoDB, Express, React, Node.js) showcasing functionality for product browsing, cart management, user authentication, and checkout.

Live Demo: [knightly-store.onrender.com](https://knightly-store.onrender.com)

---

## Tech Stack

- **Frontend:** React, Redux, TypeScript, Bootstrap
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT-based authentication with role support
- **Deployment:** Render (Frontend + Backend), MongoDB Atlas

---

## Features

- User registration and login (registration in progress)
- Product catalog and category filtering
- Shopping cart with quantity management
- Protected checkout routes
- Admin dashboard (in progress)
- Order persistence and history (history in progress)

---

## 🛠 Work in Progress

This project is under active development. Upcoming features include:
- Payment integration
- Order management
- Better error handling and form validation

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/TylerRKnightly/ECommerce.git
cd ECommerce

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

## In `/server/.env`:
MONGO_URI=your-mongo-uri
JWT_SECRET=your-jwt-secret

## In `/client/.env`:
REACT_APP_API_URL=http://localhost:5000

# Run the development server
npm run dev