import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import PersonalDetails1 from './Template1/PersonalDetails1'
import Summary1 from './Template1/Summary1'
import ProfessionalExperience1 from './Template1/ProfessionalExperience1'
import Education1 from './Template1/Education1'
import Skills1 from './Template1/Skills1'
import React from 'react'
import { useContext } from 'react'
function ResumePreview1() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div  className='shadow-lg  h-full p-12' style={{borderColor:resumeInfo?.themeColor}}>
        <PersonalDetails1 resumeInfo={resumeInfo}/>
        <Summary1 resumeInfo={resumeInfo}/>
        <ProfessionalExperience1 resumeInfo={resumeInfo}/>
        <Education1 resumeInfo={resumeInfo}/>
        <Skills1 resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview1