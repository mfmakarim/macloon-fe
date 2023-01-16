import React from 'react'
import Head from 'next/head'
import { Navbar, Sidebar, Footer } from '.'
import { useToggleSidebar } from '../hooks'
import { ItemQtyInput } from '.';

const Layout = ({children}) => {
  const [toggleSidebar, setToggleSidebar] = useToggleSidebar()

  return (
    <>
      <Head>
        <title>Macloon | Get your art sold!</title>
      </Head>
      <header>
        <Navbar setToggleSidebar={setToggleSidebar} />
      </header>

      { toggleSidebar && 
        <Sidebar setToggleSidebar={setToggleSidebar} />
      }
     
      <div className='lg:container lg:mx-auto md:p-5'>
        <main>{children}</main>
      </div>

      
      <Footer />
    </>
  )
}

export default Layout