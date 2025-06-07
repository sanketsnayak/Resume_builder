import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Oval } from 'react-loader-spinner'

function ListCard({item}) {
const [loading,setLoading]=useState(false)
const onDelete= async(e)=>{
    e.stopPropagation(); 
    e.preventDefault();
    setLoading(true)
    try{
      await fetch('http://localhost:8000/api/deleteResume',{
        mode:"cors",
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
          userId:item.createdBy,
          ResumeID:item._id
        })
      }).then(res=>res.json()).then(data=>{
        if(data.success){
          console.log(data.message)
        }
      })
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
}
  
  return (
    <Link to={`/dashboard/resume/${item._id}`}>
    <div className=' relative  h-[30vh] w-[15vw] bg-secondary flex  border-2 rounded  hover:scale-105 transition-all hover:shadow-md'>
      <div className='flex justify-center h-[80%] items-center w-full'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
      </div>
    
      <div className='absolute px-2 pl-4 py-1.5 bg-stone-400 text-lg font-semibold flex justify-between w-full  bottom-0 text-[#303030]'>
        
        {item.title}
        <Button variant="outline" className="" onClick={onDelete}>{loading?(<div className="col-span-3 flex items-center justify-center">
                              <Oval height={40} width={40} color="white" ariaLabel="loading" />
                            </div>):<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>}</Button>
      </div>
        
                            
    </div>
    </Link>
  )
}

export default ListCard