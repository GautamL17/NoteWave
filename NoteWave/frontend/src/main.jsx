import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter , createRoutesFromElements , Route  , RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Notes from './components/Notes.jsx'
import axios from 'axios'
import Profile from './components/Profile.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import NewNote from './components/NewNote.jsx'
import EditNotes from './components/EditNotes.jsx'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <Layout/> } >
      <Route path='' element={<Home/>}  />
      <Route path='/login' element={<Login/>}  />
      <Route path='/signup' element={<SignUp/>}  />
      <Route path='/notes' element={<Notes/>} />
      <Route path='/profile/:id' element={<Profile/>} />
      <Route path='/createnote' element={<NewNote/>} />
      <Route path='/editnote/:id' element={<EditNotes/>} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
