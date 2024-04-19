import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  users: [],
  pageData:{},
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchUsers = createAsyncThunk('users', async ({limit, page}) => {
  try {
      const response = await AxiosInstance.post(`user/getUsers/`, {
        params:{
          limit:limit,
          page:page,
        }  
      });
      // console.log('USER API Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
  }
});

const usersSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.data; // Set fetched data to state.todos
        state.pageData = action.payload.meta;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 
export default usersSlice.reducer;