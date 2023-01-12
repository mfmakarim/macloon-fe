import Image from 'next/image'
import React from 'react'
import { urlFor } from '../lib/client'

const FooterBanner = ({bannerFooter}) => {
  const { smallText, midText, largeText1, buttonText, desc, product, discount, saleTime, image } = bannerFooter
  return (
    <div className='w-full bg-purple-400 p-5 md:p-10 my-5 md:my-20 rounded-xl shadow-lg'>
      <div className='flex flex-col md:flex-row items-center justify-between md:h-32'>
        <div className='text-right space-y-3 flex-1 relative'>
          {image && <div className='hidden md:block w-64 h-64 rounded-full shadow-2xl absolute overflow-hidden right-0 top-0 -mr-32 -mt-16'>
            <Image src={urlFor(image).url()} fill style={{objectFit: 'cover'}}/>
          </div>}
          <div className='font-bold uppercase tracking-tight bg-yellow-500 text-white text-center md:text-right md:px-48 py-1 rounded-full md:text-lg'>{smallText}</div>
          <div className='md:hidden relative h-32 w-32 mx-auto rounded-full overflow-hidden shadow-xl'>
            <Image src={urlFor(image).url()} fill style={{objectFit: 'cover'}}/>
          </div>
          <div className='text-3xl md:text-6xl uppercase font-bold tracking-tighter md:pr-32 text-white'>{midText}</div>
        </div>
        <div className='flex-1 text-5xl md:text-9xl uppercase font-bold tracking-tighter md:pl-24 border-b-4 text-white border-yellow-500'>
          {largeText1}
        </div>
      </div>
    </div>
  )
}

export default FooterBanner