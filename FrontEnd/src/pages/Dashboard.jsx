import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import AddResume from '@/components/AddResume.jsx'
function Dashboard() {
  const {user}=useUser()

  
  return (
    <div>
      <AddResume/>
    </div>
  )
}

export default Dashboard