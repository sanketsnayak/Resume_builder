import mongoose from "mongoose";

const EducationListSchema=new mongoose.Schema({
            universityName:String,
            startDate:String,
            endDate:String,
            degree:String,
            major:String,
            description:String

})

const UserEducationDetailsSchema=new mongoose.Schema({
    userId:String,
    ResumeID:String,
    Education:[EducationListSchema]
})

const UserEducationDetails=mongoose.model('UserEducationDetails',UserEducationDetailsSchema)

export default UserEducationDetails