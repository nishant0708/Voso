import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept'; // Assuming AxiosInstance is located in a utils folder

// Async thunk to toggle product feature status
export const toggleProductFeature = createAsyncThunk(
  'toggleProductFeature',
  async ( {productId,userId,isActive}
  ) => {
    try {
        console.log("enter");
      const response = await AxiosInstance.post('product/assignFeaturedProduct', {
        productId:productId,
        is_featured: !isActive,
        userId:userId,
      });

      return response.data; // Assuming the response contains relevant data
    } catch (error) {
      throw error;
    }
  }
);

// Slice definition
const productFeatureSlice = createSlice({
  name: 'productFeature',
  initialState: {
    status: 'idle', // loading, succeeded, failed
    error: null,
  },
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleProductFeature.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleProductFeature.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(toggleProductFeature.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to toggle product feature status';
      });
  },
});

// Export actions and reducer
export const { } = productFeatureSlice.actions; // Add additional actions if needed
export default productFeatureSlice.reducer;