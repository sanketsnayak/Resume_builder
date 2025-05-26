import React from 'react'
import ResumePreview from '@/components/ResumePreview'
import FromSection from '@/components/FromSection'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Toaster } from "@/components/ui/sonner"
import Dummy from '@/data/Dummy'
import { useState,useEffect } from 'react'
function Resume() {
  const [resumeInfo,setResumeInfo]=useState()
 
  useEffect(() => {
    setResumeInfo(Dummy)
  }, [])
  
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-2 p-10 gap-10'>
        <FromSection />
        
        <ResumePreview/>
        
        <Toaster/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default Resume