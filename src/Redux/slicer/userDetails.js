import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  user: {},
  userSEO: {},
  status: 'idle',
  isLoading: false,
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchUserDetails = createAsyncThunk('user', async ({ userId }) => {
  try {
    const response = await AxiosInstance.post(`user/getDataById/`, {
      params: {
        id: userId,
      },
    });
    // //console.log('USER DETAILS API Response:', response.data);
    return response.data.data;
  } catch (error) {
    //console.error('Error fetching in USER API:', error);
    throw error;
  }
});

export const fetchUserSEODetails = createAsyncThunk(
  'userSEO',
  async ({ userId }) => {
    try {
      const response = await AxiosInstance.post(`website/getWebContent/`, {
        params: {
          id: userId,
        },
      });
      // //console.log('USER SEO DETAILS API Response:', response.data);
      return response.data.data;
    } catch (error) {
      //console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserSEODetails.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchUserSEODetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.userSEO = action.payload;
      })
      .addCase(fetchUserSEODetails.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userDetailsSlice.reducer;
