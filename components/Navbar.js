import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '../lib/client';
import { GrCart } from 'react-icons/gr';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useCategory } from '../hooks';
import { useStateContext } from '../context/StateContext';
import { Cart } from '.';

const Navbar = ({ setToggleSidebar, children }) => {
  const [categories] = useCategory();
  const { totalQty, showCart, setShowCart, qty, incQty, decQty } =
    useStateContext();

  return (
    <nav className='shadow-md'>
      <div className='flex lg:container lg:mx-auto items-center justify-between p-5 '>
        <div className='md:hidden' onClick={() => setToggleSidebar(true)}>
          <HiOutlineMenuAlt2 size={20} />
        </div>

        <div className='md:w-1/3'>
          <Image
            src='/logo.png'
            alt='macloon'
            width={125}
            height={32}
            unoptimized
            priority
          />
        </div>
        <div className='hidden md:flex items-center justify-center gap-5'>
          {categories?.map((category) => (
            <div
              className='capitalize opacity-75 hover:opacity-100 cursor-pointer'
              key={category.name}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className='md:w-1/3 flex justify-end'>
          <div className='relative cursor-pointer' 
              onClick={(e) => {
                setShowCart(true);
              }}>
            <GrCart
              size={20}
            />
            {totalQty > 0 && (
              <div className='absolute top-0 right-0 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs -mr-2 -mt-2'>
                {totalQty}
              </div>
            )}
            {showCart && <Cart />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
