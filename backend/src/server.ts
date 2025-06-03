import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import { errorHandler, notFound, requestLogger } from './middleware';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(helmet());
app.use(cors()); 
app.use(morgan('combined')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'post-app server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/users',
      userById: '/users/:id',
      userPosts: '/users/:id/posts',
      updatePost: '/users/:userId/post/:postId'
    }
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/users`);
  console.log(`📝 Posts endpoint: http://localhost:${PORT}/users/1/posts`);
});

export default app;