import { createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept'; // Import your custom AxiosInstance

// Define the initial state for the slice
const initialState = {
  isLoading: false,
  error: null,
};

// Create a Redux slice named productDetailsUpdatedSlice
const productDetailsUpdatedSlice = createSlice({
  name: 'productDetailsUpdated',
  initialState,
  reducers: {
    // Reducer to set loading state and clear error
    updateProductDetailsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Reducer to set loading state to false and clear error
    updateProductDetailsSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    // Reducer to set loading state to false and update error state
    updateProductDetailsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export action creators
export const {
  updateProductDetailsStart,
  updateProductDetailsSuccess,
  updateProductDetailsFailure,
} = productDetailsUpdatedSlice.actions;

// Thunk action creator to update product details
export const updateProductDetails = (data) => async (dispatch) => {
  dispatch(updateProductDetailsStart()); // Dispatch the start action

  try {
    // Create FormData object and append data
    const formData = new FormData();
    formData.append('product_name', data.productName);
    formData.append('id', data.productId);
    formData.append('product_price', data.productPrice);
    formData.append('product_description', data.productDescription);
    formData.append('product_image', data.productImage);
    formData.append('product_url', data.productUrl);

    // Make API call using AxiosInstance
    const response = await AxiosInstance.post(
      '/product/updateProduct',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // Dispatch success action with response data
    dispatch(updateProductDetailsSuccess(response.data));
  } catch (error) {
    // Dispatch failure action with error message
    dispatch(updateProductDetailsFailure(error.message));
  }
};

// Export the reducer
export default productDetailsUpdatedSlice.reducer;
