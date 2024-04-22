import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  user: {},
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchUserDetails = createAsyncThunk('user', async ({userId}) => {
  try {
      const response = await AxiosInstance.post(`user/getDataById/`, {
        params:{
          id:userId,
        }  
      });
      console.log('USER DETAILS API Response:', response.data);
      return response.data.data;
  } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
  }
});

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Set fetched data to state.todos
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 
export default userDetailsSlice.reducer;