# NoteWave

NoteWave is a comprehensive notes sharing application that allows users to store various types of data, such as PDFs, images, and texts, in a single note and can share with other users by choosing the visibility to PUBLIC. The app supports CRUD operations, enabling users to create, read, update, and delete notes. Users can also manage their profile details, such as changing their name and email.

## Table of Contents

- [Features](#features)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Authentication](#authentication)
- [License](#license)

## Features

- Store various types of data (PDFs, images, texts) in a single note.
- Perform CRUD operations on notes.
- User authentication and profile management.
- Responsive and user-friendly interface.

## Frontend

The client-side application is served on `localhost:5173`.

### Links

- **Home:** `/`
- **Login:** `/login`
- **Signup:** `/signup`
- **Profile:** `/profile:id`
- **Create Note:** `/createnote`
- **Edit Note:** `/editnote/:id`

## Backend

The server-side application is served on `localhost:3000`.

## API Endpoints

### /api/notes/

1. **GET `/api/all-notes/`**
   - Fetch all the notes created by all users.
2. **GET `/api/notes/`**
   - Fetch all of notes created by the user.

3. **POST `/api/notes/create`**
   - Create a new note.

4. **GET `/api/notes/:id`**
   - Fetch a specific note by ID.

5. **PUT `/api/notes/:id`**
   - Update a specific note by ID.

6. **DELETE `/api/notes/:id`**
   - Delete a specific note by ID.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd NoteWave
    ```

3. **Install dependencies for both frontend and backend:**

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the backend directory and add your environment variables. Example:

    ```env
    PORT=3000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

5. **Start the development servers:**

    ```bash
    cd frontend
    npm start
    cd ../backend
    npm run dev
    ```

## Dependencies

### Frontend

- `@reduxjs/toolkit`: ^2.2.5
- `axios`: ^1.7.2
- `boxicons`: ^2.1.4
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-redux`: ^9.1.2
- `react-router-dom`: ^6.23.1

### Backend

- `bcrypt`: ^5.1.1
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `jsonwebtoken`: ^9.0.2
- `mongoose`: ^8.4.1
- `nodemon`: ^3.1.2

## Authentication

User authentication is implemented in the backend using JWT (JSON Web Tokens) and password encryption is handled using `bcrypt`.

## License

This project is licensed under the MIT License.
##
Enjoy using NoteWave! For any queries or contributions, feel free to me.
