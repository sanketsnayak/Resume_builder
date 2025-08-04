import React from 'react'

function PersonalDetails1({resumeInfo}) {
  if(!resumeInfo){
    return null;
  }
  return (
    <div className='font-declare' >
        <h2 className=' font-bold text-2xl'>{resumeInfo?.firstName || ""} {resumeInfo?.lastName || ""}</h2>
        <h2 className=' font-medium text-sm'>{resumeInfo?.jobTitle || ""}</h2>
        
        <div className='flex justify-start gap-4 mt-1.5'>
            <h2 className='font-normal text-xs'>{resumeInfo?.phone || ""}</h2>
            <h2 className='font-normal text-xs'>{resumeInfo?.email || ""}</h2>
            <h2 className=' font-normal text-xs'>{resumeInfo?.address || ""}</h2>
        </div>
        
    </div>
  )
}

export default PersonalDetails1