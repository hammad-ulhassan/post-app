# Blog Dashboard Backend API

A Node.js Express TypeScript backend API for the Blog Dashboard application.

## Features

- 🚀 Express.js with TypeScript
- 🔄 Auto-reload with Nodemon
- 🛡️ Security headers with Helmet
- 🌐 CORS enabled
- 📝 Request logging with Morgan
- 🎯 RESTful API endpoints
- 📊 Mock data for users and posts
- ⚡ Error handling middleware

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID (1-10)
- `GET /users/:id/posts` - Get posts by user ID
- `POST /users/:userId/post/:postId` - Update a specific post

### Health Check
- `GET /health` - Server health check
- `GET /` - API information

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For production build:
```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Clean build directory

## Environment Variables

The server runs on port 6000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8000 npm run dev
```

## API Usage Examples

### Get all users
```bash
curl http://localhost:6000/users
```

### Get specific user
```bash
curl http://localhost:6000/users/1
```

### Get user posts
```bash
curl http://localhost:6000/users/1/posts
```

### Update a post
```bash
curl -X POST http://localhost:6000/users/1/post/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "body": "Updated content"}'
```

## Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "data": any,
  "message": string (optional)
}
```

## Error Handling

The API includes comprehensive error handling:
- 400: Bad Request (invalid parameters)
- 404: Not Found (user/post not found)
- 500: Internal Server Error

## Development

The project uses:
- **TypeScript** for type safety
- **Express.js** for the web framework
- **Nodemon** for auto-reload during development
- **Morgan** for HTTP request logging
- **Helmet** for security headers
- **CORS** for cross-origin requests

## File Structure

```
src/
├── data/
│   └── mockData.ts          # Static sample data
├── middleware/
│   └── index.ts             # Custom middleware
├── routes/
│   └── userRoutes.ts        # User-related routes
├── types/
│   └── index.ts             # TypeScript type definitions
└── server.ts                # Main server file
```

## Mock Data

The API includes 10 sample users and 20 sample posts. Each user has detailed information including:
- Personal details (name, email, phone)
- Address information
- Company information
- Website

Posts are distributed among users and include title and body content.

## CORS Configuration

CORS is enabled for all origins in development. For production, you should configure specific origins:

```typescript
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com']
}));
```