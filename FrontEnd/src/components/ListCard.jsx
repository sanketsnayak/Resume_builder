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
    <div className='h-[30vh] w-[15vw] bg-secondary flex justify-center items-center border-2 rounded border-dotted hover:scale-105 transition-all hover:shadow-md'>
        {item.title}
        <Button onClick={onDelete}>{loading?(<div className="col-span-3 flex items-center justify-center">
                              <Oval height={40} width={40} color="white" ariaLabel="loading" />
                            </div>):"Delete"}</Button>
    </div>
    </Link>
  )
}

export default ListCard