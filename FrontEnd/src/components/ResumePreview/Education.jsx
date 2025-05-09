import React from 'react'

function Education({resumeInfo}) {
  return (
    <div className='my-4'>
        <h2 className='text-center font-bold text-sm mt-4 mb-1' style={{color:resumeInfo?.themeColor}}>Education</h2>
        <hr className='border-[1px] mb-3' style={{borderColor:resumeInfo?.themeColor}}/>
        {
            resumeInfo?.Education.map((education,index)=>(
                <div className='mb-3' key={index}>
                    <h2 className='font-medium text-sm' style={{color:resumeInfo?.themeColor}}>{education?.universityName}</h2>
            
                    <h2 className='font-normal text-xs flex justify-between'>{education?.degree} in {education?.major} <span>{education?.startDate}-{education?.endDate}</span></h2>
                    <p className=' font-normal text-xs'>{education?.description}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Education