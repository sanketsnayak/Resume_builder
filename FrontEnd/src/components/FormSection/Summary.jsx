import React, { useContext,useEffect,useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import { toast } from "sonner"


function Summary({enableNext}) {
    const [summary,setSummary]=useState("")
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const {user}=useUser()
    const {id}=useParams()
    const [loading,setLoading]=useState(false)

    useEffect(() => {
      enableNext(false)
      setResumeInfo({
        ...resumeInfo,
        summery:summary
      })

    }, [summary])

    const onSave=(e)=>{
        e.preventDefault()
        enableNext(true)
        setLoading(true)
        try{
          fetch('http://localhost:8000/api/addSummary',{
            mode:"cors",
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              userId:user.id,
              ResumeID:id,
              Summary:summary
            })
          }).then(res=>res.json()).then((data)=>{
            if(data.success){
              console.log(data.message)
            }
            toast("Summary updated sucessfully")
          })
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
    }

    const getSummary=()=>{
      try{
        fetch('http://localhost:8000/api/getSummary',{
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
    useEffect(() => {
      getSummary()
    }, [])
    
    
  return (
    <div>
        <h2 className='font-bold'>Personal Details</h2>
        <p className='font-normal text-xs'>Get Started with basic information</p>
        <form onSubmit={onSave}>
            <div className='flex justify-between items-center mt-7'>
                <h2 className='text-sm font-bold'>Add Summary</h2>
                <Button variant="outline" className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>Generate from AI</Button>
            </div>
            <Textarea onChange={(e)=>setSummary(e.target.value)} className="mt-5"/>
            <div className='flex justify-end mt-3'>
              <Button type='submit'  className="size-fit">{loading?(<div className="col-span-3 flex items-center justify-center">
                  <Oval height={40} width={40} color="white" ariaLabel="loading" />
                                </div>):"Save"}</Button>
            </div>
        </form>
    </div>
  )
}

export default Summary