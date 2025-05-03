import React, { useState } from 'react'
import { Input } from '../ui/input'
import RichTextEditor from '../RichTextEditor'
function ProfessionalExperience() {
  const formfield={
            
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummery:''
  }
   const [experienceList,setExperienceList]=useState([
    formfield
   ])
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
                <Input name="title"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>Company Name</label>
                <Input name="companyName"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>City</label>
                <Input name="city"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>State</label>
                <Input name="state"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>Start Date</label>
                <Input type="date" name="startDate"></Input>
              </div>
              <div>
                <label className='text-sm font-medium'>End Date</label>
                <Input type="date" name="endDate"></Input>
              </div>
              <div className='col-span-2'>
                <RichTextEditor/>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProfessionalExperience