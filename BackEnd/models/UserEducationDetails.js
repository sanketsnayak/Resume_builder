import mongoose from "mongoose";

const EducationListSchema=new mongoose.Schema({
            universityName:String,
            startDate:Date,
            endDate:Date,
            degree:String,
            major:String,
            description:String

})

const UserEducationDetailsSchema=new mongoose.Schema({
    userId:String,
    ResumeId:String,
    Education:[EducationListSchema]
})

const UserEducationDetails=mongoose.model('UserEducationDetails',UserEducationDetailsSchema)

export default UserEducationDetails