import mongoose from "mongoose"

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