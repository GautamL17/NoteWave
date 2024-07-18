import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchNotes, deleteNote, setSearchQuery } from '../redux/features/notesSlice';
import { setUser } from '../redux/features/userSlice';
import MainScreen from './MainScreen';
import axios from 'axios';

const Notes = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.notes);
    const userInfo = useSelector((state) => state.user.userInfo);
    const loading = useSelector((state) => state.notes.loading);
    const searchQuery = useSelector((state) => state.notes.searchQuery);
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [showLoadingMessage, setShowLoadingMessage] = useState(true);
    const [pdfPaths, setPdfPaths] = useState({});
    const [imagePaths, setImagePaths] = useState({});

    const fetchPdfPaths = async (pdfIds) => {
        const paths = {};
        try {
            const responses = await Promise.all(pdfIds.map((pdfId) => axios.get(`/api/pdf/metadata/${pdfId}`)));
            responses.forEach((response, index) => {
                const pdfId = pdfIds[index];
                paths[pdfId] = response.data.pdfName; // assuming response has pdfName
            });
            setPdfPaths(paths);
        } catch (error) {
            console.error('Error fetching pdf paths:', error);
            pdfIds.forEach((pdfId) => {
                paths[pdfId] = null; // Set null for failed requests
            });
            setPdfPaths(paths);
        }
    };

    const fetchImagePaths = async (imageIds) => {
        const paths = {};
        try {
            const responses = await Promise.all(imageIds.map((imageId) => axios.get(`/api/image/metadata/${imageId}`)));
            responses.forEach((response, index) => {
                const imageId = imageIds[index];
                paths[imageId] = response.data.imageName; // Assuming response has imageName
            });
            setImagePaths(paths);
        } catch (error) {
            console.error('Error fetching image paths:', error);
            imageIds.forEach((imageId) => {
                paths[imageId] = null; // Set null for failed requests
            });
            setImagePaths(paths);
        }
    };

    useEffect(() => {
        if (notes.length > 0) {
            const pdfIds = notes.flatMap((note) => note.pdfs); // Extract all pdf IDs from notes
            if (pdfIds.length > 0) {
                fetchPdfPaths(pdfIds);
            }
            const imageIds = notes.flatMap((note) => note.images); // Extract all image IDs from notes
            if (imageIds.length > 0) {
                fetchImagePaths(imageIds);
            }
        }
    }, [notes]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteNote(id));
        }
    };

    const toggleAccordion = (noteId) => {
        setActiveNoteId((prevId) => (prevId === noteId ? null : noteId));
    };

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const user = JSON.parse(storedUserInfo);
            dispatch(setUser(user));
        }
        dispatch(fetchNotes());
    }, [dispatch]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoadingMessage(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.categories.some(category => category.toString().toLowerCase().includes(searchQuery.toLowerCase())) // Fixed categories filtering
    );

    const getOriginalFileName = (timestampedName) => {
        return timestampedName.substring(timestampedName.indexOf('-') + 1);
    };

    return (
        <>
            {showLoadingMessage ? (
                    <div className="text-5xl text-white font-bold flex justify-center items-center mt-[15%]">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 text-blue-200 animate-spin dark:text-zinc-900 fill-indigo-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </div>
                </div>
            ) : (
                userInfo ? (
                    <MainScreen title={`Welcome back ${userInfo.name}`}>
                        <>
                            <div className="flex justify-between mb-10">
                                <button className="">
                                    <NavLink
                                        to="/createnote"
                                        className="border rounded-md hover:bg-indigo-200 bg-indigo-300 font-semibold text-zinc-950 p-2 w-[90px] "
                                    >
                                        Create a note
                                    </NavLink>
                                </button>
                                <input
                                    className='border-2 border-indigo-400 rounded-md px-2'
                                    placeholder='Search Notes'
                                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                />
                            </div>
                            {filteredNotes.map((note) => (
                                <div key={note._id} className="text-black rounded-md my-4 border-blue-100 border-2 bg-opacity-50">
                                    <div
                                        className={`flex justify-between items-center rounded-md px-3 py-4  cursor-pointer hover:bg--400 hover:bg-opacity-20 `}
                                        onClick={() => toggleAccordion(note._id)}
                                    >
                                        <button className="font-medium text-black text-xl hs-accordion-toggle">{note.title}</button>
                                        <div className="list-none flex gap-5">
                                            <li>
                                                <button
                                                    className="bg-red-400 hover:bg-red-500 rounde text-zinc-950 px-2 py-1 flex justify-center rounded-md items-center w-[90px]"
                                                    onClick={() => deleteHandler(note._id)}
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                            <li>
                                                <Link to={`/editnote/${note._id}`} className="flex justify-center items-center bg-indigo-300 hover:bg-indigo-400 rounded-md text-zinc-950 px-2 py-1 w-[90px]">
                                                    <button>Edit</button>
                                                </Link>
                                            </li>
                                        </div>
                                    </div>
                                    <div
                                        id={`hs-collapse-${note._id}`}
                                        aria-labelledby={`hs-heading-${note._id}`}
                                        className={`mb-2 px-2 py-1 hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeNoteId === note._id ? 'block' : 'hidden'}`}
                                    >
                                        <div className="mb-5">
                                            {
                                                note.categories.filter(category => category !== 'undefined' ).map((category, index) => (
                                                    <span key={index} className="text-sm pb-[2px] bg-green-300 text-[#0D111D] rounded-md px-2 mb-2 inline-block mr-2">
                                                        {category}
                                                    </span>
                                                ))
                                            }
                                        </div>
                                        <div>
                                            <h2 className="font-semibold text-lg">Description</h2>
                                            <p>{note.content}</p>
                                        </div>
                                        {note.pdfs && note.pdfs.length > 0 && (
                                            <div className="mt-4">
                                                <h3 className="text-lg font-semibold">PDFs:</h3>
                                                <ul>
                                                    {note.pdfs.map((pdfId) => (
                                                        <li key={pdfId}>
                                                            {/* {console.log(pdfId)} */}
                                                            {/* {console.log(pdfPaths[pdfId[0]])} */}
                                                            {pdfId ? (
                                                                <>
                                                                    <span className="px-3 py-1 bg-green-300 bg- rounded-md">
                                                                        <a
                                                                            href={`http://localhost:3000/api/pdf/${pdfId}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            {getOriginalFileName(pdfPaths[pdfId])}
                                                                        </a>
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span>PDF not available</span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {note.images.map((imageId) => (
                                            <div key={imageId}>
                                                {imagePaths[imageId] ? (
                                                    <div className='mt-4'>
                                                        <h1 className='mb-1 text-lg font-semibold'>Images:</h1>
                                                        <a
                                                            className='px-3 py-1 bg-green-300 rounded-md'
                                                            href={`http://localhost:3000/api/image/${imageId}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {getOriginalFileName(imagePaths[imageId])}
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <span>Loading...</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    </MainScreen>
                ) : (
                    <div className="text-center text-black font-semibold text-2xl mt-40">
                        Please signup/login to see your notes.
                        <div className="flex flex-wrap justify-between list-none sm:w-[50%] lg:w-[30%] md:w-[50%] mx-auto mt-10">
                            <NavLink className='py-1 lg:px-5 md:px-3 sm:px-2  bg-zinc-900  hover:bg-zinc-800  text-yellow-50 rounded-md text-base' to='/login'>Login</NavLink>
                            <NavLink className='py-1 lg:px-5 md:px-3 sm:px-2  border-2 border-zinc-800 hover:text-yellow-50 text-black hover:bg-opacity-100 hover:bg-black rounded-md text-base ' to='/signup'>Sign Up</NavLink>
                        </div>
                    </div>
                )
            )}
        </>
    );
}

export default Notes;
