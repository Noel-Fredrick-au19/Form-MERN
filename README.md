# MERN Stack CRUD Application with Drag-and-Drop Functionality

This project is a MERN stack application that implements CRUD (Create, Read, Update, Delete) operations with drag-and-drop functionality. It includes user authentication and authorization using JWT tokens.

### Deployed Link (Vercel)
`https://form-mern-frontend.vercel.app/login`
`https://form-mern-frontend.vercel.app/signup`

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

## Features
- User authentication and authorization using JWT tokens.
- CRUD operations for items.
- Drag-and-drop functionality for reordering items.
- Responsive UI using Material-UI and Tailwind CSS.
- Pagination for items.
- Search functionality for items.
- Toast notifications for user feedback.
- Loading spinners for asynchronous operations.

## Technologies Used
### Frontend
- React
- TypeScript
- Zustand (state management)
- Material-UI (component library)
- Tailwind CSS (utility-first CSS framework)
- React Beautiful DnD (drag-and-drop)
- React Toastify (toast notifications)
- React Spinners (loading spinners)
- Axios (HTTP client)
- JWT Decode (JWT parsing)
- React Router Dom (routing)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (jsonwebtoken)
- Bcrypt.js (password hashing)
- Dotenv (environment variables)
- Cors (Cross-Origin Resource Sharing)

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB instance running (local or cloud).

### Clone the Repository
```sh
git clone https://github.com/Noel-Fredrick-au19/Form-MERN.git
cd Form-MERN
```

### Backend Setup
1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the `backend` directory with the following content:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```
4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the `frontend` directory with the following content:
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```
4. Start the frontend development server:
    ```sh
    npm start
    ```

## Usage
### Sign Up
1. Navigate to `http://localhost:3000/signup`.
2. Create a new account.

### Log In
1. Navigate to `http://localhost:3000/login`.
2. Log in with your account.

### Dashboard
1. After logging in, you'll be redirected to the dashboard.
2. You can add, edit, delete, search, and reorder items.

## API Endpoints
### Auth
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.
- **GET** `/api/auth/profile`: Get the profile of the logged-in user.

### Items
- **GET** `/api/items`: Retrieve all items.
- **POST** `/api/items`: Add a new item.
- **PUT** `/api/items/:id`: Update an existing item.
- **DELETE** `/api/items/:id`: Delete an item.
- **POST** `/api/items/order`: Update the order of items.

## Project Structure
```
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── itemController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── user.js
│   │   └── item.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── itemRoutes.js
│   ├── .env
│   └── server.js
└── frontend
    ├── src
    │   ├── components
    │   │   ├── AddItemSidebar.tsx
    │   │   ├── AppContent.tsx
    │   │   ├── Item.tsx
    │   │   ├── ProtectedRoute.tsx
    │   ├── context
    │   │   └── AuthContext.tsx
    │   ├── pages
    │   │   ├── Dashboard.tsx
    │   │   ├── Login.tsx
    │   │   └── Signup.tsx
    │   ├── store.ts
    │   ├── App.tsx
    │   ├── index.tsx
    │   ├── .env
    │   └── ...
```

## Environment Variables
### Backend
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT.
- `PORT`: Port number for the backend server.

### Frontend
- `REACT_APP_API_URL`: URL for the backend API.

---

This README provides a comprehensive overview of your project, detailing the installation steps, technologies used, and key features. Adjust any paths or project-specific details as needed.
