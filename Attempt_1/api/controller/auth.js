import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);  // generating salt for password
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hash  // password in mongo is stored in hash
        })

        await newUser.save();
        res.status(201).send("User has been created!")
    }
    catch (err) {
        next (err)
    }
} 

export const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({username: req.body.username})   // unique user hence findOne
        if (!user) return next(createError(404, "Sorry wrong number..."));  // error handler

        const passwordCheck = await bcrypt.compare(req.body.password, user.password);  // auth check
        if (!passwordCheck) return next(createError(401, "pakka tu hi hai?"));         // error handler

        const token = jwt.sign(({id: user._id, isAdmin: user.isAdmin}), process.env.JWT)  // hashed token

        const {isAdmin, password, ...otherDeatils} = user._doc   // preventing isAdmin status and password hash to be returned in response
        
        res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDeatils})  // storing cookie in browser and preventing client side script to access it
    }
    catch (err) {
        next (err)
    }
}