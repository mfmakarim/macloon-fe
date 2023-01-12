import React, { useState } from 'react';
import Image from 'next/image';
import { client, urlFor } from '../../lib/client';
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlinePlus,
  AiOutlineMinus,
} from 'react-icons/ai';
import Product from '../../components/Product';
import { useStateContext } from '../../context/StateContext';

const ProductDetail = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const { qty, incQty, decQty, onAdd } = useStateContext();
  const { image, name, detail, price } = product;

  return (
    <div className='py-5'>
      <div className='flex gap-5 w-full md:w-4/5 mx-auto'>
        <div>
          <div className='w-64 h-64 rounded-xl overflow-hidden relative shrink-0'>
            <Image
              src={urlFor(image[index]).url()}
              fill
              alt={name}
              style={{ objectFit: 'cover' }}
            />{' '}
          </div>
          <div className='flex items-center gap-2 mt-3'>
            {image &&
              image.map((img, i) => (
                <div
                  className={`w-14 h-14 rounded-lg overflow-hidden relative cursor-pointer ${
                    i == index ? 'border border-purple-500 shadow-md' : ''
                  }`}
                  onMouseEnter={() => setIndex(i)}
                >
                  <Image
                    src={urlFor(img).url()}
                    fill
                    style={{ objectFit: 'cover' }}
                    alt={`name ${i}`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2 className='text-3xl font-bold'>{name}</h2>
          <div className='flex items-center'>
            <div className='flex items-center h-8'>
              <AiFillStar className='text-orange-500' />
              <AiFillStar className='text-orange-500' />
              <AiFillStar className='text-orange-500' />
              <AiFillStar className='text-orange-500' />
              <AiOutlineStar />
            </div>
            <div className='ml-2 h-8 flex items-center'>(20) </div>
          </div>
          <p className='mt-3'><b>Details:</b> <br/>{detail}</p>
          <p className='text-xl mt-3 font-bold text-purple-500'>${price}</p>
          <div className='flex items-center gap-5'>
            <div className='font-bold'>Quantity:</div>
            <div className='flex items-center justify-between'>
              <button
                type='button'
                onClick={decQty}
                className='w-10 h-10 border flex items-center justify-center rounded-tl-lg rounded-bl-lg active:bg-gray-100'
              >
                <AiOutlineMinus />
              </button>
              <input
                value={qty && qty}
                className='border h-10 w-10 text-center'
              />
              <button
                type='button'
                onClick={incQty}
                className='w-10 h-10 border flex items-center justify-center rounded-tr-lg rounded-br-lg active:bg-gray-100'
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
          <div className='flex items-center gap-5 mt-5'>
            <button className='border border-gray-200 font-bold px-5 py-2 rounded-lg shadow-lg'
            onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button className='bg-purple-500 text-white font-bold px-5 py-2 rounded-lg shadow-lg'>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='my-16 text-center'>
        <h3 className='text-xl font-bold mb-5'>You May Also Like</h3>
        <div className='flex flex-wrap justify-center'>
          {products &&
            products
              .slice(0, 4)
              .map((product) => <Product product={product} />)}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getStaticPaths = async () => {
  const query = `*[_type == 'product']{
    slug{
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product" && slug.current != '${slug}']`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};
