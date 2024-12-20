import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerNewUser = async (req, res) => {
    let { email, name, last_name, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
            email,
            name,
            last_name,
            password: hashedPassword,
        });

        newUser.save();
        return res.status(201).json({ message: `Welcome ${email}` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" }); // dans le cas ou il y a une erreur lors de la création de l'utilisateur, status 500
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const passwordVerification = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordVerification) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        return res.status(200).json(token); // dans le cas ou la connexion est réussie, status 200
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" }); // dans le cas ou il y a une erreur lors de la connexion de l'utilisateur, status 500
    }
};
