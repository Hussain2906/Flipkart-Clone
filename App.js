import express from "express"
import userRoutes from "./routes/user.js"
import categoryRoutes from "./routes/category.js"
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json())

// Routers

app.use('/users', userRoutes)
app.use('/category', categoryRoutes)




const start = async()=>{
    try {
        app.listen({port:3000, host:"0.0.0.0"}, (err,addr)=>{
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