import React, { useEffect, useRef, useState } from 'react'
import {setSearchQuery} from '../redux/features/notesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink , Link } from 'react-router-dom'
import Logout from './Logout'
import 'boxicons'
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
            <div className='flex  items-center justify-between py-3 w-[70%] text-black  mx-auto'>
                <div className="font-semibold text-xl flex justify-center items-center gap-2">
                 <NavLink to='/'>
                 <div className='flex justify-center items-center gap-2'>
                 <span className=' animate-rotate w-5 h-5 bg-gradient-to-br from-pink-300 via-fuchsia-300 to-indigo-300 rounded-full' ></span>
                 <span className='text-black' >Notewave</span>
                 </div>
                 </NavLink>
                </div>
                <div className="flex list-none gap-3 justify-center items-center ">
                    <li className=' border-2 text-md font-semibold py-[3px] px-3 border-transparent hover:bg-indigo-300 hover:bg-opacity-30 hover:rounded-md text-black'  > <NavLink to='/all-notes' >Notes</NavLink> </li>
                    <li className=' border-2 text-md font-semibold py-[3px] px-3 border-transparent hover:bg-indigo-300 hover:bg-opacity-30 hover:rounded-md text-black'  > <NavLink to='/notes' >My notes</NavLink> </li>
                    
                    <li className=' rounded-sm border-zinc-500 '> 
                        <button className='flex gap-2 items-center justify-center '
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            <div className="w-[30px] h-[30px] bg-indigo-200 
                            rounded-full flex justify-center items-center">
                                {/* <box-icon name='user-circle' color='#0D111D'></box-icon> */}
                                <box-icon name='user-circle'></box-icon>
                            </div>
                        </button>
                        {
                            isOpen &&
                            <div className='bg-white absolute mt-3 border border-[#C6C5FF] border-opacity-50  py-2 rounded-md w-[90px] cursor-pointer'>
                                <div className='flex flex-col justify-center items-center'>
                                    
                                    {
                                        user ? <> 
                                        <div className='hover:text-fuchsia-500 flex justify-center w-full'>
                                        <Link to={`/profile/${user._id}`} className='px-2'>Profile</Link>
                                    </div>
                                        
                                        <div className='hover:text-fuchsia-500 flex justify-center w-full'>
                                        <Logout/>
                                    </div> </> : <>
                                    <Link to='/signup' >Signup</Link>
                                    <Link to='/login' >Login</Link>
                                    </>
                                    }
                                </div>
                            </div>
                        }
                    </li>
                </div>
            </div>
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