import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../redux/features/userSlice';

const Login = () => {
  const [userNotFound, setUserNotFound] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(()=>{
    if(user.userInfo){
      navigate('/notes')
    }
  },[user,navigate])

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
    
    // Destructure formData
    const { email, password } = formData;
  
    if (Object.keys(validate(formData)).length === 0) {
      try {
        const response = await dispatch(login({ email, password })); // Pass an object with email and password
        console.log(response);
        if (response.meta.requestStatus === 'fulfilled') {
          navigate('/notes');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setUserNotFound(true);
            setPasswordError(false);
          } else if (error.response.status === 401) {
            setPasswordError(true);
            setUserNotFound(false);
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
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formError]);

  return (
    <div className="w-[30%] h-[50%] mx-auto mt-[5%] rounded-md bg-indigo-100 bg-opacity-5 px-4 py-3 pl-4">
      <div className="flex justify-center items-center flex-col mx-auto">
        <h1 className="text-3xl text-white font-semibold mb-3">Login</h1>
        <p className="text-sm text-white">Long time no see!</p>
      </div>

      <form className="flex flex-wrap flex-col justify-center" noValidate onSubmit={handleSubmit}>
        <div className="text-white">
          <label htmlFor="email" className="text-white text-xl">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className="block bg-zinc-100 rounded-sm outline-none text-zinc-900 w-full mb-3 h-[35px] pl-2"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <p className="text-red-400 mb-3">{formError.email}</p>
        </div>
        <div className="text-white">
          <label htmlFor="password" className="text-white text-xl">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="block bg-zinc-100 rounded-sm outline-none text-zinc-900 w-full mb-3 h-[35px] pl-2"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <p className="text-red-400 mb-3">{formError.password}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-400 mx-auto flex justify-center items-center px-2 py-1 rounded-md hover:bg-indigo-500"
        >
          Login
        </button>
        {formError.general && <p className="text-red-400 mt-3">{formError.general}</p>}
        <p className="mt-3 text-sm text-gray-400">
          Do not have an account? <NavLink to="/signup" className="text-green-400">Sign Up</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
