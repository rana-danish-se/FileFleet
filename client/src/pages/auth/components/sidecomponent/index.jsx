import Logo from '@/components/Logo';
import React from 'react';
import file from "@/assets/assets/images/files.png"

const SideComponent = () => {
  return (
    <div className='w-full bg-slate-900 px-6 py-12 flex flex-col justify-evenly items-center gap-8'>
      <div className='flex items-start  w-full'>
        <Logo />
      </div>
      <div className='flex flex-col gap-3 items-start'>
        <h1 className='text-white text-5xl font-extrabold leading-12 '>Manage your files the best way</h1>
        <p className='text-white text-sm '>Awesome, we've created the best place to store your documents.</p>
      </div>
      <div>
        <img src={file} alt="" className='w-65 h-55' />
      </div>
    </div>
  );
};

export default SideComponent;
