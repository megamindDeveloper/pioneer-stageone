import Image from 'next/image'
import React from 'react'
import image from '../../../public/logo/image.png'
const Navbar = () => {
  return (
    <div className='flex justify-center mb-1'>
        <Image src={image} alt="logo" className=' xl:w-80 lg:w-52 py-12'/>
    </div>
  )
}

export default Navbar
