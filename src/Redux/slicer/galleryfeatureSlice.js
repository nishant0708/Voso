import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept'; // Assuming AxiosInstance is located in a utils folder

// Async thunk to toggle Gallery Feature status
export const togglegalleryFeature = createAsyncThunk(
  'togglegalleryFeature',
  async ({ productId, userId, isActive }) => {
    try {
      const response = await AxiosInstance.post(
        'gallery/assignFeaturedGallery',
        {
          id: productId,
          is_featured: !isActive,
          userId: userId,
        },
      );

      return response.data; // Assuming the response contains relevant data
    } catch (error) {
      throw error;
    }
  },
);

// Slice definition
const galleryFeatureSlice = createSlice({
  name: 'galleryFeature',
  initialState: {
    status: 'idle',
    isLoading: false,
    error: null,
  },
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(togglegalleryFeature.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(togglegalleryFeature.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
      })
      .addCase(togglegalleryFeature.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error =
          action.error.message || 'Failed to toggle product feature status';
      });
  },
});

// Export actions and reducer
export default galleryFeatureSlice.reducer;
