import { SignIn } from '@clerk/clerk-react'
import React from 'react'


function Signin() {
  
  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
       <SignIn redirectUrl='/dashboard'/>
    </div>
  )
}

export default Signin