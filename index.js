import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import movieRouter from "./routes/movieRouter.js";
import postRouter from "./routes/postRouter.js";
import userRouter from "./routes/userRouter.js";

// ------------------------------------------------------------------------------
//*
//* PENSES BIEN A METTRE .ENV DANS LE .GITIGNORE, car uniquement mettre .env.* dans le .gitignore masque uniquement les fichiers .env.quelquechose
//*
// ------------------------------------------------------------------------------

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

const db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

app.use(movieRouter, userRouter, postRouter, authRouter);

mongoose.connect(MONGO_URI);

db.on("connected", () => {
    console.log("Connected successfully");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
