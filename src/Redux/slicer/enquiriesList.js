import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  users: [],
  pageData:{},
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchEnquiriesList = createAsyncThunk('users', async ({userId, limit, page}) => {
  try {
      const response = await AxiosInstance.post(`enquiry/getList/`, {
        params:{
          id:userId,
          limit:limit,
          page:page,
        }  
      });
      // console.log('USER ENQUIRIES LIST API Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
  }
});

const enquiriesListSlice = createSlice({
  name: 'enquiriesList',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchEnquiriesList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnquiriesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.data;
        state.pageData = action.payload.meta;
      })
      .addCase(fetchEnquiriesList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 
export default enquiriesListSlice.reducer;