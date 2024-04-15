import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import { data } from 'autoprefixer';

// Define the initial state
const initialState = {
  todos: [],
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ({ limit, page, sort }) => {
    try {
        console.log('Fetching todos with params:', { limit, page, sort }); // Log request parameters
        const response = await AxiosInstance.post(`user/topUsers/`, {
            limit,
            page,
            sort
        });
        
        console.log('API Response:', response.data); // Log API response data
        
        return response.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching todos:', error); // Log any errors that occur
        throw error;
    }
});

// Define the todos slice
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload; // Set fetched data to state.todos
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export action creators
// export const { } = todosSlice.actions;

// Export reducer
export default todosSlice.reducer;