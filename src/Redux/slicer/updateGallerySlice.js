// UpdateGallerySlicer.js
//for updatating Gallery 

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import toast from 'react-hot-toast';

// Define the asynchronous thunk for MOnthly Users
export const updateGalleryUrl = createAsyncThunk('updateGalleryUrl', async (formData) => {
  try {
    const response = await AxiosInstance.post('/gallery/updateGallery', formData);
    if(response?.data?.success){
      toast.success(response?.data?.message);
      return response.data
    }
  } catch (error) {
    toast.error(error.response?.data?.message);
    throw error;
  }
});
 

export const updateGallerySlice = createSlice({
  name: 'updateGallery',
  initialState: {
    isLoading: false,
    isError: null,
    data:null

  },
  extraReducers: (builder) => {
    //create news data
    builder.addCase(updateGalleryUrl.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateGalleryUrl.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateGalleryUrl.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export default updateGallerySlice.reducer;
