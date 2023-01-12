import React from 'react';
import { useStateContext } from '../context/StateContext';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import Image from 'next/image';
import { urlFor } from '../lib/client';

const Cart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    onQtyUpdate
  } = useStateContext();

  return (
    <div className='fixed top-0 right-0 z-10 bg-white w-96 shadow-lg h-screen p-5 rounded-lg'>
      <div className='flex items-center gap-3 mb-5'>
        <AiOutlineLeft className='font-bold' size={20} />
        <h3 className='font-bold text-xl'>Your Cart</h3>
      </div>
      {cartItems.length > 0 &&
        cartItems.map(({ _id, name, quantity, image, price }) => (
          <div className='bg-gray-100 p-5 rounded-lg mb-3 flex items-center gap-3 relative'>
            <div className='absolute top-0 right-0 mr-3 mt-3 text-red-500'>
              <HiOutlineTrash />
            </div>
            <div className='w-16 h-16 rounded-lg relative'>
              <Image
                src={urlFor(image[0]).url()}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='font-bold'>{name}</div>
              <div className='text-xs text-gray-500 font-bold'>Total: ${price * quantity}</div>
              <div className='flex items-center gap-2 text-xs font-bold text-gray-500'>
                <div>Qty:</div>
                <div onClick={() => onQtyUpdate(_id, 'dec')} className='hover:bg-purple-500 hover:text-white border border-purple-500 w-4 h-4 flex items-center justify-center rounded-md font-bold'>
                  <AiOutlineMinus size={8}/>
                </div>
                <div>
                  {quantity}
                </div>
                <div onClick={() => onQtyUpdate(_id, 'inc')} className='hover:bg-purple-500 hover:text-white border border-purple-500 w-4 h-4 flex items-center justify-center rounded-md font-bold'>
                  <AiOutlinePlus size={8} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Cart;
