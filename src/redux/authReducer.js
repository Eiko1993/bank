// Reducteur pour la connexion utilisateur

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Thunk to handle user login
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userParams, {rejectWithValue}) => {
      if (!userParams.email || !userParams.password) {
        throw new Error('Email and password are required');
      }
  
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userParams),
        });
        if (!response.ok){
            const errorData = await response.json(); 
            return rejectWithValue(errorData.message || 'Login failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
      } catch (error) {
        return rejectWithValue('Something went wrong. Please try again later.');
      }
    }
  );

// Thunk to handle user logout
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  localStorage.removeItem('token'); 
  return {}; 
});

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null, 
  status: 'idle', 
  error: null,
};

const loginSlice = createSlice({
  name: 'user',
  initialState:{
    loading: false,
    user: null,
    error: null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state) =>{
        state.loading = true;
        state.user = null;
        state.error = null
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null
    })
    .addCase(loginUser.rejected,(state,action)=>{
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.error.message || 'Login failed'; // Handle error message
    })
    // Handle logout
    .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
    })
  },
});


export default loginSlice.reducer;