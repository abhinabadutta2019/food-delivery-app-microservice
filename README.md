# Food Delivery App Microservices

This repository contains the source code for a food delivery application implemented using microservices architecture. The application consists of three microservices:

1. **User Service**
2. **Restaurant Service**
3. **Delivery Agent Service**

## User Service

The User Service is responsible for managing user-related operations such as user registration, authentication, and authorization. It handles user data storage and provides endpoints for user management.

### Routes

- `POST /login`: Logs in a user with provided credentials.
- `POST /register`: Registers a new user.
- `GET /profile`: Retrieves the profile information of the authenticated user.

## Restaurant Service

The Restaurant Service manages restaurant-related operations such as creating, updating, and deleting restaurants, as well as handling orders placed by users.

### Routes

- `GET /`: Retrieves a list of all restaurants.
- `GET /:id`: Retrieves details of a specific restaurant.
- `POST /`: Creates a new restaurant.
- `PUT /:id`: Updates an existing restaurant.
- `DELETE /:id`: Deletes a restaurant.

### Order Routes

- `GET /`: Retrieves all orders sorted by creation date.
- `PUT /status/:id`: Updates the status of a specific order to "accept" and assigns it to a random available delivery agent.

## Delivery Agent Service

The Delivery Agent Service manages orders assigned to delivery agents and handles the delivery process.

### Order Routes

- `GET /`: Retrieves all orders assigned to the authenticated delivery agent.
- `PUT /deliver/:id`: Updates the status of a specific order to "delivered" if it's currently in the "accept" status and assigned to the authenticated delivery agent.


## Technologies Used

 Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens) for authentication
- Cookie-parser
- dotenv
- Mongoose
- Nodemon
