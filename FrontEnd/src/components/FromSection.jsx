import React, { useState } from 'react'
import { Button } from './ui/button'
import PersonalDetails from './FormSection/PersonalDetails'
import Summary from './FormSection/Summary'
import ProfessionalExperience from './FormSection/ProfessionalExperience'
import Education from './FormSection/Education'
import Skills from './FormSection/Skills'
import TextColor from './TextColor'
import Download from './FormSection/Download'
function FromSection() {
  const [formIndex,setFormIndex]=useState(1)
  const [enableNext,setEnableNext]=useState(false)
  
  return (
    <div>
      <div className='flex justify-between'>
        <TextColor/>
        <div className='flex gap-2'>
          {
            formIndex>1?(<Button onClick={()=>setFormIndex(formIndex-1)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></Button>):""
          }
          <Button disabled={!enableNext} onClick={()=>setFormIndex(formIndex+1)} className="flex gap-2">Next<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></Button>
        </div>
      </div>
      <div className='shadow-lg border-t-4 rounded-lg border-purple-600 mt-6 p-5'>
        {formIndex==1?
        <PersonalDetails enableNext={(e)=>setEnableNext(e)}/>:null
      }
      {
        formIndex==2?<Summary enableNext={(e)=>setEnableNext(e)}/>:null
      }
      {
        formIndex==3?<ProfessionalExperience enableNext={(e)=>setEnableNext(e)}/>:null
      }
      {
        formIndex==4?<Education enableNext={(e)=>setEnableNext(e)}/>:null
      }
      {
        formIndex==5?<Skills enableNext={(e)=>setEnableNext(e)}/>:null
      }
      {
        formIndex==6?<Download  />:null
      }
      
      </div>
    </div>
  )
}

export default FromSection
