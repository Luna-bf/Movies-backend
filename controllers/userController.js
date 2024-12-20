import Post from "../models/Post.js";
import User from "../models/User.js";

// ------------------------------------------------------------------------------
//*
//* utilisation du try / catch pour gérer les erreurs, et aojuter des codes http pour les erreurs et les succès
//*
// ------------------------------------------------------------------------------

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length < 1) {
            return res.status(404).json({ message: "Users not found" });
        }
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const createUser = async (req, res) => {
    let { email, name, last_name, password } = req.body;
    try {
        const newUser = await new User({
            email,
            name,
            last_name,
            password,
        });
        newUser.save();
        return res.status(201).json({ message: "User has been created" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserByID = async (req, res) => {
    const { id } = req.params;
    try {
        const userByID = await User.findById(id);
        if (!userByID) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(userByID);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUserByID = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" }); // dans le cas ou l'utilisateur n'est pas trouvé avec l'id
        }
        return res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUserByID = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await User.deleteOne({ _id: id });
        const deletePostsRelatedToUser = await Post.deleteMany({ user_id: id });
        console.log(deletePostsRelatedToUser);

        if (deleteUser.deletedCount === 1) {
            return res.status(200).json({ message: "User has been deleted" });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
