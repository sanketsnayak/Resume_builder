import React, { useContext, useEffect } from 'react'
import { Button } from '../ui/button'
import ResumePreview from '../ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import Navbar from '../Navbar'
import { useUser } from '@clerk/clerk-react'

import { useParams } from 'react-router-dom'


function Download() {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  const {user}=useUser()
  const {id}=useParams()
  
  
   const handlePrint = ()=>{
      window.print()
   }


  const getSummary=async()=>{
      try{
        await fetch('http://localhost:8000/api/getSummary',{
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
              ...data.summary
            }))
            
          }
        })
      }catch(err){
        console.log(err)
      }
    }

    const getPersonalDetails=async()=>{
        try{
            await fetch('http://localhost:8000/api/getPersonalDetails',{
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
                        ...data.personalDetails
                      }));
                      
                      
                    }
            })
        }catch(err){
            console.log(err)
        }
    }

     const getEducation=async()=>{
        await fetch('http://localhost:8000/api/getEducation',{
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
                    Education: data.education.Education
                }))
                
            }
        })
    }

    const getExperience=async()=>{
      await fetch('http://localhost:8000/api/getExperience',{
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
                Experience: data.experience.Experience
          }))
          
        }
      })
   }

   const getSkills=async()=>{
    await fetch('http://localhost:8000/api/getSkills',{
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
            skills:data.Skills.skills
        }))
        
      }
    })
  }

    useEffect(() => {
      getSummary()
      getPersonalDetails()
      getEducation()
      getExperience()
      getSkills()
    }, [])
    
    
  return (
  <>
    < div className='main-download-wrapper'>
    <div class="no-print">
    <Navbar/>
    </div>
    <div className='flex flex-col justify-center items-center'>
    <div class="no-print">
      
    <div  className='shadow-lg border-t-4 rounded-lg border-purple-600 mt-6 p-5 h-fit w-[50vw]'>
        <h2 className='font-bold'>Resume Dowload</h2>
        <p className='font-normal text-xs'>Your resume is ready to download!</p>
        <div className='flex justify-between mt-6'>
            <Button variant="outline" onClick={handlePrint}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>Download</Button>
            <Button variant="outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>Share</Button>
        </div>
        
    </div>
    </div>
    <div  id='print-area' className=' resume-preview-wrapper'>
          <ResumePreview />
        </div>
    </div>
    </div>
    </>
  )
}

export default Download