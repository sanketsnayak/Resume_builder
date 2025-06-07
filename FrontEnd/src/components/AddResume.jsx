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
  

function AddResume() {
  const [openDialog,setOpenDialog]=useState(false)
  const [title,setTitle]=useState("")
  const {user}=useUser()
  const [resumeList,setResumeList]=useState([])
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()

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
        <div onClick={()=>setOpenDialog(true)} className='h-[30vh] w-[15vw] bg-secondary flex justify-center items-center border-2 rounded border-dotted hover:scale-105 transition-all hover:shadow-md'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
        </div>
        
        {
          resumeList.map((item,index)=>(<ListCard key={index} item={item}/>))
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