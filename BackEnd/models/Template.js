import mongoose from "mongoose"

const TemplateSchema=new mongoose.Schema({
    userId:String,
    ResumeID:String,
    Template:String
})

const Template=mongoose.model('Template',TemplateSchema);

export default Template