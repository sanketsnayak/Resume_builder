import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Input } from '../ui/input';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '../ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
function Skills() {
  const [skillsList,setSkillsList]=useState([
    {
      name:'',
      rating:0
    }
  ]);
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
                  <Input onChange={(event)=>handleEvent(index,'name',event.target.value)} className="w-full"></Input>
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
                
        </div>
    </div>
  )
}

export default Skills