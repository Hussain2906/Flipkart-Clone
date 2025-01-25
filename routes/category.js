import express from "express"
import { getAllCategories } from "../controllers/category.js";


const router = express.Router()

try {
    router.post("/category", getAllCategories);
} catch (error) {
    console.error("Route Error:", error);
}

export default router