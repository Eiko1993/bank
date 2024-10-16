// Reducteur pour l'édition du nom de l'utilisateur
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Thunk to get username
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().user.token;
    
        if (!token) {
          return rejectWithValue('No token found');
        }
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/user', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch user user');
            }
      
            const data = await response.json();
            return data;
          } catch (error) {
            return rejectWithValue('Something went wrong fetching the user.');
          }
        }
);

// Thunk to edit the user's username
export const editUsername = createAsyncThunk(
  'user/editUsername',
  async (newUsername, { getState, rejectWithValue }) => {
    const token = getState().user.token; // Get token from Redux state

    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/user', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername }), // Send the new username
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update username');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Something went wrong while updating the username.');
    }
  }
);
// Initial state for user
const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  // Profile slice
  const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
      builder
        
        .addCase(editUsername.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(editUsername.fulfilled, (state, action) => {
          state.loading = false;
          state.user = {
            ...state.user,
            username: action.payload.username, // Update the username
          };
        })
        .addCase(editUsername.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to update username';
        });
    },
  });
  
  export default profileSlice.reducer;