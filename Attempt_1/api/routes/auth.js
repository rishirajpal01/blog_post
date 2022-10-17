import express from "express";
import { login, register } from "../controller/auth.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("Logged innn!!")
})

router.post("/register", register)
router.post("/login", login)

export default router;