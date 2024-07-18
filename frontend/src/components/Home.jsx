import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { setSearchQuery } from '../redux/features/notesSlice'
import { useDispatch, useSelector } from 'react-redux'
import sapiens from '../assets/sapiens.svg'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    // if(userInfo)
    //   navigate('/notes')
    if (!userInfo) {
      navigate('/')
    }
  }, [])
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }
  return (
    <>
      <div className="flex bg-[#0D111D] text-white flex-col h-[638px] ">
        <div className="flex flex-col items-center w-[70%]  mx-auto h-[100%] rounded-md  left-[10%] z-20 right-[25%] pt-10">
          <div className="lg:text-7xl md:text-5xl sm:text-3xl font-semibold text-white flex flex-col justify-center items-center">
            <h1>Welcome to </h1>
            <span className='bg-gradient-to-r from-pink-300 via-fuchsia-300 to-indigo-300 inline-block text-transparent bg-clip-text' >Notewave</span>
          </div>
          <div className="text- flex items-center justify-center mt-3 lg:text-lg md:text-md sm:text-base font-medium">
            <p>Share your notes with the world</p>
          </div>
          <div className="flex gap-3 items-center justify-center mt-3 lg:text-lg md:text-md sm:text-base font-medium">
            <p>Start your notes sharing journey here </p>
            <NavLink to='/signup' className='bg-white bg-opacity-10 px-2 py-1 rounded-md' >Signup ↗️ </NavLink>
          </div>
        <div className="w-[400px]"> <img src={sapiens} alt="supporting image" /> </div>
        </div>
      </div>

    </>
  )
}

export default Home
