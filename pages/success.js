import React, { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQty } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQty(0);
    runFireworks();
  }, []);

  return <div className='flex items-center flex-col p-10 h-screen'>
    <div className='text-green-500'>
      <BsFillBagCheckFill size={72} />
    </div>
    <h2 className='text-lg font-bold mt-3'>Thank you for your order!</h2>
    <p>Check your email for the receipt.</p>
    <p className="text-gray-500 text-sm">
      If you have any questions, please email
      <a className="email" href="mailto:order@example.com">
        order@example.com
      </a>
    </p>
    <Link href="/">
      <button type="button" className="bg-purple-500 rounded-lg shadow-lg py-2 px-5 mt-5 text-white">
        Continue Shopping
      </button>
    </Link>
  </div>;
};

export default Success;
