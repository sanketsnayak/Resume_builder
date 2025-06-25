import React, { useContext, useState, useEffect} from 'react'
import { Input } from '../ui/input'
import RichTextEditor from '../RichTextEditor'
import { Button } from '../ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { toast } from "sonner"
function ProfessionalExperience({enableNext}) {
  const formfield={
            
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummery:''
  }
  const {user}=useUser()
  const {id}=useParams()
  const [experienceList,setExperienceList]=useState([
    formfield
   ])
   const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
   const [loading,setLoading]=useState(false)
   const addNewExperience=()=>{
    setExperienceList((prev)=>[...prev,formfield])
   }

   const removeExperience=()=>{
    setExperienceList(prev=>prev.slice(0,-1))
   }

   

   const handleEvent=(event,index)=>{
      const newEntries=experienceList.slice();
      const {name,value}=event.target
      newEntries[index][name]=value
      console.log(newEntries)
      setExperienceList(newEntries)
   }
   const handleRichText=(event,name,index)=>{
    const newEntries=experienceList.slice()
    newEntries[index][name]=event.target.value
    setExperienceList(newEntries)
   }

   const onsave=async()=>{
    setLoading(true)
    enableNext(true)
      try{
        await fetch('https://resume-builder-backend-nr5i.onrender.com/api/addExperience',{
          mode:"cors",
          method:"POST",
          headers: {
              "Content-Type": "application/json",
          },
          body:JSON.stringify({
              userId:user.id,
              ResumeID:id,
              Experience:experienceList
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
        toast("Experience Updated successfully")
      }
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
          setResumeInfo({
            ...resumeInfo,
            Experience:data.experience.Experience
          })
          setExperienceList(data.experience.Experience)
        }
      })
   }

   useEffect(() => {
     setResumeInfo({
      ...resumeInfo,
      Experience:experienceList
     })
   }, [experienceList])

   useEffect(() => {
     getExperience()
   }, [])
   
   
  return (
    <div>
      <h2 className='font-bold'>Professional Experience</h2>
      <p className='font-normal text-xs'>Add Your previous Job experience</p>
      {
        experienceList.map((item,index)=>(
          <div className='border rounded p-5 mt-3' key={index}>
            <div className='grid grid-cols-2 gap-x-6 gap-y-3'>
              <div>
                <label className='text-sm font-medium'>Position Title</label>
                <Input onChange={(event)=>handleEvent(event,index)} defaultValue={item.title} name="title"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>Company Name</label>
                <Input onChange={(event)=>handleEvent(event,index)} defaultValue={item.companyName}  name="companyName"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>City</label>
                <Input onChange={(event)=>handleEvent(event,index)} defaultValue={item.city}  name="city"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>State</label>
                <Input onChange={(event)=>handleEvent(event,index)} defaultValue={item.state}  name="state"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>Start Date</label>
                <Input onChange={(event)=>handleEvent(event,index)}  defaultValue={item.startDate} type="date" name="startDate"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>End Date</label>
                <Input onChange={(event)=>handleEvent(event,index)} defaultValue={item.endDate} type="date" name="endDate"></Input>
              </div>
              <div className='col-span-2'>
                <RichTextEditor Value={item.workSummery} onRichTextEditorChange={(event)=>handleRichText(event,"workSummery",index)} index={index}/>
              </div>
            </div>
            
          </div>
        ))
      }
      <div className='flex justify-between mt-3'>
        <div className='flex gap-3'>
        <Button onClick={addNewExperience} variant="outline">+ Add Experience</Button>
        <Button onClick={removeExperience} variant="outline">- Remove</Button>
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

export default ProfessionalExperience