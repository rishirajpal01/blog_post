import mongoose from "mongoose";
import {commentSchema} from "./commentModel.js";

const blogSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Body:{
        type: String,
        required: true
    },
    Comments:{
        //type: [{comment: String}]
        type: [commentSchema]
    }
})

export default mongoose.model("Blog", blogSchema)