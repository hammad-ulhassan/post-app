// In your main app.js or create a separate posts router
import { Router, Request, Response } from 'express';
import { posts } from '../data/mockData';
import { ApiResponse, Post } from '../types';

const postsRouter = Router();

postsRouter.get('/:postId', (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        message: 'Post ID must be a valid number'
      });
    }
    
    const post = posts.find(post => post.id === postId);

    console.log({post})

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const response: ApiResponse<Post> = {
      success: true,
      data: post
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch post'
    });
  }
});

export default postsRouter;