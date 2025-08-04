import React from 'react'

function Summary1({resumeInfo}) {
  if(!resumeInfo){
    return null
  }
  return (
    <div className='mt-3 font-declare'>
        <h2 className='font-bold text-sm '>Summary</h2>
        <hr className='border-[] my-1' style={{borderColor:resumeInfo?.themeColor || "#FF5733"}} />
        <p className=' text-xs'>{resumeInfo?.summery}</p>
    </div>
  )
}

export default Summary1