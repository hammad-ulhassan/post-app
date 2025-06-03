import { Router, Request, Response } from 'express';
import { users, posts } from '../data/mockData';
import { ApiResponse, User, Post } from '../types';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const response: ApiResponse<User[]> = {
      success: true,
      data: users
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId) || userId < 1 || userId > 10) {
      return res.status(400).json({
        success: false,
        message: 'User ID must be a number between 1 and 10'
      });
    }

    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const response: ApiResponse<User> = {
      success: true,
      data: user
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
});

router.get('/:id/posts', (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId) || userId < 1 || userId > 10) {
      return res.status(400).json({
        success: false,
        message: 'User ID must be a number between 1 and 10'
      });
    }

    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userPosts = posts.filter(post => post.userId === userId);
    
    const response: ApiResponse<Post[]> = {
      success: true,
      data: userPosts
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user posts'
    });
  }
});

router.post('/:userId/post/:postId', (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const postId = parseInt(req.params.postId);
    
    if (isNaN(userId) || userId < 1 || userId > 10) {
      return res.status(400).json({
        success: false,
        message: 'User ID must be a number between 1 and 10'
      });
    }

    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        message: 'Post ID must be a valid number'
      });
    }

    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const postIndex = posts.findIndex(post => post.id === postId && post.userId === userId);
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post not found or does not belong to this user'
      });
    }

    const { title, body } = req.body;
    
    if (title !== undefined) {
      posts[postIndex].title = title;
    }
    
    if (body !== undefined) {
      posts[postIndex].body = body;
    }

    const response: ApiResponse<Post> = {
      success: true,
      data: posts[postIndex],
      message: 'Post updated successfully'
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update post'
    });
  }
});

export default router;
