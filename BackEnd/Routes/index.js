import express from "express"
import mongoose from "mongoose"
import NewResume from "../models/NewResume.js"
import UserPersonalDetails from "../models/UserPersonalDetails.js"
import UserSummary from "../models/UserSummary.js"
import UserSkillsDetails from "../models/UserSkillsDetails.js"
import UserEducationDetails from "../models/UserEducationDetails.js"
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

router.post('/addSkills',async(req,res)=>{
    const {userId,ResumeID,Skills}=req.body
    const user= await NewResume.findOne({_id:ResumeID})
    if(user){
        const ressum= await UserSkillsDetails.findOne({ResumeID:ResumeID})
        if(ressum){
            const oldSkills=await UserSkillsDetails.findOneAndUpdate({userId:userId,ResumeID:ResumeID},{
                skills:Skills
            })
        }else{
            const newSkills=await UserSkillsDetails.create({
                userId:userId,
                ResumeID:ResumeID,
                skills:Skills
            })
        }
        res.json({success:true,message:"Skills added successfully"})
    }else{
        res.json({success:false,message:"Skills not added successfully"})
    }
})

router.post('/getSkills',async(req,res)=>{
    const {userId,ResumeID}=req.body
    const user=await UserSkillsDetails.findOne({userId:userId})
    if(user){
        const skillsList=await UserSkillsDetails.findOne({ResumeID:ResumeID})
        res.json({success:true,message:"skills fetched successfully",Skills:skillsList})
    }
    else{
        res.json({success:false,message:"SKills not fetched sucessfully"})
    }
})

router.post('/addEducation',async(req,res)=>{
    const {userId,ResumeID,Education}=req.body
    const user=await NewResume.findOne({_id:ResumeID})
    if(user){
        const ressum=await UserEducationDetails.findOne({ResumeID:ResumeID})
        if(ressum){
            const oldEducation=await UserEducationDetails.findOneAndUpdate({userId:userId,ResumeID:ResumeID},{
                Education:Education
            })
        }
        else{
            const newEducation=await UserEducationDetails.create({
                userId:userId,
                ResumeID:ResumeID,
                Education:Education
            })
        }
        res.json({success:true,message:"education added successfully"})
    }else{
        res.json({success:false,message:"education not added to the database"})
    }
})
export default router