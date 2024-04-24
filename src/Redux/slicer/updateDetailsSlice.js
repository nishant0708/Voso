import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  user: {},
  userSEO: {},
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const updateUserDetails = createAsyncThunk('updateUserDetails', async (userId) => {
  try {
      const response = await AxiosInstance.put(`user/update/`, {
        params:{
          id:userId,
        }  
      });
      // console.log('USER DETAILS API Response:', response.data);
      return response.data.data;
  } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
  }
});

export const fetchUserSEODetails = createAsyncThunk('userSEO', async ({userId}) => {
  try {
      const response = await AxiosInstance.post(`website/getWebContent/`, {
        params:{
          id:userId,
        }  
      });
      // console.log('USER SEO DETAILS API Response:', response.data);
      return response.data.data;
  } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
  }
});

const updateDetailsSlice = createSlice({
  name: 'updateDetails',
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
      })
      .addCase(fetchUserSEODetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserSEODetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userSEO = action.payload;
      })
      .addCase(fetchUserSEODetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 
export default updateDetailsSlice.reducer;