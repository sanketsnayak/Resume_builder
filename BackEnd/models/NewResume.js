import mongoose from "mongoose"

const dbConnect=async()=>{
    try{
       await mongoose.connect('mongodb+srv://sanketsnayak89:9rwKkNk7eCV3A4IC@cluster0.j30tcpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
       console.log("Database Connected Successfully")
    }catch(err){
        console.log(err)
    }
}

dbConnect()

const NewResumeSchema=new mongoose.Schema({
    title:String,
    createdBy:String
})

const NewResume=mongoose.model('NewResume',NewResumeSchema)

export default NewResume