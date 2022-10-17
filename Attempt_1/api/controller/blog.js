import blogModel from "../models/blogModel.js"

// CREATE BLOG
export const createBlog = async (req, res, next) => {
    const newBlog = new blogModel(req.body)
    try {
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    } catch (err){
        next(err);
    }
}

// UPDATE BLOG
export const updateBlog = async (req, res, next) => {
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});  //new true to return the newer version of blog
        res.status(200).json(updatedBlog);
    } catch (err){
        next(err);
    }
}


// DELETE BLOG
export const deleteBlog = async (req, res, next) => {
    try {
        await blogModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Blog has been deleted!");
    } catch (err){
        next(err);
    }
}

// GET PARTICULAR BLOG
export const getBlog = async (req, res, next) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err){
        next(err);
    }
}

// GET ALL BLOG
export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json(blogs);
    } catch (err){
        next(err);
    }
}

// get comments 
export const getComments = async (req, res, next) => {
    try{
        const comments = await blogModel.findById(req.params.id);
        res.status(200).json(comments);
    }  
    catch (err) {
        next(err)
    }
}