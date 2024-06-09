import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchNotes, deleteNote } from '../redux/features/notesSlice';
import { setUser } from '../redux/features/userSlice'; 
import MainScreen from './MainScreen';
import 'boxicons';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.notes.loading);
  const searchQuery = useSelector((state)=> state.notes.searchQuery)
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [showLoadingMessage,setShowLoadingMessage] = useState(true)
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteNote(id))
    }
  };

  const toggleAccordion = (noteId) => {
    setActiveNoteId(noteId === activeNoteId ? null : noteId);
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const user = JSON.parse(storedUserInfo);
      dispatch(setUser(user));
    }
    dispatch(fetchNotes()); // Dispatch fetchNotes to fetch notes
  }, [dispatch]);

  if (!userInfo) console.log('userinfo is not present');
  
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setShowLoadingMessage(false)
    },500)
  return () => clearTimeout(timeout)
  },[])


  const filteredNotes = notes.filter(note=>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.category.toLowerCase().includes(searchQuery.toLowerCase()) 
  )

  return (
    <>
      {(showLoadingMessage)  ? (
            <div className='text-5xl text-white font-bold flex justify-center items-center mt-[15%]' >
              
<div role="status">
    <svg aria-hidden="true" className="w-10 h-10 text-blue-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

            </div>
      ) : userInfo ? (
        <MainScreen title={`Welcome back ${userInfo.name}`}>
          <>
            <button className="mb-6">
              <NavLink to="/createnote" className=" border rounded-md hover:bg-white bg-zinc-100 font-semibold text-zinc-950 p-2 w-[90px] hover:shadow-[0_20px_50px_#7e26d193]">
                Create a note
              </NavLink>
            </button>
            {filteredNotes.map((note) => (
              <div key={note._id} className='rounded-md my-4 g-white border border-opacity-50 border-[#C6C5FF]'>
                <div
                  className={`flex justify-between items-center border border-[#C6C5FF] border-opacity-50 rounded-md px-3 py-4 text-zinc-100 cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-20 `}
                  onClick={() => toggleAccordion(note._id)}
                >
                  <button className="font-medium text-xl hs-accordion-toggle">{note.title}</button>
                  <div className="list-none flex gap-5">
                    <li>
                      <button
                        className="bg-[#F7A2A2] hover:bg-red-300 rounde text-zinc-950 px-2 py-1 flex justify-center rounded-md items-center w-[90px]"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                        {/* <box-icon name="trash-alt" ></box-icon>  */}
                      </button>
                    </li>
                    <li>
                      <button href={`/notes/${note._id}`} className="bg-[#C6C5FF] hover:bg-sky-400 rounded-md text-zinc-950 px-2 py-1 w-[90px]">
                        <Link to={`/editnote/${note._id}`} className="flex justify-center items-center ">
                          Edit
                          {/* <box-icon name="edit-alt" ></box-icon> */}
                        </Link>
                      </button>
                    </li>
                  </div>
                </div>
                <div
                  id={`hs-collapse-${note._id}`}
                  aria-labelledby={`hs-heading-${note._id}`}
                  className={`mb-2 px-2 py-1 hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                    activeNoteId === note._id ? 'block' : 'hidden'
                  }`}
                >
                  <div className="mt-1 mb-5">
                    <span className="text-sm pb-[2px] bg-green-300 text-[#0D111D] round px-2 mb-20">{note.category}</span>
                  </div>
                  {note.content}
                </div>
              </div>
            ))}
          </>
        </MainScreen>
      ) : (
        <div className="bg-green-400 px-4 mt-4">Notes not available, please login or signup</div>
      )}
    </>
  );
};

export default Notes;
