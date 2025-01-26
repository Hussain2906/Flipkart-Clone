import express from "express"
import { createOrder, createTransaction, getOrderByUserId } from "../controllers/order.js";



const router = express.Router()

try {
    router.post("/transaction", createTransaction);
    router.post("/:userId", getOrderByUserId);
    router.post("/", createOrder);
} catch (error) {
    console.error("Route Error:", error);
}

export default router