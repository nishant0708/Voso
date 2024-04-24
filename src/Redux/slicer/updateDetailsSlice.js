import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import toast from 'react-hot-toast';

const initialState = {
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const updateUserDetails = createAsyncThunk(
  'updateUserDetails',
  async ({ formData, userId }) => {
    try {
      const response = await AxiosInstance.put(`user/update/`, {
        params: {
          dob: formData.dateOfBirth,
          email: formData.email,
          first_name: formData.firstName,
          gender: formData.gender,
          is_approved: formData.isApproved === 'true' ? true : false,
          is_email_verified: formData.isEmail === 'true' ? true : false,
          is_inactive: formData.isUnactive === 'true' ? true : false,
          is_mobile_verified: formData.isMobile === 'true' ? true : false,
          last_name: formData.lastName,
          mobile: formData.mobile,
          _id: userId,
        },
      });
      console.log('USER DETAILS UPDATE API Response:', response.data);
      toast.success('User Updated Successfully');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

export const updateUserPlan = createAsyncThunk(
  'updateUserPlan',
  async ({ email, plan }) => {
    try {
      const response = await AxiosInstance.post(`user/planSubscribeByAdmin`, {
        amount: 0,
        email: email,
        planId: plan === 'Yearly' ? 12 : plan === 'Half-Yearly' ? 6 : 3,
      });
      console.log('USER PLAN UPDATE API Response:', response.data);
      toast.success('Plan Purchase Successfully');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

export const updateUserSEO = createAsyncThunk(
  'updateUserSEO',
  async ({ formData, email, mobile, userId }) => {
    try {
      const response = await AxiosInstance.post(`website/updateSEO`, {
        email: email,
        googleAnalytics: formData.googleAnalytics,
        homeTitle: formData.homeTitle,
        metaDescription: formData.description,
        metaKeyword: formData.metaKeyword,
        mobile: mobile,
        siteTitle: formData.siteTitle,
        _id: userId,
      });
      console.log('USER SEO UPDATE API Response:', response.data);
      toast.success('SEO Update Successfully');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

const updateDetailsSlice = createSlice({
  name: 'updateDetails',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserDetails.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserPlan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserPlan.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserPlan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserSEO.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserSEO.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserSEO.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default updateDetailsSlice.reducer;
