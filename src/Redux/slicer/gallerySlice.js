import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  gallery: [],
  isLoading: false,
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for fetching Gallery Table
export const fetchgallery = createAsyncThunk('gallery', async ({ userId }) => {
  try {
    const response = await AxiosInstance.post(`gallery/getGallery`, {
      params: {
        id: userId,
      },
    });
   
    return response.data;
  } catch (error) {
   
    throw error;
  }
});

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchgallery.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchgallery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.gallery = action.payload.data; // Set fetched data to state.todos
        state.pageData = action.payload.meta;
      })
      .addCase(fetchgallery.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default gallerySlice.reducer;
