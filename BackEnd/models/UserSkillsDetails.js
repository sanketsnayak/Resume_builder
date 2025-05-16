import mongoose from  "mongoose"

const skillsSchema= new mongoose.Schema({
    name:String,
    rating:Number
})

const UserSkillsDetailsSchema=new mongoose.Schema({
    userId:String,
    ResumeID:String,
    skills:[skillsSchema]
})

const UserSkillsDetails= mongoose.model("UserSkillsDetails",UserSkillsDetailsSchema)

export default UserSkillsDetails