import React from 'react'

function Skills1({resumeInfo}) {
  if (!resumeInfo?.skills || !Array.isArray(resumeInfo.skills)) {
    return null 
  }
  return (
    <div className='my-4 font-declare'>
        <h2 className=' font-bold text-sm mt-4 mb-1' style={{color:resumeInfo?.themeColor}}>Skills</h2>
        <hr className='border-[] mb-3' style={{borderColor:resumeInfo?.themeColor}}/>
        <div className='grid grid-cols-6 gap-y-3 gap-x-6'> 
        {
            resumeInfo?.skills.map((skills,index)=>(
                <div className='flex items-center justify-between' key={index}>
                    <h2 className='text-xs font-normal'>{skills?.name}</h2>
                    
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Skills1