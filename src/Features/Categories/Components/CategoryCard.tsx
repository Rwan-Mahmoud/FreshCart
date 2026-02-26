import React from 'react'
import { ICategory } from '../Types/categories.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTurnUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function CategoryCard({info} :{info:ICategory}) {
    const {image , name, _id} = info
  return (
    <>
    <Link href={`/Categories/${_id}/subcategories`}>
       <div className="group flex flex-col items-center justify-between bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-green-600 hover:shadow-lg transition-all duration-300"
  
    >
      <div className="flex items-center justify-center w-28 h-28">
        <img src={image} alt={name} className='w-full h-full object-contain group-hover:scale-125 transition duration-200' />
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-700 tracking-wide group-hover:text-green-600"> {name}</p>
      <div className='text-sm text-green-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200'>
        <span className='text-sm font-semibold'>View product</span>
        <FontAwesomeIcon icon={faTurnUp} />
      </div>
    </div>
    </Link>
 
    </>
  )
}
