import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
 

// Define the initial state
const initialState = {
  topUsers: [],
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchTopUsers = createAsyncThunk('topUsers', async (  limit, page  ) => {
  try {
      const response = await AxiosInstance.post(`user/topUsers/`, {
        params:{
          limit:limit,
          page:page,
        }  
      });
      console.log('API Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
  }
});


// Define the todos slice
const todosSlice = createSlice({
  name: 'topUsers',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchTopUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload; // Set fetched data to state.todos
      })
      .addCase(fetchTopUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 
export default todosSlice.reducer;