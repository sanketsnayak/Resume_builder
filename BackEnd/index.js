import express from "express"
import router from "./Routes/index.js"
import cors from "cors"
const app=express()
app.use(express.json())
app.use(cors())
app.use('/api',router)

app.listen(8000,()=>{
    console.log("server is running on the port 8000")
})