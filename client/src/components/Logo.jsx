import React from 'react'
import logo from "@/assets/assets/icons/logo-brand.svg"
const Logo = () => {
  return (
    <div className='flex gap-2 items-center justify-center'>
      <img src={logo} alt="logo" className='w-14 h-14' />
      <h1 className='text-2xl font-medium text-white'>FileFleet</h1>
    </div>
  )
}

export default Logo