# School Fee Management System

A modern web application for managing school fees for classes 1 to 10. Built with React, Material-UI, and Vite.

## Features

- Dashboard with key metrics
- Class management (1-10)
- Student management
- Fee collection and tracking
- Payment status tracking
- Multiple payment methods support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd school-fee-management
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME="School Fee Management System"
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── App.jsx        # Main application component
  ├── main.jsx       # Application entry point
  └── index.css      # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- React
- Material-UI
- Vite
- React Router
- Formik
- Yup 