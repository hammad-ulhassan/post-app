# Frontend Application

A modern React application built with Vite, TypeScript, and Tailwind CSS.

## Folder Structure

```
frontend/
├── node_modules/
├── README.md
├── env
├── eslint.config.js
├── index.html
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── common/
│   │   ├── layout/
│   │   └── pages/
│   ├── config/
│   ├── constants/
│   ├── index.css
│   ├── main.tsx
│   ├── models/
│   ├── redux
│   │   ├── slices/
│   │   └── store.ts
│   ├── routing/
│   ├── services/
│   ├── theme/
│   ├── utils/
│   │   └── index.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm

### Installation

1. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

2. Set up environment variables (see Environment Variables section below)

3. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

The application will be available at **http://localhost:5173**

## Environment Variables

Create a `.env` file in the root of the frontend directory with the following variables:

```env
# Avatar service for user profile pictures
VITE_USER_AVATAR_URL=https://avatar.iran.liara.run/public/27

# API endpoints (proxied through Vite dev server)
VITE_USER_BASE_URL=api/users
VITE_POST_BASE_URL=api/posts
```

### Variable Descriptions

- **`VITE_USER_AVATAR_URL`**: Base URL for generating user avatar images
- **`VITE_USER_BASE_URL`**: API endpoint for user-related requests (users CRUD operations)
- **`VITE_POST_BASE_URL`**: API endpoint for post-related requests (posts CRUD operations)

### Usage in Code

```javascript
import axios from 'axios';

const userApi = import.meta.env.VITE_USER_BASE_URL;
const postApi = import.meta.env.VITE_POST_BASE_URL;

// Using axios for API calls
const api = axios.create({
  baseURL: '/',
  timeout: 10000,
});

// Example API calls
api.get(`${userApi}/123`)           // GET /api/users/123
api.get(`${postApi}`)               // GET /api/posts
api.post(`${postApi}`, postData)    // POST /api/posts
```

## Development Server

The Vite development server includes a proxy configuration that forwards API requests to the backend:

- Frontend: `http://localhost:5173`
- API requests (`/api/*`) are proxied to: `http://localhost:6000`

This setup eliminates CORS issues during development.

## Available Scripts

- `yarn dev` / `npm run dev` - Start development server
- `yarn build` / `npm run build` - Build for production
- `yarn preview` / `npm run preview` - Preview production build
- `yarn lint` / `npm run lint` - Run ESLint

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit (RTK)** - State management
- **React Redux** - React bindings for Redux
- **React Router DOM** - Client-side routing
- **Ant Design** - UI component library
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting

## State Management

This application uses **Redux Toolkit (RTK)** for state management:

- **Redux Store** - Centralized application state
- **RTK Query** - Efficient data fetching and caching (if implemented)
- **React Redux** - Connect React components to Redux store

### Store Structure

The Redux store manages:
- User authentication state
- User data and profiles
- Posts and content
- UI state and loading indicators

## API Integration

The frontend communicates with a backend server running on port 6000 using **Axios**. All API requests are made through the configured base URLs:

- User operations: `/api/users/*`
- Post operations: `/api/posts/*`

Example endpoints:
- `GET /api/users` - Fetch all users
- `GET /api/users/123/posts` - Fetch posts by user
- `POST /api/posts` - Create a new post

## UI Components

The application uses **Ant Design** for consistent and professional UI components:
- Forms, buttons, tables, modals
- Icons and typography
- Layout components
- Date pickers, notifications, etc.

**Styled Components** is used for custom styling and theme management.

## Project Features

- **User Management** - User profiles, authentication, and user-related operations
- **Post Management** - Create, read, update, and delete posts
- **Responsive Design** - Mobile-friendly interface with Ant Design components
- **State Management** - Centralized state with Redux Toolkit
- **Type Safety** - Full TypeScript support for better developer experience
- **Modern Routing** - Client-side routing with React Router DOM
- **Custom Styling** - Styled Components for component-level styling

## Notes

- Environment variables must be prefixed with `VITE_` to be accessible in the client
- Restart the development server after changing environment variables
- The proxy configuration is only active during development
- Redux DevTools extension is recommended for debugging state changes
- Ant Design components are automatically imported and styled

## Author

**Hammad Hassan**