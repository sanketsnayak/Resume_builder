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
      <div className='flex flex-col p-10'>
      <div className='flex flex-col gap-2 border-[1px] rounded-2xl px-6 py-2  border-b-stone-300 border-b-4 border-l-stone-300 border-l-4'>
        <h1 className='font-bold   text-3xl'>Hey, {user.firstName}!</h1>
        <p className=' text-lg text-stone-600'>Start building your Resume by giving name to the project</p>
      </div>
    <div className=' px-6 py-6  mt-8 '>
      
      <AddResume/>
    </div>
    </div>
    </SidebarProvider>
  )
}

export default Dashboard