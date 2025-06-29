import React from 'react'

function ProfessionalExperience1({resumeInfo}) {
  if (!resumeInfo?.Experience || !Array.isArray(resumeInfo.Experience)) {
    return null 
  }
  return (
    <div className='my-4'>
        <h2 className=' font-bold text-sm mt-4 mb-1' style={{color:resumeInfo?.themeColor}}>Professional Experience</h2>
        <hr className='border-[] ' style={{borderColor:resumeInfo?.themeColor}}/>
        {
            resumeInfo?.Experience.map((experience,index)=>(
                <div className='my-1' key={index}>
                    <h2 className='font-bold text-xs'>{experience?.title}</h2>
                    <h2 className='font-normal text-xs flex justify-between'>{experience?.companyName}, {experience?.city}, {experience?.state} <span>{experience?.startDate} {experience.currentlyWorking?"Present":experience?.endDate}</span></h2>
                    <div className='text-xs' dangerouslySetInnerHTML={{__html:experience?.workSummery}} />
                </div>
            ))
        }
    </div>
  )
}

export default ProfessionalExperience1