import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './features/notesSlice'
import userReducer from './features/userSlice'
export const store = configureStore({
  reducer: {
    user:userReducer,
    notes:notesReducer
  },
})

export default store