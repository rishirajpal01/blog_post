let mongoose = require("mongoose");

let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
});

let Blog = module.exports = mongoose.model("Blog", articleSchema);