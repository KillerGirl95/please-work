# MERN Bookstore Application

This is a full-stack web application built using the MERN stack. It allows users to manage books in a bookstore, with features like JWT-based authentication and book management.

## Features

- **User Authentication**:
  - JWT (JSON Web Token) based authentication for secure user login and registration.
  - Protected routes for logged-in users.
  
- **Book Management**:
  - Logged-in users can add, view, and manage book details.
  - Book details include:
    - Title
    - Author
    - Price
    - Year Published

- **Responsive Design**:
  - The application is designed to be responsive and works seamlessly on both desktop and mobile devices.

- **Backend API**:
  - RESTful API built with Node.js and Express.js.
  - MongoDB for database storage.
  - CRUD operations for managing books.

- **Frontend**:
  - Built with React.js for a dynamic user interface.
  - State management using React hooks.

## Technologies Used

- **Frontend**:
  - React.js
  - Axios for API requests
  - React Router for navigation

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB 
  - JSON Web Tokens (JWT) for authentication

- **Other Tools**:
  - Insomnia (for API testing)
  - Git (for version control)



# API Endpoints

Below is a list of the available API endpoints for the MERN Bookstore Application. These endpoints allow users to interact with the application, including authentication and book management.

## Authentication

### Register a New User
- **Endpoint**: `POST /api/signup`
- **Description**: Register a new user with a username, email, and password.
- **Request Body**:
```json
{
    "name": "your_username",
    "email": "your_email@example.com",
    "password": "your_password"
}
```
- **Response**:
```json
{
    "status": 200,
    "user": {
        "name": "your_username",
        "email": "your_email@example.com"
    }
}
```

### Log In an Existing User
- **Endpoint**: `POST /api/auth/login`
- **Description**: Log in an existing user with their email and password.
- **Request Body**:
```json
{
    "email": "your_email@example.com",
    "password": "your_password"
}
```
- **Response**:
```json
{
    "email": "your_email@example.com"
    "name": "your_username",
    "token":"signed_jwt_token"
}
```

## Books

### Get All Books
- **Endpoint**: `GET /api`
- **Description**: Retrieve a list of all books in the bookstore.
- **Response**:
```json
[
    {
        "id": "book_id",
        "title": "Book Title",
        "author": "Author Name",
        "price": 29.99,
        "yearPublished": 2023
    },
    {
        "id": "book_id_2",
        "title": "Another Book Title",
        "author": "Another Author",
        "price": 19.99,
        "yearPublished": 2021
    }
]
```

### Add a New Book (Protected Route)
- **Endpoint**: `POST /api`
- **Description**: Add a new book to the bookstore. Requires authentication.
- **Request Body**:
```json
{
    "title": "Book Title",
    "author": "Author Name",
    "price": 29.99,
    "yearPublished": 2023
}
```
- **Response**:
```json
{
    "message": "Book added successfully",
    "book": {
        "id": "book_id",
        "title": "Book Title",
        "author": "Author Name",
        "price": 29.99,
        "yearPublished": 2023
    }
}
```

### Update a Book (Protected Route)
- **Endpoint**: `PUT /api/:id`
- **Description**: Update the details of an existing book. Requires authentication.
- **Request Body**:
```json
{
    "title": "Updated Book Title",
    "author": "Updated Author Name",
    "price": 39.99,
    "yearPublished": 2022
}
```
- **Response**:
```json
{
    "message": "Book updated successfully",
    "book": {
        "id": "book_id",
        "title": "Updated Book Title",
        "author": "Updated Author Name",
        "price": 39.99,
        "yearPublished": 2022
    }
}
```

### Delete a Book (Protected Route)
- **Endpoint**: `DELETE /api/:id`
- **Description**: Delete a book from the bookstore. Requires authentication.
- **Response**:
```json
{
    "message": "Book deleted successfully"
}
```

## Acknowledgements

This project was made possible thanks to the following resources, tools, and communities:

- **MERN Stack Community** - For providing excellent tutorials, documentation, and support.
- **JWT Authentication** - Inspired by various implementations of secure authentication in MERN applications.
- **Mongoose** - For simplifying MongoDB interactions and schema management.
- **Axios** - For making HTTP requests from the frontend to the backend.
- **React Router** - For navigation within the application.
- **Insomnia** - For testing and debugging the API endpoints.
- **GitHub** - For hosting this project and enabling collaboration.

Special thanks to everyone who contributed directly or indirectly to this project! Your support and inspiration are greatly appreciated.

