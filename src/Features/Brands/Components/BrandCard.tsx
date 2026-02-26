


import React from 'react'
import Image from 'next/image'
import { IBrand } from '../Types/brands.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTurnUp } from '@fortawesome/free-solid-svg-icons'
// import { useRouter } from 'next/navigation'
import Link from 'next/link'



export default function BrandCard({info} :{info:IBrand}) {
  // const router = useRouter()
  const{image, name , _id} = info
  return (
    <>
      <Link href={`/brands/${_id}/products`}>
      <div className="group flex flex-col items-center justify-between bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-purple-600 hover:shadow-lg transition-all duration-300"
  
    >
      <div className="flex items-center justify-center w-28 h-28 p-3">
        <img src={image} alt={name} className='w-full h-full object-contain group-hover:scale-125 transition duration-200' />
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-700 tracking-wide group-hover:text-purple-600"> {name}</p>
      <div className='text-sm text-purple-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200'>
        <span className='text-sm font-semibold'>View product</span>
        <FontAwesomeIcon icon={faTurnUp} />
      </div>
    </div>
      </Link>
    
    </>
  )
}
