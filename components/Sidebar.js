import React from 'react'
import Image from 'next/image';
import { useCategory } from '../hooks';
import { HiOutlineX } from 'react-icons/hi'

const Sidebar = ({setToggleSidebar}) => {
  const [categories] = useCategory()

  return (
    <div className='fixed z-10 top-0 left-0 w-full bg-black bg-opacity-50'>
      <div className='w-4/5 bg-white h-screen shadow-lg p-5 relative'>
        <div onClick={() => setToggleSidebar(false)} 
          className='absolute flex items-center justify-center right-0 top-0 bg-white w-10 h-10 rounded-full shadow-lg -mr-5 mt-5'>
          <HiOutlineX />
        </div> 
        <div className='flex flex-col justify-between h-full'>
          <div>
            <Image
              src='/logo.png'
              alt='macloon'
              width={125}
              height={32}
              unoptimized
              priority
            />
            <div className='mt-5'>
              {categories?.map((category) => (
                  <div className='capitalize opacity-75 hover:opacity-100 cursor-pointer py-3' key={category.name}>{category.name}</div>
                ))}
            </div>
          </div>
          <div className='flex items-center gap-3 border border-gray-100 rounded-lg p-3'>
              <div className='w-8 h-8 rounded-full bg-purple-500'></div>
              <div>John Doe</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar