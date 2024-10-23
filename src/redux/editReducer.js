// Reducteur pour l'édition du nom de l'utilisateur
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Thunk to get username
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, {  rejectWithValue }) => {

        const token = localStorage.getItem('token')
    
        if (!token) {
          return rejectWithValue('No token found');
        }
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch user');
            }

            const data = await response.json();
            return data.body;
      

          } catch (error) {
            return rejectWithValue('Something went wrong fetching the user.');
          }
        }
);

// Thunk to edit the user's username
export const editUsername = createAsyncThunk(
  'user/editUsername',
  async (newUsername, { getState, rejectWithValue }) => {
    const token = localStorage.getItem('token') 

    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: newUsername }), // Send the new username
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update username');
      }

      const data = await response.json();
      return data.body;
    } catch (error) {
      return rejectWithValue('Something went wrong while updating the username.');
    }
  }
);

  
  // Profile slice
  const profileSlice = createSlice({
    name: 'profile',
    initialState: {
      user: {
        userName: '',  
        firstName: '',
        lastName: '',
        email: '',  
      },
        loading: false,
        error: null,
      },
    reducers: {
    
    },
    extraReducers: (builder) => {
      builder
        
      //Fetching user's profile
        .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
    })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load user profile';
      })


      //Editing username
        .addCase(editUsername.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(editUsername.fulfilled, (state, action) => {
          state.loading = false;
          state.user.userName = action.payload.userName;
        })
        .addCase(editUsername.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to update username';
        });
    },
  });
  
  export default profileSlice.reducer;