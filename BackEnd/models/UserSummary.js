import mongoose from "mongoose"

const UserSummarySchema=new mongoose.Schema({
    userId:String,
    ResumeID:String,
    summery:String
})

const UserSummary=mongoose.model('UserSummary',UserSummarySchema)

export default UserSummary