import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/user.js";
import { isAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("You are innnn!");
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("You are logged in can can delete your account.")
})

router.get("/checkadmin/:id", isAdmin, (req, res, next) => {
    res.send("You are the bosssss!");
})

//update
router.put("/:id", verifyUser, updateUser);

//delete
router.delete("/:id", verifyUser, deleteUser);

//get particular user
router.get("/:id", verifyUser, getUser);

// get all users
router.get("/", isAdmin, getUsers); 

export default router;