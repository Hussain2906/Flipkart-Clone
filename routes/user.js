import express from "express"
import { loginOrSignup } from "../controllers/user.js"

const router = express.Router()

try {
    router.post("/login", loginOrSignup);
} catch (error) {
    console.error("Route Error:", error);
}

export default router