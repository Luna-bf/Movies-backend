import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/posts", getAllPosts);
postRouter.post("/post", createPost);

// postRouter.get("/post/:id", getPostById);
// postRouter.put("/post/:id", updatePost);
// postRouter.delete("/post/:id", deletePost);

// ------------------------------------------------------------------------------
//*
//* ajouter des routes pour les posts (get, post, put, delete)
//*
// ------------------------------------------------------------------------------

export default postRouter;
