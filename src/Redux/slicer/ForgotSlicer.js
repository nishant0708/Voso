import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  status: 'idle',
  error: null,
};

export const forgotPassword = createAsyncThunk(
  'forgot/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/user/forgetPassword', {
        email,
      });
      if (response.data.success) {
        toast.success(response.data.message); // Toast success message
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage); // Toast error message
      return rejectWithValue(errorMessage);
    }
  },
);

export const verifyOtpForPassword = createAsyncThunk(
  'forgot/verifyOtpForPassword',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post('/user/verifyOtpForPassword', {
        email,
        otp,
      });
      if (response.data.success) {
        toast.success(response.data.message); // Toast success message
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage); // Toast error message
      return rejectWithValue(errorMessage);
    }
  },
);

const forgotSlice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || 'An error occurred';
      })
      .addCase(verifyOtpForPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyOtpForPassword.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(verifyOtpForPassword.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default forgotSlice.reducer;
