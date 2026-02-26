import React from 'react'
import { SubCategory } from '../Types/categories.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faTurnUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function SubCategoryCard({info} :{info:SubCategory}) {
  const {name} = info
  return (
    <>
   
     <div className="group flex flex-col items-center justify-between bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-green-600 hover:shadow-lg transition-all duration-300"
  
    >
      <div className="flex items-center justify-center w-10 h-10 bg-green-400/50 text-green-600 rounded-lg">
        <FontAwesomeIcon icon={faFolder} />
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-700 tracking-wide group-hover:text-green-600"> {name}</p>
      <div className='text-sm text-green-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200'>
        <span className='text-sm font-semibold'>View products</span>
        <FontAwesomeIcon icon={faTurnUp} />
      </div>
    </div>
    </>
  )
}
