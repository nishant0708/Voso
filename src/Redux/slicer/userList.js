import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  users: [],
  pageData: {},
  status: 'idle',
  isLoading: false,
  error: null,
};

// Define the asynchronous thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ limit, page }) => {
    try {
      const response = await AxiosInstance.post(`user/getUsers/`, {
        params: {
          limit: limit,
          page: page,
        },
      });
      
      return response.data;
    } catch (error) {

      throw error;
    }
  },
);

//fetching data of userenquiry

export const fetchEnquiriesList = createAsyncThunk(
  'users/fetchEnquiriesList',
  async ({ userId, limit, page }) => {
    try {
      const response = await AxiosInstance.post(`enquiry/getList/`, {
        params: {
          id: userId,
          limit: limit,
          page: page,
        },
      });
  
      return response.data;
    } catch (error) {

      throw error;
    }
  },
);

const usersSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.users = action.payload.data;
        state.pageData = action.payload.meta;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEnquiriesList.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchEnquiriesList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.users = action.payload.data;
        state.pageData = action.payload.meta;
      })
      .addCase(fetchEnquiriesList.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
