import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  products: [],
  isLoading: false,
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for fetching products List
export const fetchProducts = createAsyncThunk(
  'products',
  async ({ userId }) => {
    try {
      const response = await AxiosInstance.post(`product/getProduct/`, {
        params: {
          id: userId,
        },
      });
      // //console.log('USER PRODUCT API Response:', response.data);
      return response.data;
    } catch (error) {
      //console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

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
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.products = action.payload.data;
        state.pageData = action.payload.meta;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
