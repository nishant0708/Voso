// UpdateGallerySlicer.js
//for updatating Gallery 

import { createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

export const updateGallerySlice = createSlice({
  name: 'updateGallery',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    updateGalleryStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateGallerySuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    updateGalleryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { updateGalleryStart, updateGallerySuccess, updateGalleryFailure } = updateGallerySlice.actions;

//for updatating Gallery 
export const updateGalleryUrl = (data) => async (dispatch) => {
  dispatch(updateGalleryStart());
  try {
    // For all itemTypes, proceed with the provided URL in the data payload as FormData
    const formData = new FormData();
    formData.append('url', data.url);
    formData.append('itemType', data.itemType);
    formData.append('id', data.id);

    // Make the API call using the custom AxiosInstance
    const response = await AxiosInstance.post('/gallery/updateGallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    dispatch(updateGallerySuccess(response.data));
  } catch (error) {
    dispatch(updateGalleryFailure(error.message));
  }
};

export default updateGallerySlice.reducer;
