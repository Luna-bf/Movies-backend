import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ------------------------------------------------------------------------------
//*
//* utilisation du try / catch pour gérer les erreurs, et aojuter des codes http pour les erreurs et les succès
//*
// ------------------------------------------------------------------------------

export const userFieldsVerification = (req, res, next) => {
    const { email, name, last_name, password } = req.body;
    try {
        if (!email || !name || !last_name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const emailVerification = async (req, res, next) => {
    const { email } = req.body;
    try {
        const searchUserByEmail = await User.findOne({ email });
        if (searchUserByEmail) {
            return res.status(400).json({ message: "Email already taken" });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const verifyToken = async (req, res, next) => {
    //* actuellement je crois que tu n'utilises pas ce middleware dans les routes
    const token = req.headers.authorization.split(" ")[1];

    try {
        if (!token) {
            return res.status(400).json({ message: "Token missing" });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (verify) {
            next();
        } else {
            return res.status(400).json({ message: "Invalid token" });
        }
    } catch (err) {
        return res.status(400).json({ message: "Access denied" });
    }
};
