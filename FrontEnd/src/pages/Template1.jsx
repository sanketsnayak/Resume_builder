import React from 'react'
import  { useContext } from 'react'
import ResumePreview1 from '@/components/ResumePreview1'
import FromSection from '@/components/FromSection'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Toaster } from "@/components/ui/sonner"
import Dummy from '@/data/Dummy'
import { useEffect } from 'react'

function Template1() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    useEffect(() => {
        setResumeInfo(Dummy)
      }, [])
  return (
    <div className='grid grid-cols-2 p-10 gap-10 pt-20'>
        <FromSection />
        
        <ResumePreview1/>
        
        <Toaster/>
    </div>
  )
}

export default Template1