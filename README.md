# Project Name README

This README.md file provides instructions on how to run the project, which consists of a frontend built with React and TypeScript and a backend built with Node.js, Express, and TypeScript. Additionally, it explains how to run unit tests for the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Running Unit Tests](#running-unit-tests)

## Prerequisites

Before you begin, make sure you have the following software installed on your system:

- **Node.js**: You can download and install Node.js from [nodejs.org](https://nodejs.org/).
- **npm** (Node Package Manager): npm is usually included with Node.js installation.

## Getting Started

To run the project, follow these steps for both the frontend and backend components.

### Frontend

1. Navigate to the frontend folder using your terminal.

   ```bash
   cd frontend
   ```

2. Install project dependencies.

   ```bash
   npm install
   ```

3. Start the frontend development server.

   ```bash
   npm start
   ```

   This will start the React development server, and your frontend will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.

### Backend

1. Navigate to the backend folder using your terminal.

   ```bash
   cd backend
   ```

2. Install project dependencies.

   ```bash
   npm install
   ```

3. Start the backend server.

   There's two ways to achive this:

   ```bash
   npm run build
   node dist/app.js
   ```

   Run with nodemon

   ```bash
   npm run dev
   ```

   The backend server will run at [http://localhost:8000](http://localhost:8000) by default. You can adjust the port or other configurations in the backend's configuration files if needed.

## Running Unit Tests

To run unit tests for both the frontend and backend, follow these steps:

### Frontend Unit Tests

1. Navigate to the frontend folder using your terminal.

   ```bash
   cd frontend
   ```

2. Run the frontend unit tests.

   ```bash
   npm test
   ```

   This will execute the unit tests using the testing framework configured for the frontend.

### Backend Unit Tests

1. Navigate to the backend folder using your terminal.

   ```bash
   cd backend
   ```

2. Run the backend unit tests.

   ```bash
   npm test
   ```

   This will execute the unit tests using the testing framework configured for the backend.
