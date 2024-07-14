# UserAuthentication
# User Authentication System

This is a basic user authentication system built using Node.js, Express, and MongoDB. It includes user registration and login functionalities.

## Features

- User registration with unique username and email
- User login with password validation
- Initial user creation for testing purposes

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Hiccupfish/UserAuthentication.git
2, Navigate to the project directory:
cd UserAuthentication
3. Install the dependencies:
npm install


Here's an example of a README.md file for your User Authentication System project:

markdown
Copy code
# User Authentication System

This is a basic user authentication system built using Node.js, Express, and MongoDB. It includes user registration and login functionalities.

## Features

- User registration with unique username and email
- User login with password validation
- Initial user creation for testing purposes

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Hiccupfish/UserAuthentication.git
2. Navigate to the project directory:


cd UserAuthentication
Install the dependencies:

npm install
1. Configuration
Make sure MongoDB is running on your machine. The default connection string in the project is:


mongodb://127.0.0.1:27017/UsersDatabase
You can change this URI in the code if your MongoDB instance is running on a different address or port.

Running the Project
1. Start the server:
   npm start
The server will start on port 5000 by default. You can change the port by setting the PORT environment variable.

API Endpoints
Register a new user:
POST /register

Request body:
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}


