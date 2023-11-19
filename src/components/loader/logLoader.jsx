import React from 'react'
import logo from '../image/bg34-1.png'
const LogLoder = () => {
  return (
    <div className='md:w-full h-screen relative md:block hidden animate-slide-loader'>
        <img src={logo} alt="loading" className=' mt-14 ml-14 bg-no-repeat bg-contain animate-slide-right' />
    </div>
  )
}

export default LogLoder;