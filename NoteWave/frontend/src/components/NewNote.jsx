import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNotes } from '../redux/features/notesSlice';
 
const NewNote = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});
    const [showLoadingMessage, setShowLoadingMessage] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ResetNote = () => {
        setFormData({
        title: '',
        content: '',
        category: '',
        })
    }

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
        // const regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');

        if (!values.title) {
            error.title = 'Please provide title';
        }
        if (!values.content) {
            error.content = 'Please provide description';
        }
        if (!values.category) {
            error.category = 'Please provide category to note'
        }
        return error;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(validate(formData));
        setIsSubmit(true);
        const { title, content, category } = formData

        if (Object.keys(validate(formData)).length === 0) {
            try {
                const response = await dispatch(createNotes({title,content,category}))
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
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoadingMessage(false)
            // console.log('j')

        }, 500)
        return () => clearTimeout(timeout)
    }, [])

    console.log(formData);
    console.log(formError);
    return (
        <>
            {
                showLoadingMessage ?
                    (<div className='text-5xl text-white font-bold flex justify-center items-center mt-[15%]' >

                        <div role="status">
                            <svg aria-hidden="true" className="w-10 h-10 text-blue-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>)
                    :
                    (   <form noValidate onSubmit={handleSubmit}>
                        <div className="w-[70%] text-white mx-auto">
                            <h1 className="text-5xl font-semibold mt-4">
                                Create a note
                            </h1>
                            <div className=" border border-[#C6C5FF] border-opacity-50 rounded-md mt-10">
                                <h1 className='bg-gradient-to-r from-pink-300 via-fuchsia-300 to-indigo-300 text-[#010219] p-2 rounded-t-md text-xl'>New note</h1>
                                <div className="mt-1 px-2">
                                    <h2 className="text-opacity-50 text-[#E9E9E9]">
                                        Title
                                    </h2>
                                    <input
                                        required
                                        name='title'
                                        type="text"
                                        className=' w-full rounded-sm bg-[#010219] py-1 outline-none border border-[#C6C5FF] border-opacity-50 text-[#E9E9E9] px-2 '
                                        placeholder='Enter the title'
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                    {<p className='text-red-400'> {formError.title} </p>}
                                </div>
                                <div className="mt-1 px-2">
                                    <h2 className="text-opacity-50 text-[#E9E9E9]">
                                        Description
                                    </h2>
                                    <textarea
                                        name="content"
                                        className='w-full h-30  rounded-sm bg-[#010219] outline-none border border-[#C6C5FF] border-opacity-50 text-[#E9E9E9] px-2'
                                        placeholder='Enter the description'
                                        value={formData.content}
                                        onChange={handleChange}
                                    />
                                    {<p className='text-red-400'> {formError.content} </p>}
                                </div>
                                <div className="mt-1 px-2">
                                    <h2 className="text-opacity-50 text-[#E9E9E9]">
                                        Category
                                    </h2>
                                    <input
                                        type="text"
                                        name='category'
                                        className='w-full rounded-sm bg-[#010219] py-1 outline-none border border-[#C6C5FF] border-opacity-50 text-[#E9E9E9] px-2'
                                        placeholder='Enter the title'
                                        value={formData.category}
                                        onChange={handleChange}
                                    />
                                    {<p className='text-red-400'> {formError.category} </p>}
                                </div>
                                <div className="flex justify-start gap-3 items-center px-2 py-4">
                                    <button type='submit' className='bg-green-300 px-2 py-1 w-[150px] rounded- text-zinc-900 font-medium' >Create Note</button>
                                    <button onClick={ResetNote} className='bg-red-300 px-2 py-1 w-[150px] round-md text-zinc-900 font-medium' >Reset Fields</button>
                                </div>
                            </div>
                        </div>
                        </form>
                    )
            }
        </>
    )
}

export default NewNote
