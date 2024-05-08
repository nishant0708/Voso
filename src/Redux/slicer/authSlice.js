import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import toast from 'react-hot-toast';


// Define the asynchronous thunk for logIn via email and password

export const loginViaPassword = createAsyncThunk(
  'auth/loginViaPassword',
  async ({ email, password }) => {
    try {
      const response = await AxiosInstance.post(`user/loginViaPassword`,  
        { email, password }
       );
       if(response.data?.success) { return response.data;}
     
    } catch (error) {
       toast.error(error.response.data?.message);
       
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginViaPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginViaPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginViaPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
