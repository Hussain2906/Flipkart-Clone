import express from "express"
import userRoutes from "./routes/user.js"
import categoryRoutes from "./routes/category.js"
import productRoutes from "./routes/product.js"
import orderRoutes from "./routes/order.js"
import dotenv from "dotenv"
import connectDB from "./config/connect.js"
import { PORT } from "./config/config.js"

dotenv.config()

const app = express();
app.use(express.json())

// Routers

app.use('/users', userRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)




const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);


        app.listen({port:PORT, host:"0.0.0.0"}, (err,addr)=>{
            if(err){
                console.log("error running server", err)
            }else{
                console.log(`Server running at http://localhost:3000`)
            }
        })
    } catch (error) {
        console.log("Error starting Server -->>", error)
    }
}

start();