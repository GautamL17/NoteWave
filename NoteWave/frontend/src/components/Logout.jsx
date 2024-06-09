import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Import useNavigate hook
    const handleLogOut = () => {
        dispatch(logout());
        navigate('/'); // Use navigate to redirect after logout
    };

    return (
        <button className='hover:bg-slate-200 hover:bg-opacity-10 rounded-md px-2' onClick={handleLogOut}>
            Logout
        </button>
    );
};

export default Logout;
