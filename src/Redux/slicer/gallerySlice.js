import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  gallery: [],
 
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchgallery = createAsyncThunk('gallery', async ({userId}) => {
  try {
      const response = await AxiosInstance.post(`gallery/getGallery`, {
        params:{
          id:userId,
        }  
      });
      // console.log('USER GALLERY API Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching in USER API:', error);
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
      })
      .addCase(fetchgallery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gallery = action.payload.data; // Set fetched data to state.todos
        state.pageData = action.payload.meta;
      })
      .addCase(fetchgallery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 
export default gallerySlice.reducer;