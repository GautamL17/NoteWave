import React, { useEffect, useRef, useState } from 'react'
import {setSearchQuery} from '../redux/features/notesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink , Link } from 'react-router-dom'
import Logout from './Logout'

const Header = () => {
    const dispatch = useDispatch()
    const dropdownRef = useRef(null)
    const user = useSelector((state)=>state.user.userInfo)
    const [isOpen, setIsOpen] = useState(false)
    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value))
    }

     return (
        <>
            <nav className='flex justify-between mt-3 w-[70%] text-white mx-auto py-2 sticky'>
                <div className="hover:text-yellow-100 font-semibold text-xl flex justify-center items-center gap-2">
                 <NavLink to='/'>
                 <div className='flex justify-center items-center gap-2'>
                 <box-icon name='square-rounded' color='#d946ef' ></box-icon> <span className='bg-gradient-to-r from-pink-300 via-fuchsia-300 to-indigo-100 inline-block text-transparent bg-clip-text' >Note Wave</span>
                 </div>
                 </NavLink>
                </div>
                <div className="flex list-none gap-3 justify-center items-center ">
                    <li className='hover:shadow-[0_20px_50px_#7e26d193] border-2 text-xl   px-3 border-transparent hover:bg-fuchsia-50 hover:bg-opacity-5  hover:rounded-md'  > <NavLink to='/notes' >Notes</NavLink> </li>
                    <li>
                        <input type="text" placeholder='Search' onChange={handleSearchChange} className=' text-[#0D111D] py-1 px-2 rounded-sm ' />
                    </li>
                    <li className=' rounded-sm border-zinc-500 '>
                        <button className='flex gap-2 items-center justify-center '
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            <div className="w-[30px] h-[30px] bg-fuchsia-300 
                            rounded-full flex justify-center items-center">
                                <box-icon name='user-circle' color='#0D111D'></box-icon>
                            </div>
                        </button>
                        {
                            isOpen &&
                            <div className='absolute mt-3 border-fuchsia-500 border-2 bg-zinc-900 py-2 rounded-md w-[90px] cursor-pointer'>
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='hover:text-fuchsia-100 flex justify-center w-full'>
                                        <NavLink to={`/profile/${user.
                                            id}`} className='hover:bg-slate-200 hover:bg-opacity-10 rounded-md px-2'>Profile</NavLink>
                                    </div>
                                    <div className='hover:text-fuchsia-100 flex justify-center w-full'>
                                        <Logout/>
                                    </div>
                                </div>
                            </div>
                        }
                    </li>
                </div>
            </nav>
        </>
    )
}

export default Header



{/* <select name="" id="" className='bg-zinc-800 '>
            <option value="" className=' hover:bg-yellow-400' selected=''>open to see inside</option>
            <option className='hover:bg-slate-500'>1</option>
            <option>2</option>
            <option>3</option>
            </select> */}