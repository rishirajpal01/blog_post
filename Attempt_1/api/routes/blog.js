import express from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog, getComments } from "../controller/blog.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createBlog);

//update
router.put("/:id", verifyUser, updateBlog);

//delete
router.delete("/:id", verifyUser, deleteBlog);

//get particular blog
router.get("/:id", getBlog);

// get all blogs
router.get("/", getBlogs);

//get blog commnets
router.get("/:id", getComments);

export default router;