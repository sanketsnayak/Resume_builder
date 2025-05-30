import React from 'react'

function Summary({resumeInfo}) {
  if (!resumeInfo) {
    return null;
  }
  return (
    <div>
        <p className=' text-xs'>{resumeInfo?.summery}</p>
    </div>
  )
}

export default Summary