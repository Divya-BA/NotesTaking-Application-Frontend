import React from 'react'
import loader from '../image/loader.gif'
const Loader = () => {
  return (
    <div className='bg-[#f3f6fd] flex items-center justify-center h-screen'>
        <img className='w-[350px]' src={loader} alt='loading...'/>
    </div>
  )
}

export default Loader