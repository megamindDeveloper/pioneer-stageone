import Image from 'next/image'
import React from 'react'
import image from '../../../public/logo/image.png'
const Navbar = () => {
  return (
    <div className='flex justify-center mb-12'>
        <Image src={image} alt="logo" className='w-80 py-12'/>
    </div>
  )
}

export default Navbar
