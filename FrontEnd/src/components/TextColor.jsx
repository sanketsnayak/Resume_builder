import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'

function TextColor() {
    const colors=[
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const {user}=useUser()
    const {id}=useParams()
    const [colo,setColo]=useState("#FF5733")
    const setColor=(item)=>{
        setResumeInfo(prev => ({
  ...prev,
  themeColor: item || prev.themeColor || "#FF5733"
}));
    }

    const handleColor=async(item)=>{
        await fetch('http://localhost:8000/api/personalDetails',{
            mode:"cors",
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                userId:user.id,
                ResumeID:id,
                themeColor:item
            })
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                console.log(data.message)
            }
        })
    }

    const getThemeColor=async()=>{
        await fetch('http://localhost:8000/api/getPersonalDetails',{
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
            if (data.success && data.personalDetails && data.personalDetails.themeColor) {
        setColo(data.personalDetails.themeColor);
    } else {
        setColo("#FF5733"); // fallback color
    }
        })
    }

    useEffect(() => {
        getThemeColor()
  if (!resumeInfo) return; 
  setResumeInfo(prev => ({
    ...prev,
    themeColor: colo || prev?.themeColor || "#FF5733"
  }))
}, [colo])
    

  return (
    <div>
        <Popover>
  <PopoverTrigger><Button variant="ghost" className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid-icon lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>Theme</Button></PopoverTrigger>
  <PopoverContent>
    <h1 className='text-sm mb-3 font-medium'>Select the Theme Color</h1>
    <div className='grid grid-cols-4 gap-2'>
        
    {colors.map((item,index)=>(
        <div key={index} className='h-5 w-5 rounded-full  border-[0.5px] border-neutral-400 hover:cursor-pointer hover:border-[0.5px] hover:border-black'  style={{background:item}} onClick={()=>{setColor(item);handleColor(item)}}></div>
    ))}
    </div>
  </PopoverContent>
</Popover>
    </div>
  )
}

export default TextColor