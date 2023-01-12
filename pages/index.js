import React from 'react'
import { HeroBanner, FooterBanner, Product } from '../components'
import { client } from '../lib/client'

const index = ({banner, bannerFooter, products}) => {
  return (
    <>
      <HeroBanner banner={banner && banner}/>
      <div className='space-y-5 mt-10'>
        <section>
          <div className='flex flex-col w-full'>
            <h2 className='text-3xl font-bold mx-auto my-5 md:my-10'>Best Seller</h2>
            <div className='flex flex-wrap justify-center w-full'>
              {
                products?.map(product => (
                  <Product product={product && product} />
                ))
              }
            </div>
          </div>
        </section>
      </div>
      <FooterBanner bannerFooter={bannerFooter && bannerFooter} />
    </>
  )
}

export default index

export const getServerSideProps = async () => {
  const queryBannerHeader = `*[_type == 'banner' && section == 'header']{
    ...,
    product->{
      slug
    }
  }`
  const dataBannerHeader = await client.fetch(queryBannerHeader)

  const queryBannerFooter = `*[_type == 'banner' && section == 'footer']`
  const dataBannerFooter = await client.fetch(queryBannerFooter)

  const queryProduct = "*[_type == 'product']"
  const productData = await client.fetch(queryProduct)

  return {
    props: {
      banner: dataBannerHeader[0],
      bannerFooter: dataBannerFooter[0],
      products: productData
    }
  }
}