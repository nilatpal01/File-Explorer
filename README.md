# Project Setup

Welcome to the project! This guide will help you set up both the frontend and backend servers so you can see and test changes in the application locally.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Starting the Servers](#starting-the-servers)
  - [1. Start the Backend Server](#1-start-the-backend-server)
  - [2. Start the Frontend Server](#2-start-the-frontend-server)
- [Accessing the Application](#accessing-the-application)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: We recommend version 14 or higher for compatibility.
- **npm**: The Node Package Manager, which comes with Node.js.

## Environment Variables

To configure the application properly, create a `.env` file in the `Frontend` directory with the required environment variables. For example:
REACT_APP_API_BASE_URL=http://localhost:3000/api

## Starting the Servers

To see changes in the application, you need to start both the backend and frontend servers. Follow the instructions below:

### 1. Start the Backend Server

- Navigate to the **Backend** directory:
  
**cd Backend**
Install the necessary dependencies:
**npm install**
Run the backend server in development mode:
**npm run dev**

### 2. Start the Frontend Server
- Navigate to the **Frontend** directory:

**cd Frontend**
Install the required dependencies:
**npm install**
Start the frontend server:
**npm start**

Once both servers are running, you should see messages in the console indicating that they are active.
