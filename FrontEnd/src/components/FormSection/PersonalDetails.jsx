import React, { useContext, useState,useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { toast } from "sonner"


function PersonalDetails({enableNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const {user}=useUser()
    const {id}=useParams()
    const [loading,setLoading]=useState(false)
    const [personal,setPersonal]=useState({
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
        themeColor: ""
    })
    
    const onsave=async(e)=>{
        e.preventDefault();
        setLoading(true)
        toast("Resume has been updated.")

        
        enableNext(true)
        try{
            await fetch('https://resume-builder-backend-nr5i.onrender.com/api/personalDetails',{
                method:'POST',
                mode:"cors",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body:JSON.stringify({
                        userId:user.id,
                        ResumeID:id,
                        firstName:resumeInfo.firstName,
                        lastName:resumeInfo.lastName,
                        jobTitle:resumeInfo.jobTitle,
                        address:resumeInfo.address,
                        phone:resumeInfo.phone,
                        email:resumeInfo.email,
                        themeColor:resumeInfo.themeColor
                  })

            }).then(res=>res.json()).then((data)=>{
                if(data.success){
                    console.log(data.message)
                }
            })
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    const handleEvent=(e)=>{
        const {name,value}=e.target;
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
        setPersonal({
            ...personal,
            [name]:value
        })
        enableNext(false)}
    
    const getPersonalDetails=async()=>{
        try{
            await fetch('https://resume-builder-backend-nr5i.onrender.com/api/getPersonalDetails',{
                mode:'cors',
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify({
                    userId:user.id,
                    ResumeID:id
                })
            }).then(res=>res.json()).then((data)=>{
                if(data.success){
                    setResumeInfo(prev => ({
      ...prev,
      firstName: data.personalDetails?.firstName ?? prev.firstName ?? "",
      lastName: data.personalDetails?.lastName ?? prev.lastName ?? "",
      jobTitle: data.personalDetails?.jobTitle ?? prev.jobTitle ?? "",
      address: data.personalDetails?.address ?? prev.address ?? "",
      phone: data.personalDetails?.phone ?? prev.phone ?? "",
      email: data.personalDetails?.email ?? prev.email ?? "",
      Education: prev.Education || [],
      Experience: prev.Experience || [],
      skills: prev.skills || [],
      summary: prev.summary || "",
      themeColor: data.personalDetails?.themeColor || prev.themeColor || "#FF5733"
    }));
    setPersonal({
      firstName: data.personalDetails?.firstName ?? "",
      lastName: data.personalDetails?.lastName ?? "",
      jobTitle: data.personalDetails?.jobTitle ?? "",
      address: data.personalDetails?.address ?? "",
      phone: data.personalDetails?.phone ?? "",
      email: data.personalDetails?.email ?? "",
      themeColor: data.personalDetails?.themeColor ?? "#FF5733"
    });
                      enableNext(true)
                      
                    }
            })
        }catch(err){
            console.log(err)
        }
    }

    const getSummary=async()=>{
      try{
        await fetch('https://resume-builder-backend-nr5i.onrender.com/api/getSummary',{
            mode:"cors",
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              userId:user.id,
              ResumeID:id,
            })
        }).then(res=>res.json()).then((data)=>{
          if(data.success){
          
           setResumeInfo(prev=>({
              ...prev,
              ...data.summary || prev.summary
            }))
            enableNext(true)
          }
        })
      }catch(err){
        console.log(err)
      }
    }

     const getEducation=async()=>{
        await fetch('https://resume-builder-backend-nr5i.onrender.com/api/getEducation',{
            mode:"cors",
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                userId:user.id,
                ResumeID:id
            })
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                setResumeInfo(prev => ({
    ...prev,
    Education: data.education?.Education || prev.Education || []
}))
                
            }
        })
    }

    const getExperience=async()=>{
      await fetch('https://resume-builder-backend-nr5i.onrender.com/api/getExperience',{
        mode:"cors",
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
          userId:user.id,
          ResumeID:id
        })
      }).then(res=>res.json()).then(data=>{
        if(data.success){
          setResumeInfo(prev => ({
    ...prev,
    Experience: data.experience?.Experience || prev.Experience || []
}))
          
        }
      })
   }

   const getSkills=async()=>{
    await fetch('https://resume-builder-backend-nr5i.onrender.com/api/getSkills',{
      mode:"cors",
      method:"POST",
      headers: {
          "Content-Type": "application/json",
      },
      body:JSON.stringify({
        userId:user.id,
        ResumeID:id
      })
    }).then(res=>res.json()).then(data=>{
      if(data.success){
        setResumeInfo(prev => ({
    ...prev,
    skills: (data.Skills && data.Skills.skills) ? data.Skills.skills : (prev.skills || [])
}))
        
      }
    })
  }
    

   

    useEffect(() => {
      getPersonalDetails()
      getSummary()
      getEducation()
      getExperience()
      getSkills()
      
    }, [])

    
    
  return (
    <div>
        <h2 className='font-bold'>Personal Details</h2>
        <p className='font-normal text-xs'>Get Started with basic information</p>
        <form onSubmit={onsave}>
        <div className='grid grid-cols-2 my-3 gap-3'>
            <div className='flex flex-col gap-1'>
                <label className='text-xs'>First Name</label>
                <Input name='firstName' value={personal.firstName }   onChange={handleEvent}  required></Input>
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-xs'>Last Name</label>
                <Input name='lastName' value={personal.lastName}  onChange={handleEvent} required></Input>
            </div>
            <div className='flex flex-col gap-1 col-span-2'>
                <label className='text-xs'>Job Title</label>
                <Input name='jobTitle' value={personal.jobTitle}  onChange={handleEvent} required></Input>
            </div>
            <div className='flex flex-col gap-1 col-span-2'>
                <label className='text-xs'>Address</label>
                <Input name='address' value={personal.address} onChange={handleEvent} required></Input>
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-xs'>Phone</label>
                <Input name='phone' value={personal.phone}  onChange={handleEvent} required></Input>
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-xs'>Email</label>
                <Input name='email' value={personal.email} onChange={handleEvent} required></Input>
            </div>
            <div className='flex justify-end col-span-2'>
                <Button type='submit'  className="size-fit">{loading?(<div className="col-span-3 flex items-center justify-center">
                      <Oval height={40} width={40} color="white" ariaLabel="loading" />
                    </div>):"Save"}</Button>
            </div>
        </div>
        </form>
    </div>
  )
}


export default PersonalDetails