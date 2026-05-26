


https://github.com/jahnavi24yalamanchili-pixel/ATP-week5-Blog-App#backend-development give readme documentation for thsi repository backend

Backend Documentation
Backend Development
The backend of this project is built using the MERN Stack backend technologies:

Node.js – JavaScript runtime environment

Express.js – Backend framework for APIs and server handling

MongoDB – NoSQL database for storing blog data

Mongoose – ODM for MongoDB

dotenv – Environment variable management

This backend handles:

Server setup

API routing

Database connection

Environment configuration

Blog data management

Backend Folder Structure
backend/
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
│
├── config/
│   └── db.js
│
├── models/
│   └── Blog.js
│
├── routes/
│   └── blogRoutes.js
│
├── controllers/
│   └── blogController.js
│
└── middleware/
Backend Setup
1. Clone Repository
git clone https://github.com/jahnavi24yalamanchili-pixel/ATP-week5-Blog-App.git
2. Navigate to Backend Folder
cd ATP-week5-Blog-App/backend
3. Install Dependencies
npm install
Required Packages
Install the following packages:

npm install express mongoose dotenv cors nodemon
Environment Variables
Create a .env file inside the backend folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
MongoDB Connection
Create a database connection file:

config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
Server Setup
server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
Running Backend Server
Development Mode
npm run dev
Production Mode
npm start
Package.json Scripts
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
Features Implemented
Express server setup

MongoDB database connection

Environment variable support

REST API structure

Middleware integration

CORS enabled

JSON request handling

API Testing
You can test backend APIs using:

Postman

Thunder Client

Hoppscotch

Future Improvements
User Authentication

JWT Authorization

CRUD Operations for Blogs

File/Image Uploads

Comment System

Like & Save Features

Admin Dashboard

Tech Stack
Technology	Purpose
Node.js	Runtime Environment
Express.js	Backend Framework
MongoDB	Database
Mongoose	Database ODM
dotenv	Environment Variables
Nodemon	Development Server
Git Commands Used
git init
git add .
git commit -m "Backend setup completed"
git branch -M main
git remote add origin https://github.com/jahnavi24yalamanchili-pixel/ATP-week5-Blog-App.git
git push -u origin main
Deployment
Backend can be deployed using:

Vercel

Render

Railway

Repository
ATP Week5 Blog App Repository

This backend is the foundation for the Blog Application and will be expanded with full CRUD functionality and authentication in future updates.



