import mongoose from "mongoose"



const NewResumeSchema=new mongoose.Schema({
    title:String,
    createdBy:String
})

const NewResume=mongoose.model('NewResume',NewResumeSchema)

export default NewResume