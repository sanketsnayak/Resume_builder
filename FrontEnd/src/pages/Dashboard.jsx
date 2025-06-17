import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import AddResume from '@/components/AddResume.jsx'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Search, Plus, FileText, Sparkles, TrendingUp, Award, Users, Zap } from 'lucide-react'

function Dashboard() {
  const {user} = useUser()
  const [search, setSearch] = useState("")

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex-1 min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50'>
        {/* Header Section */}
        <div className='relative overflow-hidden'>
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-blue-200/20 rounded-full blur-3xl transform translate-x-48 -translate-y-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-300/15 to-yellow-300/15 rounded-full blur-2xl transform -translate-x-32 translate-y-32" />
          
          {/* Content */}
          <div className='relative z-10 p-10'>
            {/* Welcome Card */}
            <div className='relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl shadow-orange-500/10 mb-8'>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-blue-50/50 rounded-3xl" />
              <div className="relative z-10">
                <div className='flex items-center gap-3 mb-3'>
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                    #1 Resume Builder Platform
                  </div>
                </div>
                <h1 className='font-bold text-4xl text-gray-900 mb-2'>
                  Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">{user?.firstName}!</span>
                </h1>
                <p className='text-xl text-gray-600 leading-relaxed'>
                  Start building your <span className="font-semibold text-orange-600">Professional Resume</span> by giving name to the project
                </p>
              </div>
            </div>

            

            
            <div className='mb-8'>
              <div className='relative w-full flex justify-between'>
                <div className="absolute  bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl blur opacity-75" />
                <div className="relative h-1/2 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                  <Input 
                    className="w-full pl-14 pr-8 bg-transparent border-none text-lg placeholder:text-gray-500 focus:ring-0" 
                    placeholder="Search your resumes..." 
                    onChange={(e) => setSearch(e.target.value)} 
                    value={search}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  
                </div>
                <div className='flex gap-4 mb-8'>
              
              <Button variant="outline" className="border-2 border-gray-200 hover:border-orange-300 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg font-semibold bg-white/80 backdrop-blur-sm">
                <FileText className="w-5 h-5 mr-2" />
                View Templates
              </Button>
            </div>
              </div>
            </div>

            
            

            {/* Resume Grid */}
            <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl'>
              <div className='flex items-center gap-3 mb-6'>
                <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className='text-2xl font-bold text-gray-900'>Your Resumes</h2>
              </div>
              
              <AddResume search={search} />
            </div>

            
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard