import React, { useContext,useEffect,useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

function Summary() {
    const [summary,setSummary]=useState("")
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        summery:summary
      })

    }, [summary])
    
  return (
    <div>
        <h2 className='font-bold'>Personal Details</h2>
        <p className='font-normal text-xs'>Get Started with basic information</p>
        <form >
            <div className='flex justify-between items-center mt-7'>
                <h2 className='text-sm font-bold'>Add Summary</h2>
                <Button variant="outline">Generate from AI</Button>
            </div>
            <Textarea onChange={(e)=>setSummary(e.target.value)} className="mt-5"/>
            <div className='flex justify-end mt-4'>
            <Button type="submit">Save</Button>
            </div>
        </form>
    </div>
  )
}

export default Summary