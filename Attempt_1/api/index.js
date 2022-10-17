import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import blogRoute from "./routes/blog.js"
import userRoute from "./routes/user.js"
import commentRoute from "./routes/comment.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB :)")
      } catch (error) {
        throw error;
      }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected :(");
})

app.get("/", (req, res) => {
    res.send("I'm live wohoooo!");
})

// app.set("view engine", "pug");

// app.set("views", path.resolve("./client"))


// creating middleware
app.use(cookieParser())
app.use(express.json());   // to send json data in express

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/user", userRoute);
app.use("/api/comment", commentRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessge = err.message || "Something went wrong :(";
    return res.status(errorStatus).json(errorMessge);
})


app.listen(3000, () => {
    connect();
    console.log("Connected to local server yay!");
})