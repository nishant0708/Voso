import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import toast from 'react-hot-toast';

// Async thunk action creator to update product details
export const updateProductDetails = createAsyncThunk(
  'productDetailsUpdated/updateProductDetails',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/product/updateProduct', data);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }

      return response.data; // Return response data on success
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      
      return rejectWithValue(error.message); // Return error message on failure
    }
  }
);

const productDetailsUpdatedSlice = createSlice({
  name: 'productDetailsUpdated',
  initialState: {
    isLoading: false,
    isError: false,
  },
  reducers: {
    // You can define other reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProductDetails.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productDetailsUpdatedSlice.reducer;
