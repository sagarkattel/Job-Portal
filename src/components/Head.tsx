import React from 'react'
// import BgHeaderDesktop from '../assets/bg-header-desktop.svg';
// import BgHeaderMobile from '../assets/bg-header-mobile.svg';


export const Head = () => {
  return (
    <div className='bg-[#5BA4A4]'>
        <img src="../assets/bg-header-desktop.svg" alt="Header Background" className='hidden md:block'/>
        <img src="../assets/bg-header-mobile.svg" alt="Header Background" className='md:hidden'/>
    </div>
  )
}
