import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSearchQuery } from '../redux/features/userSlice';

const Users = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.user.searchQuery);
    const user = useSelector((state) => state.user.userInfo);

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleUserInfo = async () => {
        try {
            const { data } = await axios.get('/api/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        handleUserInfo();
    }, [user]);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="w-[70%] mx-auto ">
                <h1 className='text-4xl text-black font-semibold mb-4' >Search your friends and mates here</h1>
                <div className="">
                <input 
                type="text" 
                placeholder='Search' 
                onChange={handleSearchChange} 
                className=' text-[#0D111D] py-1 px-2 rounded-md outline-none bg-yellow-50  border-2 border-yellow-400' />
                {
                    filteredUsers.length > 0 ? (
                        filteredUsers.map((user,index)=>(
                            <div key={index} className="text-black w-[70%] mt-4 border border-yellow-500 rounded-md flex justify-between px-3 py-1 items-center ">
                                <div className="flex gap-4 justify-center items-center">
                                    <img src={user.photo} width='30px' className='rounded-full' alt="" />
                                    {/* {console.log(user.photo)} */}
                                <h3>{user.name}</h3>
                                </div>
                                <h4 className='' >{user.email}</h4>
                            </div>
                        ))
                    ) : (
                        <p className='text-black text-3xl font-semibold  ' >No users found🥱</p>
                    )
                }
                </div>
            </div>
        </>
    )
}

export default Users
