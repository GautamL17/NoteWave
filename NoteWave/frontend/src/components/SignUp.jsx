import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {signup} from '../redux/features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
const Register = () => {
    const [userFound, setUserFound] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo , loading , error } = useSelector((state)=> state.user)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormError(validate({ ...formData, [name]: value }));
    };

    const validate = (values) => {
        const error = {};
        const regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');

        if (!values.name) {
            error.name = 'Name is required';
        }
        if (!values.email) {
            error.email = 'Email is required';
        } else if (!regex.test(values.email)) {
            error.email = 'Invalid email';
        }
        if (!values.password) {
            error.password = 'Password is required';
        } else if (values.password.length < 6) {
            error.password = 'Password must contain more than 6 letters';
        } else if (values.password.length > 10) {
            error.password = 'Password should not contain more than 10 letters';
        }
        return error;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(validate(formData));
        setIsSubmit(true);
        if (Object.keys(validate(formData)).length === 0) {
            try {
                dispatch(signup(formData))
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        setUserFound(true);
                    } else {
                        setFormError({ general: 'An error occurred. Please try again later.' });
                    }
                } else {
                    setFormError({ general: 'An error occurred. Please try again later.' });
                }
            }
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/login')
        }
    }, [userInfo,navigate]);

    return (
        <>
            <div className="w-[30%] h-[50%] mx-auto mt-[5%] rounded-md bg-indigo-100 bg-opacity-5 px-4 py-3 pl-4">
                <div className=" flex justify-center items-center flex-col mx-auto">
                    <h1 className='text-3xl text-gray-100 font-semibold mb-3'>Create an account</h1>
                    <p className='text-sm text-gray-100'>Join for exclusive access!</p>
                </div>
                {userFound && <p className="text-red-500">User already exists. Please check your credentials.</p>}
                <form className='flex flex-wrap flex-col justify-center' noValidate onSubmit={handleSubmit} action="#">
                    <div className=" text-white">
                        <label htmlFor="name" className='text-xl'>Name</label>
                        <input type="text"
                            name='name'
                            placeholder='John Doe'
                            className='block bg-zinc-100 rounded-sm text-zinc-900 w-full mb-3 h-[35px] pl-2  invalid:border-red-500'
                            required={true}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <p className="text-red-400 mb-3 " > {formError.name} </p>
                    </div>
                    <div className=" text-white">
                        <label htmlFor="email" className='text-white text-xl '>Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder='example@gmail.com'
                            className='block bg-zinc-100 rounded-sm text-zinc-900 w-full mb-3 h-[35px] pl-2'
                            required={true}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <p className="text-red-400 mb-3 " > {formError.email} </p>
                    </div>
                    <div className=" text-white">
                        <label htmlFor="password" className='text-white text-xl '>Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder='••••••••'
                            className='block bg-zinc-100 rounded-sm text-zinc-900 w-full mb-3 h-[35px] pl-2'
                            required={true}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <p className="text-red-400 mb-3 " > {formError.password} </p>
                    </div>
                    <button type="submit"
                        className="w-full bg-indigo-400 mx-auto flex justify-center items-center px-2 py-1 rounded-md hover:bg-indigo-500" >
                        Create an account
                    </button>
                    <p className="mt-3 text-sm text-gray-400">Already have an account?  <NavLink to="/Login" className="text-green-400">Login</NavLink></p>

                </form>
            </div>
        </>
    )
}

export default Register
