import React from 'react'
import Image from 'next/image'
import { urlFor } from '../lib/client'
import Link from 'next/link'

const Product = ({ product }) => {
  const { name, image, price, slug } = product
  return (
    <Link href={`/product/${slug.current}`}>
    <div className='w-40 md:w-72 p-1 md:p-3'>
      <div className='bg-gray-100 rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-100 ease-linear cursor-pointer'>
        <div className='w-full h-48 relative overflow-hidden'>
          <Image src={image[0] && urlFor(image[0]).url()} alt={name} fill style={{objectFit: 'cover'}} className='hover:scale-110 hover:rotate-6 transition-all ease-in-out duration-150' />
        </div>
        <div className='bg-white p-3 md:p-5'>
          <h5 className='md:text-lg font-bold'>{name}</h5>
          <p>${price}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default Product