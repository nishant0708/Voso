import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  product: [],
 
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchproductedit = createAsyncThunk('product', async ({productId}) => {
  try {
      const response = await AxiosInstance.post(`/product/getProductById`, {
        params:{
          id:productId,
        }  
      });
      console.log('USER GALLERY API Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
  }
});

const productEditSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchproductedit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchproductedit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload.data; // Set fetched data to state.todos
        state.pageData = action.payload.meta;
      })
      .addCase(fetchproductedit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 
export default productEditSlice.reducer;