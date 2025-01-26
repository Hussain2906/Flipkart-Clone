import express from "express"
import { getProductsByCategoryId } from "../controllers/product.js";


const router = express.Router()

try {
    router.get("/:categoryId", getProductsByCategoryId);
} catch (error) {
    console.error("Route Error:", error);
}

export default router