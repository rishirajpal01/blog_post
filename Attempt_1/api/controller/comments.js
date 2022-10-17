import {commentModel} from "../models/commentModel.js";
import blogModel from "../models/blogModel.js";
import { createError } from "../utils/error.js";

// CREATE COMMENT
export const createComment = async (req, res, next) => {
    const blogId = req.params.blogid;
    const newComment = new commentModel(req.body);

    try {
        const savedComment = await newComment.save();
        try {
           //await blogModel.findByIdAndUpdate(blogId, {$push: {Comments: savedComment._id }}) // ._id for just the comment id
           const temp = await blogModel.findById(blogId)
           temp.Comments.push(savedComment)
           await temp.save();

        } catch (err) {
            next(err)
        }
        res.status(200).json(savedComment)
    } catch (err) {
        next(err)
    }
}

// Update Comment
export const updateComment = async (req, res, next) => {
    try {
        const updatedComment = await commentModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});  //new true to return the newer version of blog
        res.status(200).json(updatedComment);
    } catch (err){
        next(err);
    }
}


// DELETE COMMENT
export const deleteComment = async (req, res, next) => {
    const blogID = req.params.blogId;
    try {
        await commentModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment Deleted");
        try {
            await blogModel.findByIdAndUpdate(blogID, {$pull: { Comments: req.params._id}})
        } catch (err) {
            next(err)
        }
    } catch (err) {
        
    }
}

// GET PARTICULAR COMMENT
export const getComment = async (req, res, next) => {
    try {
        const comment = await commentModel.findById(req.params.id);
        res.status(200).json(comment);
    } catch (err){
        next(err);
    }
}

// GET ALL COMMENT
export const getComments = async (req, res, next) => {
    try {
        const comments = await commentModel.find();
        res.status(200).json(comments);
    } catch (err){
        next(err);
    }
}