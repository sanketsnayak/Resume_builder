import React, { useState } from 'react'
import { Button } from './ui/button'
import PersonalDetails from './FormSection/PersonalDetails'
import Summary from './FormSection/Summary'
import ProfessionalExperience from './FormSection/ProfessionalExperience'
function FromSection() {
  const [formIndex,setFormIndex]=useState(1)
  const [enableNext,setEnableNext]=useState(false)
  return (
    <div>
      <div className='flex justify-between'>
        <Button variant="ghost" className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid-icon lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>Theme</Button>
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
        formIndex==3?<ProfessionalExperience />:null
      }
      </div>
    </div>
  )
}

export default FromSection
