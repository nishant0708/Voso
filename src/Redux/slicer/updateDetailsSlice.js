import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../url/url';

const initialState = {
  status: 'idle',
  isLoading: false,
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
      // //console.log('USER DETAILS UPDATE API Response:', response.data);
      toast.success('User Updated Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      //console.error('Error fetching in USER API:', error);
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
      // //console.log('USER PLAN UPDATE API Response:', response.data);
      toast.success('Plan Purchased Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      //console.error('Error fetching in USER API:', error);
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
      // //console.log('USER SEO UPDATE API Response:', response.data);
      toast.success('SEO Updated Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      //console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

export const updateUserBusiness = createAsyncThunk(
  'updateUserBusiness',
  async ({ formData, email, mobile, userId }) => {
    try {
      const {
        coverImage,
        description,
        businessName,
        profileImage,
        businessSegment,
        company,
        designation,
        businessGST,
        locationURL,
      } = formData;
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
      // //console.log('USER BUSINESS UPDATE API Response:', response.data);
      toast.success('Business Updated Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      //console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

export const updateUserSocial = createAsyncThunk(
  'updateUserSocial',
  async ({ formData, email, mobile, userId }) => {
    try {
      const items = Object.entries(formData)
        .filter(([key, value]) => value.length > 0)
        .map(([name, url]) => ({ name, url }));
      const response = await AxiosInstance.post(`website/updateSocialMedia`, {
        email: email,
        links: items,
        mobile: mobile,
        _id: userId,
      });
      // //console.log('USER SOCIAL UPDATE API Response:', response.data);
      toast.success('Social Updated Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      //console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

export const userChangePassword = createAsyncThunk(
  'userChangePassword',
  async ({ userId, oldPassword, newPassword }) => {
    try {
      const response = await AxiosInstance.post(`user/changePassword`, {
        id: userId,
        oldPassword: oldPassword,
        password: newPassword,
      });
      // //console.log('USER CHANGE PASSWORD API Response:', response.data);
      toast.success('Password Updated Successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      //console.error('Error fetching in USER API:', error);
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
        state.isLoading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserPlan.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(updateUserPlan.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
      })
      .addCase(updateUserPlan.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserSEO.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(updateUserSEO.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
      })
      .addCase(updateUserSEO.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserBusiness.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(updateUserBusiness.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
      })
      .addCase(updateUserBusiness.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserSocial.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(updateUserSocial.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
      })
      .addCase(updateUserSocial.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userChangePassword.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(userChangePassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
      })
      .addCase(userChangePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default updateDetailsSlice.reducer;
