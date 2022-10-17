import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true,
    },
    user:{
        type: String,
        // required: true
    }
}, {timestamps: true})

const commentModel  = new mongoose.model("Comment", commentSchema);
//export default mongoose.model("Comment", commentSchema)

export {
    commentSchema,
    commentModel
}

