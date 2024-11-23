import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action for login
export const loginUser = createAsyncThunk('user/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/login', user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Initial state
const initialState = {
  name: '',
  email: '',
  status: 'idle',
  error: null
};

// Login slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add user to state
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default loginSlice.reducer;