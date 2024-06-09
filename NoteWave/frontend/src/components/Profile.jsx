import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../redux/features/userSlice';

const Profile = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const [formError, setFormError] = useState({});
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.name,
        email: user.email,
      });
    }
  }, [user]);

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

    if (!values.userName) {
      error.userName = 'Username is required';
    }
    if (!regex.test(values.email)) {
      error.email = 'Invalid email';
    }
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(validate(formData));
    setIsSubmit(true);

    if (Object.keys(validate(formData)).length === 0) {
      try {
        const { userName, email } = formData;
        const response =  await dispatch(editProfile({ id: user._id, name: userName, email }));
        console.log(response)
        if (response.meta.requestStatus === 'fulfilled') {
          navigate('/notes');
        } else {
          console.log('Response rejected:', response);
        }
      } catch (error) {
        setFormError({ general: 'An error occurred. Please try again later.' });
        setShowLoadingMessage(false);
      }
    }
  };
  return (
    <>
            {
                showLoadingMessage ? (
                    <div className='text-5xl text-white font-bold flex justify-center items-center mt-[15%]'>
                        <div role="status">
                            <svg aria-hidden="true" className="w-10 h-10 text-blue-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <form noValidate onSubmit={handleSubmit}>
                        <div className="w-[70%] text-white mx-auto">
                            <h1 className="text-5xl font-semibold mt-4">
                                Edit Profile
                            </h1>
                            <div className=" bg-indigo-300 bg-opacity-10 rounded-lg mt-4">
                                <h1 className='bg-indigo-300 bg-opacity-30 p-2 rounded-t-md text-xl'>Edit note</h1>
                                <div className="mt-1 px-2">
                                    <h2 className="">
                                        Username
                                    </h2>
                                    <input
                                        required
                                        name='userName'
                                        type="text"
                                        className='text-zinc-900 w-full rounded-sm'
                                        placeholder='Jane Doe'
                                        value={formData.userName}
                                        onChange={handleChange}
                                    />
                                    {<p className='text-red-400'> {formError.userName} </p>}
                                </div>
                                <div className="mt-1 px-2">
                                    <h2 className="">
                                        Email
                                    </h2>
                                    <input
                                        required
                                        name='email'
                                        type="text"
                                        className='text-zinc-900 w-full rounded-sm'
                                        placeholder='Enter the title'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {<p className='text-red-400'> {formError.email} </p>}
                                </div>
                                <div className="flex justify-start gap-3 items-center px-2 py-4">
                                    <button type='submit' className='bg-green-300 p-2 rounded-md text-zinc-900 font-medium' >Update Profile</button>
                                    <button onClick={() => navigate('/notes')} className='bg-red-300 p-2 rounded-md text-zinc-900 font-medium' >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )
            }
        </>
  )
}

export default Profile
