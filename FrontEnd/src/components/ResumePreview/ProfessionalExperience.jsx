import React from 'react'

function ProfessionalExperience({resumeInfo}) {
  return (
    <div className='my-4'>
        <h2 className='text-center font-bold text-sm mt-4 mb-1' style={{color:resumeInfo?.themeColor}}>Professional Experience</h2>
        <hr className='border-[1px] mb-3' style={{borderColor:resumeInfo?.themeColor}}/>
        {
            resumeInfo?.experience.map((experience,index)=>(
                <div className='my-3' key={index}>
                    <h2 className='font-bold text-sm'>{experience?.title}</h2>
                    <h2 className='font-medium text-xs flex justify-between'>{experience?.companyName}, {experience?.city}, {experience?.state} <span>{experience?.startDate} {experience.currentlyWorking?"Present":experience?.endDate}</span></h2>
                    <p className=' text-xs'>{experience?.workSummery}</p>
                </div>
            ))
        }
    </div>
  )
}

export default ProfessionalExperience