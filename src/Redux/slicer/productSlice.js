import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  users: [],
  pageData:{},
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchProducts = createAsyncThunk('users', async ({userId}) => {
  try {
      const response = await AxiosInstance.post(`product/getProduct/`, {
        params:{
          id:userId,
        }  
      });
      console.log('USER API Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.data; // Set fetched data to state.todos
        state.pageData = action.payload.meta;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 
export default productSlice.reducer;