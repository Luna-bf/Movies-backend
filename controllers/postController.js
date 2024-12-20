import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user_id", "-password");
        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ------------------------------------------------------------------------------
//*
//* utilisation du try / catch pour gérer les erreurs, et aojuter des codes http pour les erreurs et les succès
//*
// ------------------------------------------------------------------------------

export const createPost = async (req, res) => {
    const { title, author, content, user_id } = req.body;

    try {
        const newPost = await new Post(req.body);
        newPost.save();
        return res.status(201).json(newPost);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// ------------------------------------------------------------------------------
//*
//* Gérer tous les cas de figure (update, delete, getById, getByUser)
//*
//* // export const updatePost = async (req, res) => {}
//* // export const deletePost = async (req, res) => {}
//* // export const getPostById = async (req, res) => {}
//* // export const getPostByUser = async (req, res) => {}
//*
// ------------------------------------------------------------------------------
