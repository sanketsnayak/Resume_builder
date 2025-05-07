import React from 'react'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
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
                            <Input name="universityName"></Input>
                        </div>
                        <div>
                            <label className='text-sm font-medium'>Degree</label>
                            <Input name="degree"></Input>
                        </div>
                        <div>
                            <label className='text-sm font-medium'>Major</label>
                            <Input name="major"></Input>
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
                            <label className='text-sm font-medium'>Description</label>
                            <Textarea name="description"></Textarea>
                        </div>
                    </div>
                    <div className='flex justify-end mt-3'>
                        <Button>Save</Button>
                    </div>
                </div>
            ))
        }
        <div className='flex justify-between mt-3'>
                <div className='flex gap-3'>
                <Button onClick={AddEducation} variant="outline">+ Add Education</Button>
                <Button onClick={RemoveEducation} variant="outline">- Remove</Button>
                </div>
                
              </div>
    </div>
  )
}

export default Education