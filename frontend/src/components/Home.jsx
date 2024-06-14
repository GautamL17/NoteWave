import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    // if(userInfo)
    //   navigate('/notes')
    if (!userInfo) {
      navigate('/')
    }
  }, [])
  return (
    <>
      <div className="w-[70%] mt-20 mx-auto h-[400px] rounded-md absolute left-[15%] z-20 right-[25%] pt-10">
        <div className="lg:text-7xl md:text-5xl sm:text-3xl font-semibold text-zinc-100 flex flex-col justify-center items-center">
          <h1>Welcome to </h1>
          <span className='bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 inline-block text-transparent bg-clip-text' >Notewave</span>
        </div>
        <div className="flex items-center justify-center mt-3 lg:text-lg md:text-md sm:text-base font-medium text-zinc-100">
          <p>One safe place for all your notes</p>
        </div>
        <div className="flex flex-wrap justify-between list-none sm:w-[50%] lg:w-[30%] md:w-[50%] mx-auto mt-10">
          <NavLink className='py-1 lg:px-8 md:px-3 sm:px-2  bg-blue-50  hover:bg-blue-100  text-[#0D111D] rounded-md font-medium' to='/login'>Login</NavLink>
          <NavLink className='py-1 lg:px-8 md:px-3 sm:px-2  border-2 border-blue-50 text-zinc-100 hover:text-[#010219] hover:bg-opacity-100 hover:bg-blue-50 rounded-md font-medium ' to='/signup'>Sign Up</NavLink>
        </div>
      </div>
      {/* <div className="w-40 h-40 bg-yellow-500 absolute top-[450px] right-[150px] rounded-full z-10 blur-3xl"></div> */}
      {/* <div className="w-40 h-40 bg-yellow-500 absolute bottom-[450px] left-[150px] rounded-full z-10 blur-3xl"></div> */}
    </>
  )
}

export default Home
