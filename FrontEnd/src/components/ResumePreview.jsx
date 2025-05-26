import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetails from './ResumePreview/PersonalDetails'
import Summary from './ResumePreview/Summary'
import ProfessionalExperience from './ResumePreview/ProfessionalExperience'
import Education from './ResumePreview/Education'
import Skills from './ResumePreview/Skills'
function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
   
    <div  className='shadow-lg border-t-[20px] h-full p-12' style={{borderColor:resumeInfo?.themeColor}}>
        <PersonalDetails resumeInfo={resumeInfo}/>
        <Summary resumeInfo={resumeInfo}/>
        <ProfessionalExperience resumeInfo={resumeInfo}/>
        <Education resumeInfo={resumeInfo}/>
        <Skills resumeInfo={resumeInfo}/>
    </div>
    
    
  )
}

export default ResumePreview