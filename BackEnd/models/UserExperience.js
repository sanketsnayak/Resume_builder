import mongoose from "mongoose";

const ExperienceSchema=new mongoose.Schema({
    title:String,
    companyName:String,
    city:String,
    state:String,
    startDate:String,
    endDate:String,
    workSummery:String
})

const UserExperienceSchema=new mongoose.Schema({
    userId:String,
    ResumeID:String,
    Experience:[ExperienceSchema]
})

const UserExperience=mongoose.model('UserExperience',UserExperienceSchema)

export default UserExperience