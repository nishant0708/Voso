import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  gallery: [],
  isLoading: false,
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchgalleryedit = createAsyncThunk(
  'gallery',
  async ({ productId }) => {
    try {
      const response = await AxiosInstance.post(`gallery/getDataById`, {
        params: {
          id: productId,
        },
      });
      //console.log('USER GALLERY API Response:', response.data);
      return response.data;
    } catch (error) {
      //console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

const galleryeditSlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchgalleryedit.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchgalleryedit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.gallery = action.payload.data;
        state.pageData = action.payload.meta;
      })
      .addCase(fetchgalleryedit.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default galleryeditSlice.reducer;
