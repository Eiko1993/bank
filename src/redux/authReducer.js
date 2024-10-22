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

        const responseData = await response.json();

        if (!response.ok) {
          return rejectWithValue(responseData.message || 'Login failed');
        }
        const token = responseData.body.token;

        if (token){
          localStorage.setItem('token', token);
        }
        return {
          email: responseData.body.email,
          token: token,
        };
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


const loginSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    token: '',
    isConnected: false, 
    error: null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
    // Handle login
    .addCase(loginUser.pending, (state) => {
      state.isConnected = false;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isConnected = true;
      state.error = null;
    })
    .addCase(loginUser.rejected,(state,action)=>{
        state.isConnected = false;
        state.error = action.payload || 'Login failed'; // Handle error message
    })
  },
});


export default loginSlice.reducer;