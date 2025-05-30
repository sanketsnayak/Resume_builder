import React from 'react'



function PersonalDetails({resumeInfo}) {
  if (!resumeInfo) {
    return null;
  }
  return (
    <div >
        <h2 className='text-center font-bold text-xl'>{resumeInfo?.firstName || ""} {resumeInfo?.lastName || ""}</h2>
        <h2 className='text-center font-medium text-sm'>{resumeInfo?.jobTitle || ""}</h2>
        <h2 className='text-center font-normal text-xs'>{resumeInfo?.address || ""}</h2>
        <div className='flex justify-between'>
            <h2 className='font-normal text-xs'>{resumeInfo?.phone || ""}</h2>
            <h2 className='font-normal text-xs'>{resumeInfo?.email || ""}</h2>
        </div>
        <hr className='border-[1.5px] my-2' style={{borderColor:resumeInfo?.themeColor || "#FF5733"}} />
    </div>
  )
}

export default PersonalDetails