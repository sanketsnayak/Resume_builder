import express from "express"
import mongoose from "mongoose"
import NewResume from "../models/NewResume.js"
import UserPersonalDetails from "../models/UserPersonalDetails.js"
import UserSummary from "../models/UserSummary.js"
const router=express.Router()

router.post('/CreateResume',async(req,res)=>{
    const{userId,title}=req.body
    if(userId){
        const resume=await NewResume.create({
            createdBy:userId,
            title:title
        })
        res.json({success:true,message:"New Resume Created successfully",resumeId:resume._id})
    }else{
        res.json({success:false,message:"Project not created successfully"})
    }
})

router.post('/ListResumes',async(req,res)=>{
    const{userId}=req.body;
    const id=await NewResume.findOne({createdBy:userId})
    if(id){
        const resumes=await NewResume.find({createdBy:userId})
        res.json({success:true,message:"successfully extracted resumes",resumes:resumes})
    }else{
        res.json({success:false,message:"No projects found"})
    }
})

router.post('/personalDetails',async(req,res)=>{
    const{userId,ResumeID,firstName,lastName,jobTitle,address,phone,email,themeColor}=req.body;
    const Resume=await NewResume.findOne({_id:ResumeID})
    if(Resume){
        const personalRes=await UserPersonalDetails.findOne({ResumeID:ResumeID})
        if(personalRes){
        const personalDetails=await UserPersonalDetails.findOneAndUpdate({ResumeID:ResumeID, UserId:userId,},{
            firstName:firstName,
            lastName:lastName,
            jobTitle:jobTitle,
            address:address,
            phone:phone,
            email:email,
            themeColor:themeColor
        })}else{
            const newPersonal=await UserPersonalDetails.create({
                ResumeID:ResumeID,
                UserId:userId,
                firstName:firstName,
                lastName:lastName,
                jobTitle:jobTitle,
                address:address,
                phone:phone,
                email:email,
                themeColor:themeColor
            })
        }
        res.json({success:true,message:"Personal datails filled successfully"})
    }else{
        res.json({success:false,message:"personal detailes not stored in the database"})
    }
})

router.post('/getPersonalDetails',async(req,res)=>{
    const {userId,ResumeID}=req.body;
    const user=await UserPersonalDetails.findOne({UserId:userId})
    if(user){
        const personalDetails=await UserPersonalDetails.findOne({ResumeID:ResumeID})
        res.json({success:true,message:"personal details sent successfully",personalDetails:personalDetails})
    }else{
        res.json({success:false,message:"personal details not recieved"})
    }
})

router.post('/addSummary',async(req,res)=>{
    const {userId,ResumeID,Summary}=req.body
    const user=await NewResume.findOne({_id:ResumeID})
    if(user){
        const ressum=await UserSummary.findOne({ResumeID:ResumeID})
        if(ressum){
            const oldSummary=await UserSummary.findOneAndUpdate({userId:userId,ResumeID:ResumeID},{
                summery:Summary
            })
        }else{
            const newSummary=await UserSummary.create({
                userId:userId,
                ResumeID:ResumeID,
                summery:Summary
            })
        }
        res.json({success:true,message:"summary updated sucessfull"})
    }else{
        res.json({sucess:false,message:"summary not updated"})
    }
})

router.post('/getSummary',async(req,res)=>{
    const {userId,ResumeID}=req.body
    const user=await UserSummary.findOne({userId:userId})
    if(user){
        const summa=await UserSummary.findOne({ResumeID:ResumeID})
        res.json({success:true,message:"summary fetched successfully",summary:summa})
    }else{
        res.json({success:false,message:"Summary not fetched successfully"})
    }
})
export default router