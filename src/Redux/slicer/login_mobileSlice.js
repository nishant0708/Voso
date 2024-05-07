import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

// Define an async thunk for sending OTP
export const sendOTP = createAsyncThunk(
  'login_mobile/sendOTP',
  async (mobileNo) => {
    try {
      const response = await AxiosInstance.post('user/sendOtpMobile', {
        mobile: mobileNo,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Define an async thunk for verifying OTP
export const verifyOTP = createAsyncThunk(
  'login_mobile/verifyOTP',
  async ({ mobileNo, otp }) => {
    try {
      const response = await AxiosInstance.post('user/verifyMobileOTP', {
        mobile: mobileNo,
        otp,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Define the initial state
const initialState = {
  isLoading: false,
  sendingOTP: false,
  verifyingOTP: false,
  error: null,
};

// Create the slice
const login_mobileSlice = createSlice({
  name: 'login_mobile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.sendingOTP = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.sendingOTP = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.sendingOTP = false;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.verifyingOTP = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.verifyingOTP = false;
        state.isLoading = false;
        state.error = null;
       
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.verifyingOTP = false;
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default login_mobileSlice.reducer;
