import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "./ui/button"
  import { Input } from "@/components/ui/input"
  import React, { useState,useEffect } from 'react'
  import { useUser } from "@clerk/clerk-react"
  import { useNavigate } from "react-router-dom"
  import ListCard from "./ListCard.jsx"
  import { Oval } from "react-loader-spinner"
  import { Plus } from "lucide-react"

function AddResume({search}) {
  const [openDialog,setOpenDialog]=useState(false)
  const [title,setTitle]=useState("")
  const {user}=useUser()
  const [resumeList,setResumeList]=useState([])
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()

    const filteredData1 = resumeList.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );


  const handleCreate=async()=>{
    try{
      setloading(true)
      await fetch('http://localhost:8000/api/CreateResume',{
        mode:'cors',
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          userId:user.id,
          title:title
        })
      }).then(res=>res.json()).then((data)=>{
        if(data.success){
        setTitle("")
        setOpenDialog(false)
        navigate(`/dashboard/resume/${data.resumeId}`)
        
      }
      })
    }catch(err){
      console.log(err)
    }finally{
      setloading(false)
    }
  }
  const getResumes=async()=>{
    await fetch('http://localhost:8000/api/ListResumes',{
      mode:'cors',
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        userId:user.id
      })
  }).then(res=>res.json()).then((data)=>{
    setResumeList(data.resumes)
    
    
  })
  }
  useEffect(() => {
   getResumes()
  },[])
  
  return (
    <>
    <div className='grid gap-3 grid-cols-4 '>
        <div 
      className='cursor-pointer group'
      onClick={()=>setOpenDialog(true)}
    >
      <div className='bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 overflow-hidden h-64 w-56'>
        
        {/* Main content */}
        <div className='flex flex-col h-full justify-center items-center p-6'>
          
          {/* Plus icon with glow effect */}
          <div className='relative mb-4'>
            <div className="absolute inset-0 bg-orange-400 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-200" />
            <div className='relative p-6 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-200'>
              <Plus className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
          
          {/* Text */}
          <h3 className='font-semibold text-lg text-gray-800 mb-2 text-center'>
            Create New Resume
          </h3>
          <p className='text-sm text-gray-600 text-center'>
            Start building your professional resume
          </p>
          
          
          
        </div>
      </div>
    </div>
        {
          filteredData1.length>0?filteredData1.map((item,index)=>(<ListCard key={index} item={item}/>)):""
        }
        
      </div>
       <Dialog open={openDialog}>
       <DialogContent>
     <DialogHeader>
       <DialogTitle>Create New Resume</DialogTitle>
       <DialogDescription>
         Start building your Resume by giving name to the project
         <Input onChange={(e)=>setTitle(e.target.value)} className="my-2 text-[#141414]" placeholder="Ex. My Resume"/>
       </DialogDescription>
       <div className="flex justify-end gap-5">
         <Button onClick={()=>setOpenDialog(false)} variant="ghost">Cancel</Button>
         <Button disabled={!title} onClick={handleCreate}>{loading?(<div className="col-span-3 flex items-center justify-center">
      <Oval height={40} width={40} color="white" ariaLabel="loading" />
    </div>):"Create"}</Button>
       </div>
     </DialogHeader>
   </DialogContent>
 </Dialog>
 </>
  )
}

export default AddResume