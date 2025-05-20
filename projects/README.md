# School Fee Management System

A web application for managing school fees for classes 1 to 10. The system allows tracking of student fee payments with a clean and intuitive interface.

## Features

- Add new students with their details
- Track fee payments for each month
- View all students and their fee status
- Toggle fee payment status with a single click
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/school-fee-management
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Add a new student using the form at the top of the page
2. View all students in the table below
3. Click on the month buttons to toggle fee payment status
   - Green: Fee paid
   - Red: Fee unpaid

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Styling: CSS 