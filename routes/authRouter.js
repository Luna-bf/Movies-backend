import { Router } from "express";
import { loginUser, registerNewUser } from "../controllers/authController.js";
import {
    emailVerification,
    userFieldsVerification,
} from "../middlewares/userValidation.js";

const authRouter = Router();

authRouter.post(
    "/register",
    userFieldsVerification,
    emailVerification,
    registerNewUser
);
authRouter.post("/login", loginUser); // c'est un POST et non un GET car on envoie des données (email et password)

export default authRouter;
