import React from 'react';
import { useStateContext } from '../context/StateContext';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { BsCartX } from 'react-icons/bs';
import Image from 'next/image';
import { urlFor } from '../lib/client';

const Cart = () => {
  const {
    totalPrice,
    totalQty,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    onQtyUpdate,
  } = useStateContext();

  return (
    <div className='fixed top-0 right-0 z-10 bg-white w-96 shadow-lg h-screen p-5 rounded-lg flex flex-col justify-between'>
      <div className='flex flex-col h-full'>
        <div className='flex items-center gap-3 mb-5'>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowCart(false);
            }}
          >
            <AiOutlineLeft className='font-bold cursor-pointer' size={20} />
          </div>
          <h3 className='font-bold text-xl'>Your Cart ({totalQty})</h3>
        </div>
        {cartItems.length > 0 &&
          cartItems.map(({ _id, name, quantity, image, price }) => (
            <div className='bg-gray-100 p-5 rounded-lg mb-3 flex items-center gap-3 relative overflow-auto'>
              <div className='absolute top-0 right-0 mr-3 mt-3 text-red-500'
              onClick={() => onRemove(_id)}>
                <HiOutlineTrash />
              </div>
              <div className='w-16 h-16 rounded-lg relative'>
                <Image
                  src={urlFor(image[0]).url()}
                  fill
                  style={{ objectFit: 'cover' }}
                  alt='product'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='font-bold'>{name}</div>
                <div className='text-xs text-gray-500 font-bold'>
                  Total: ${price * quantity}
                </div>
                <div className='flex items-center gap-2 text-xs font-bold text-gray-500'>
                  <div>Qty:</div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      onQtyUpdate(_id, 'dec');
                    }}
                    className='hover:bg-purple-500 hover:text-white border border-purple-500 w-4 h-4 flex items-center justify-center rounded-md font-bold'
                  >
                    <AiOutlineMinus size={8} />
                  </div>
                  <div>{quantity}</div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      onQtyUpdate(_id, 'inc');
                    }}
                    className='hover:bg-purple-500 hover:text-white border border-purple-500 w-4 h-4 flex items-center justify-center rounded-md font-bold'
                  >
                    <AiOutlinePlus size={8} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {cartItems.length == 0 &&
          <div className='flex flex-col justify-center items-center h-full text-gray-300 gap-3'>
            <BsCartX size={48}/>
            <p>Your cart is empty</p>
          </div>
        }
      </div>
      {cartItems.length > 0 && 
        <div className='border-t border-gray-100 pt-5'>
          <div className='flex items-center justify-between mb-3 font-bold'>
            <h3>Subtotal</h3>
            <h3>${totalPrice}</h3>
          </div>
          <button type='button' className='bg-purple-500 w-full py-3 text-white font-bold rounded-lg'>
            Checkout
          </button>
        </div>
      }
    </div>
  );
};

export default Cart;
