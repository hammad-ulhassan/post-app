
import { Request, Response, Router } from "express";

import { UserController } from "../controllers/users.controller";

export const userRouter = Router();

// use userController routes and create userRouter endpoints

const userController = new UserController();

userRouter.get("/", (req: Request, res: Response) => {
    res.send(userController.getUsers());
});

userRouter.get("/:id", (req: Request, res: Response) => {
    const user = userController.getUserById(Number(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

userRouter.get("/:id/posts", (req: Request, res: Response) => {
    const posts = userController.getUserPosts(Number(req.params.id));
    res.json(posts);
});

userRouter.post("/:id/posts", (req: Request, res: Response) => {
    const post = userController.addUserPost(Number(req.params.id), req.body);
    res.status(201).json(post);
});


