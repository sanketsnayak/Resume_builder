import React, { useContext } from 'react'
import { Input } from '../ui/input'
import { useState, useEffect } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { toast } from "sonner"
function Education() {
    const [educationList,setEducationList]=useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }
    ])
    const {user}=useUser()
    const {id}=useParams()
    const [loading,setLoading]=useState(false)
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const AddEducation=()=>{
        setEducationList([
            ...educationList,
            {
                universityName:'',
                degree:'',
                major:'',
                startDate:'',
                endDate:'',
                description:''
            }
        ])
    }

    const RemoveEducation=()=>{
        setEducationList((prev)=>prev.slice(0,-1))
    }

    const handleEvent=(index,event)=>{
        const {name,value}=event.target
        const newEntries=educationList.slice()
        newEntries[index][name]=value
        console.log(newEntries)
        setEducationList(newEntries)
    }

    const onsave=async()=>{
        setLoading(true)
        try{
           await fetch('http://localhost:8000/api/addEducation',{
                mode:"cors",
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    userId:user.id,
                    ResumeID:id,
                    Education:educationList
                })
           }).then(res=>res.json()).then(data=>{
             if(data.success){
                console.log(data.message)
             }
           })
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
            toast("Education updated Successfully")
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
                setResumeInfo({
                    ...resumeInfo,
                    Education:data.education.Education
                })
                setEducationList(data.education.Education)
            }
        })
    }

    useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        Education:educationList
      })
    }, [educationList])

    useEffect(() => {
      getEducation()
    }, [])
    
  return (
    <div>
        <h2 className='font-bold'>Education</h2>
        <p className='font-normal text-xs'>Add Your Education</p>
        {
            educationList.map((item,index)=>(
                <div className='border rounded p-5 mt-3' key={index}>
                    <div className='grid grid-cols-2 gap-x-6 gap-y-3'>
                        <div>
                            <label className='text-sm font-medium'>University Name</label>
                            <Input name="universityName" value={item.universityName} onChange={(event)=>handleEvent(index,event)}></Input>
                        </div>
                        <div>
                            <label className='text-sm font-medium'>Degree</label>
                            <Input name="degree" value={item.degree} onChange={(event)=>handleEvent(index,event)}></Input>
                        </div>
                        <div>
                            <label className='text-sm font-medium'>Major</label>
                            <Input name="major" value={item.major} onChange={(event)=>handleEvent(index,event)}></Input>
                        </div>
                        <div>
                            <label className='text-sm font-medium'>Start Date</label>
                            <Input type="date" name="startDate" value={item.startDate} onChange={(event)=>handleEvent(index,event)}></Input>
                        </div>
                        <div>
                            <label className='text-sm font-medium'>End Date</label>
                            <Input type="date"  name="endDate" value={item.endDate} onChange={(event)=>handleEvent(index,event)}></Input>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm font-medium'>Description</label>
                            <Textarea name="description" value={item.description} onChange={(event)=>handleEvent(index,event)}></Textarea>
                        </div>
                    </div>
                    
                </div>
            ))
        }
        <div className='flex justify-between mt-3'>
                <div className='flex gap-3'>
                <Button onClick={AddEducation} variant="outline">+ Add Education</Button>
                <Button onClick={RemoveEducation} variant="outline">- Remove</Button>
                </div>
                <div>
                    <Button onClick={onsave}>{loading?(<div className="col-span-3 flex items-center justify-center">
                                                            <Oval height={40} width={40} color="white" ariaLabel="loading" />
                                                          </div>):"Save"}</Button>
                </div>
        </div>
    </div>
  )
}

export default Education