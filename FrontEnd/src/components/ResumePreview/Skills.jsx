import React from 'react'

function Skills({resumeInfo}) {
  return (
    <div className='my-4'>
        <h2 className='text-center font-bold text-sm mt-4 mb-1' style={{color:resumeInfo?.themeColor}}>Skills</h2>
        <hr className='border-[1px] mb-3' style={{borderColor:resumeInfo?.themeColor}}/>
        <div className='grid grid-cols-3 gap-y-3 gap-x-6'> 
        {
            resumeInfo?.skills.map((skills,index)=>(
                <div className='flex items-center justify-between' key={index}>
                    <h2 className='text-xs font-normal'>{skills?.name}</h2>
                    <div className='bg-gray-200 h-2 w-[35%]'>
                        <div className='h-full' style={{width:skills?.rating+"%",backgroundColor:resumeInfo?.themeColor}}></div>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Skills