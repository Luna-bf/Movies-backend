import { Router } from "express";
import Sibling from "../Models/Sibling.js";

const siblingRouter = Router();

siblingRouter.get("/siblings", async (req, res) => {
    try {
        const siblings = await Sibling.find();
        if (siblings.length < 1) {
            return res.json({ message: "This user doesn't have any siblings" });
        }
        return res.json(siblings);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

siblingRouter.post("/sibling", async (req, res) => {
    let { name, last_name, age, birthDate } = req.body;

    try {
        const newSibling = await new Sibling({
            name,
            last_name,
            age,
            birthDate,
        });
        newSibling.save();
        return res
            .status(201)
            .json({ message: "A new sibling has been created" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

siblingRouter.get("/sibling/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const siblingByID = await Sibling.findById(id);
        if (!siblingByID) {
            return res.status(400).json({ message: "Sibling not found" });
        }
        return res.json(siblingByID);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

siblingRouter.put("/sibling/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSibling = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(updatedSibling);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

siblingRouter.delete("/sibling/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSibling = await Sibling.deleteOne({ _id: id });
        if (deleteSibling.deletedCount === 1) {
            return res
                .status(203)
                .json({ message: "Sibling has been deleted" });
        }
        return res.status(400).json({ message: "Sibling not found" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default siblingRouter;
