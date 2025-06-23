import express from "express"
import router from "./Routes/index.js"
import cors from "cors"
import router1 from "./Routes/uploadLinkedIn.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
const app=express()
dotenv.config()


const dbConnect=async()=>{
    try{
       await mongoose.connect(`mongodb+srv://sanketsnayak89:${process.env.MONGODB_PASS}@cluster0.j30tcpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
       console.log("Database Connected Successfully")
    }catch(err){
        console.log(err)
    }
}

dbConnect()
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use('/api',router)
app.use('/api',router1)

app.listen(8000,()=>{
    console.log("server is running on the port 8000")
})