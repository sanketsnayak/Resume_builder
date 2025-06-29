import React from 'react'

function Education1({resumeInfo}) {
  if (!resumeInfo?.Education || !Array.isArray(resumeInfo.Education)) {
    return null 
  }
  return (
    <div className='my-4'>
        <h2 className=' font-bold text-sm mt-4 mb-1' >Education</h2>
        <hr className='border-[] mb-1' style={{borderColor:resumeInfo?.themeColor}}/>
        {
            resumeInfo?.Education.map((education,index)=>(
                <div className='mb-3' key={index}>
                    <h2 className='font-bold text-xs' style={{color:resumeInfo?.themeColor}}>{education?.universityName}</h2>
            
                    <h2 className='font-normal text-xs flex justify-between'>{education?.degree} in {education?.major} <span>{education?.startDate}-{education?.endDate}</span></h2>
                    <p className=' font-normal text-xs'>{education?.description}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Education1