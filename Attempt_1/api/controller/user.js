import userModel from "../models/userModel.js"

// UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await userModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateUser);
    } catch (err){
        next(err);
    }
}


// DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted!");
    } catch (err){
        next(err);
    }
}

// GET PARTICULAR USER
export const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (err){
        next(err);
    }
}

// GET ALL USERS
export const getUsers = async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err){
        next(err);
    }
}