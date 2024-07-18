import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for login
export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the entire response data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for signup
export const signup = createAsyncThunk('user/signup', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/signup', { name, email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the entire response data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to edit profile
export const editProfile = createAsyncThunk('user/editProfile', async ({ id, name, email }, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.user.userToken || localStorage.getItem('token');
  if (!token) {
    return rejectWithValue('Token not found');
  }
  try {
    const { data } = await axios.post(`/api/users/${id}`, { name, email }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data || error.message);
  }
});

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    userToken: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    searchQuery: '',
  },
  reducers: {
    logout(state) {
      state.userInfo = null;
      state.userToken = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
    setUser(state, action) {
      state.userInfo = action.payload;
      state.userToken = action.payload.token;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Update the userInfo with the new profile data
        localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Update localStorage
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, setUser, setSearchQuery } = userSlice.actions;
export default userSlice.reducer;
