import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Input } from '../ui/input';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '../ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'
function Skills() {
  const [skillsList,setSkillsList]=useState([
    {
      name:'',
      rating:0
    }
  ]);
  const {user}=useUser()
  const {id}=useParams()
  const [loading,setLoading]=useState(false)
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  const AddSkill=()=>{
    setSkillsList([
      ...skillsList,
      {
        name:'',
        rating:0
      }
    ])
  }
  
  const RemoveSkill=()=>{
    setSkillsList(prev=>prev.slice(0,-1))
  }

  const handleEvent=(index,name,value)=>{
      
      const newEntries=skillsList.slice()
      newEntries[index][name]=value
      setSkillsList(newEntries)
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills:skillsList
    })
  }, [skillsList])

  const onsave=async()=>{
      setLoading(true)
      try{
        await fetch('http://localhost:8000/api/addSkills',{
          mode:"cors",
          method:"POST",
          headers: {
              "Content-Type": "application/json",
          },
          body:JSON.stringify({
            userId:user.id,
            ResumeID:id,
            Skills:skillsList
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
      }
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
        setResumeInfo({
          ...resumeInfo,
          skills:data.Skills.skills
        })
        setSkillsList(data.Skills.skills)
      }
    })
  }

  useEffect(() => {
    getSkills()
  }, [])
  
  
  return (
    <div>
      <h2 className='font-bold'>Skills</h2>
      <p className='font-normal text-xs'>Add your top professional Skills</p>
      {
        skillsList.map((skill,index)=>(
          <div key={index}> 
              <div className='flex justify-between items-center border rounded p-3 my-2'>
                <div >
                  <label className='text-sm font-medium'>Name</label>
                  <Input onChange={(event)=>handleEvent(index,'name',event.target.value)} value={skill.name} className="w-full" required></Input>
                </div>
                <Rating style={{ maxWidth: 120 }} value={skill.rating} onChange={(value)=>handleEvent(index,'rating',value)} />
              </div>
          </div>
        ))
      }
      <div className='flex justify-between mt-3'>
                <div className='flex gap-3'>
                <Button onClick={AddSkill} variant="outline">+ Add Skill</Button>
                <Button onClick={RemoveSkill} variant="outline">- Remove</Button>
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

export default Skills