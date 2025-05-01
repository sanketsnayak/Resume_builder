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

const UserPersonalDetailsSchema=new mongoose.Schema({
    UserId:String,
    ResumeID:String,
    firstName:String,
    lastName:String,
    jobTitle:String,
    address:String,
    phone:String,
    email:String,
    themeColor:{
        type:String,
        default:"#ff6666"
    }

})

const UserPersonalDetails= mongoose.model('UserPersonalDetails',UserPersonalDetailsSchema)

export default UserPersonalDetails