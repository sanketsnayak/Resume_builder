import React, { useContext } from 'react'
import ResumePreview from '@/components/ResumePreview'
import FromSection from '@/components/FromSection'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Toaster } from "@/components/ui/sonner"
import Dummy from '@/data/Dummy'
import { useEffect } from 'react'
function Resume() {
 const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
 
  useEffect(() => {
    setResumeInfo(Dummy)
  }, [])
  
  return (
    
    <div className='grid grid-cols-2 p-10 gap-10'>
        <FromSection />
        
        <ResumePreview/>
        
        <Toaster/>
    </div>
    
  )
}

export default Resume