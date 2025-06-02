import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import AddResume from '@/components/AddResume.jsx'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
function Dashboard() {
  const {user}=useUser()

  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
    <div>
      
      <AddResume/>
    </div>
    </SidebarProvider>
  )
}

export default Dashboard