import React, { useContext, useState } from 'react'
import { Button } from './ui/button'
import { Oval } from 'react-loader-spinner'
import { FileText, Trash2, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

function ListCard({item}) {
const [loading,setLoading]=useState(false)
const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
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
      toast('The resume deleted Successfully!')
    }
}

const handleCardClick = () => {
    window.location.href = `/dashboard/${resumeInfo.template}/${item._id}`;
}

const formatDate = (dateString) => {
  if (!dateString) return 'Recently created'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}
  
  return (
    <div 
      className='cursor-pointer group'
      onClick={handleCardClick}
    >
      <div className='bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-64 w-56'>
        
        {/* Main content */}
        <div className='flex flex-col h-full'>
          
          {/* Icon section */}
          <div className='flex-1 flex flex-col justify-center items-center p-6'>
            <div className='p-4 bg-orange-50 rounded-lg mb-3'>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            
            <div className='px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium'>
              Ready
            </div>
          </div>
          
          {/* Footer section */}
          <div className='bg-gray-50 border-t border-gray-100 p-4'>
            <h3 className='font-semibold text-gray-900 mb-2 truncate'>
              {item.title || 'Untitled Resume'}
            </h3>
            
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1 text-xs text-gray-500'>
                <Calendar className="w-3 h-3" />
                <span>{formatDate(item.createdAt || item.updatedAt)}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="p-1.5 h-7 w-7 border-gray-200 hover:border-red-300 hover:bg-red-50" 
                onClick={onDelete}
                disabled={loading}
              >
                {loading ? (
                  <Oval height={12} width={12} color="#ef4444" ariaLabel="loading" />
                ) : (
                  <Trash2 className="w-3 h-3 text-red-500" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCard