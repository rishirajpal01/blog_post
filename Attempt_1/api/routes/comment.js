import express from "express";
import { createComment, deleteComment, getComment, getComments, updateComment } from "../controller/comments.js";
import { isAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:blogid", verifyUser, createComment);

//update
router.put("/:id", verifyUser, updateComment);
 
//delete
router.delete("/:commentid/:blogid", isAdmin, deleteComment);

//get particular comment
router.get("/:id", getComment);

// get all comments
router.get("/", getComments);

export default router;