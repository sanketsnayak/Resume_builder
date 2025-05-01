import React from 'react'
import { Link } from 'react-router-dom'



function ListCard({item}) {
  
  return (
    <Link to={`/dashboard/resume/${item._id}`}>
    <div className='h-[30vh] w-[15vw] bg-secondary flex justify-center items-center border-2 rounded border-dotted hover:scale-105 transition-all hover:shadow-md'>
        {item.title}
    </div>
    </Link>
  )
}

export default ListCard