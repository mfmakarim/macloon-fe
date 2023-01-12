import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { FaPercentage, FaCalendar } from 'react-icons/fa'

const HeroBanner = ({banner}) => {
  const [bannerImage, setBannerImage] = useState()
  
  useEffect(() => {
    const image = urlFor(banner.image)
    setBannerImage(image)
  },[])

  const { smallText, midText, largeText1, buttonText, desc, product, title, discount, saleTime } = banner

  return (
    <Link href={`/product/${product.slug.current}`}>
      <div className='flex flex-col w-full justify-center relative bg-gray-100 p-5 md:p-10 rounded-xl animate-slide-in'>
        <div className='h-0 md:h-10'></div>
        {bannerImage && 
        <div className='md:hidden w-72 h-64 mx-auto relative'>
          <Image src={`${bannerImage}`} fill alt='Featured product'/>
        </div>
        }
        <div className='px-5 py-1 ml-auto md:ml-0 mr-auto rounded-full bg-purple-200 text-purple-800 font-medium'>
          {smallText}
        </div>
        <h3 className='text-2xl md:text-3xl uppercase font-bold mt-5 tracking-tight text-center md:text-left'>{midText}</h3>
        <h2 className='text-4xl w-full md:w-4/5 md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter text-center md:text-left'>{largeText1}</h2>
        <button className='bg-purple-800 text-white w-32 ml-auto md:ml-0 mr-auto rounded-lg py-3 mt-5 shadow-lg'>{buttonText}</button>
        {bannerImage && 
          <div className='hidden md:block absolute right-0 top-0 mt-10 lg:mt-0 lg:mr-20 HeroImageLg'>
            <style jsx>{`
              .HeroImageLg {
                width: 550px;
                height: 500px;
              }
              .HeroImageSm {
                width: 300px;
                height: 280px;
              }
            `}</style>
            <Image src={`${bannerImage}`} fill alt='Featured product'/>
          </div>
        }
        <div className='h-8'></div>
        <div className='flex flex-col md:flex-row justify-between'>
          <div className='flex items-center justify-center md:justify-start gap-5 opacity-70'>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-lg bg-red-200 flex items-center justify-center'>
                <FaPercentage className='text-sm md:text-lg text-red-800'/>
              </div>
              <div className='text-sm md:text-lg font-bold text-red-800 ml-2'>
                {discount} OFF
              </div>
            </div>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-lg bg-red-200 flex items-center justify-center'>
                <FaCalendar className='text-sm md:text-lg text-red-800'/>
              </div>
              <div className='text-sm md:text-lg font-bold text-red-800 ml-2'>
                {saleTime}
              </div>
            </div>
          </div>
          <div className='my-5 md:my-0'>
            <div className='flex justify-start md:justify-end ml-auto font-bold text-lg'>
              {title}
            </div>
            <div className='flex justify-start md:justify-end md:ml-auto md:w-72 text-left md:text-right'>
              {desc}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HeroBanner