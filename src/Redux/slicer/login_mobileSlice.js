import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk for sending OTP
export const sendOTP = createAsyncThunk(
  'login_mobile/sendOTP',
  async (mobileNo) => {
    const response = await fetch("https://api.vosovyapar.com/api/a1/user/sendOtpMobile", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mobile: mobileNo })
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  }
);

// Define an async thunk for verifying OTP
export const verifyOTP = createAsyncThunk(
  'login_mobile/verifyOTP',
  async ({ mobileNo, otp }) => {
    const response = await fetch("https://api.vosovyapar.com/api/a1/user/verifyMobileOTP", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mobile: mobileNo, otp })
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  }
);

// Define the initial state
const initialState = {
  sendingOTP: false,
  verifyingOTP: false,
  error: null
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
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.sendingOTP = false;
        state.error = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.sendingOTP = false;
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.verifyingOTP = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.verifyingOTP = false;
        state.error = null;
        // Store access token and user data in localStorage
        const { accessToken, vosoVyaparUser } = action.payload;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userData', JSON.stringify(vosoVyaparUser));
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.verifyingOTP = false;
        state.error = action.error.message;
      });
  }
});

export default login_mobileSlice.reducer;
