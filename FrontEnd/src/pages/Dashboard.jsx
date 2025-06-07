import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import AddResume from '@/components/AddResume.jsx'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Input } from '@/components/ui/input'
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
      <div className='mt-5 relative w-[30%]'>
        <Input className="w-full " placeholder="search the resume"></Input>
        <div className="absolute top-0 right-0 flex justify-center items-center bg-stone-400 p-[6px] rounded-r-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></div>

      </div>
    <div className=' px-6 py-6  mt-8 '>
      
      <AddResume/>
    </div>
    </div>
    </SidebarProvider>
  )
}

export default Dashboard