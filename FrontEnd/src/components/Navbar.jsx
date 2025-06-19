import React from 'react'
import { Button } from './ui/button'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Navbar() {
    const {user,isSignedIn}=useUser()
  return (
    <div className='flex justify-between px-5 py-2 items-center shadow-lg fixed top-0 left-0 w-full z-50 backdrop-blur-md'>
        <img src="/logo.svg" alt="" height={100} width={100} />
        {isSignedIn?
        <div className=' flex items-center gap-3'>
            <UserButton/>
            <Link to={'/dashboard'}>
            <Button>Dashboard</Button> 
            </Link>
        </div>:<Link to={'/signin'}
        >
        <Button>Get Started </Button>
        </Link>
        }
        
    </div>
  )
}

export default Navbar