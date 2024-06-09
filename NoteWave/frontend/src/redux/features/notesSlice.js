import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    notes: [],
    loading: false,
    error: null,
    searchQuery:'',
};

// Thunk to fetch notes
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.user.userToken || localStorage.getItem('token');
    if (!token) {
        return rejectWithValue('Token not found');
    }
    try {
        const response = await axios.get('/api/notes', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
});

// Thunk to create notes
export const createNotes = createAsyncThunk('notes/createNotes', async ({ title, content, category }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.user.userToken || localStorage.getItem('token');
    if (!token) {
        return rejectWithValue('Token not found');
    }
    try {
        const { data } = await axios.post('/api/notes/create', { title, content, category }, {
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

// Thunk to edit notes
export const editNotes = createAsyncThunk('notes/editNotes', async ({ id, title, content, category }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.user.userToken || localStorage.getItem('token');
    if (!token) {
        return rejectWithValue('Token not found');
    }
    try {
        const { data } = await axios.put(`/api/notes/${id}`, { title, content, category }, {
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

// Thunk to delete notes
export const deleteNote = createAsyncThunk('notes/deleteNote', async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.user.userToken || localStorage.getItem('token');
    if (!token) {
        return rejectWithValue('Token not found');
    }
    try {
        await axios.delete(`/api/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
});

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes(state, action) {
            state.notes = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setSearchQuery(state,action){
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(createNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes.push(action.payload); // Assuming we want to add the created note to the list
            })
            .addCase(createNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(editNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(editNotes.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.notes.findIndex(note => note._id === action.payload._id);
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })
            .addCase(editNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(note => note._id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export const { setNotes, setLoading, setError, setSearchQuery } = notesSlice.actions;
export default notesSlice.reducer;
