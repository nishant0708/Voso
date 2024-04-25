import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../url/url';

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
      });
      // console.log('USER DETAILS UPDATE API Response:', response.data);
      toast.success('User Updated Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
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
      // console.log('USER PLAN UPDATE API Response:', response.data);
      toast.success('Plan Purchase Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
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
      // console.log('USER SEO UPDATE API Response:', response.data);
      toast.success('SEO Update Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

export const updateUserBusiness = createAsyncThunk(
  'updateUserBusiness',
  async ({ formData, email, mobile, userId }) => {
    try {
      const {coverImage, description, businessName, profileImage, businessSegment, company, designation, businessGST, locationURL} = formData;
      const response = await AxiosInstance.post(`website/business_details`, {
        address: {
          address_1: formData.address1,
          address_2: formData.address2,
          city: formData.city,
          pin: formData.pincode,
          state: formData.state,
        },
        business_cover_image: coverImage,
        business_description: description,
        business_name: businessName,
        business_profile_image: profileImage,
        business_segment: businessSegment,
        company: company,
        designation: designation,
        email: email,
        gst_number: businessGST,
        location_url: locationURL,
        mobile: mobile,
        _id: userId,
      });
      // console.log('USER BUSINESS UPDATE API Response:', response.data);
      toast.success('Business Update Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

export const updateUserSocial = createAsyncThunk(
  'updateUserSocial',
  async ({ formData, email, mobile, userId }) => {
    try {
      const items = Object.entries(formData).filter(([key, value]) => value.length > 0).map(([name, url]) => ({ name, url }));
      const response = await AxiosInstance.post(`website/updateSocialMedia`, {
        email: email,
        links: items,
        mobile: mobile,
        _id: userId,
      });
      // console.log('USER SOCIAL UPDATE API Response:', response.data);
      toast.success('Social Update Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
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
      })
      .addCase(updateUserBusiness.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserBusiness.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserBusiness.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserSocial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserSocial.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserSocial.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default updateDetailsSlice.reducer;
