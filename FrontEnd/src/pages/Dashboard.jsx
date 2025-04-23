import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from '@/components/ui/button'



function Dashboard() {
  const {user}=useUser()

  
  return (
    <div>
      
    </div>
  )
}

export default Dashboard