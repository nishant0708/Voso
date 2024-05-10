import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

// Define the initial state
const initialState = {
  topUsers: [],
  status: 'idle',
  isLoading: false,
  error: null,
};

// Define the asynchronous thunk for fetching top Users of Month
export const fetchTopUsers = createAsyncThunk(
  'topUsers',
  async ({ limit, page }) => {
    try {
      const response = await AxiosInstance.post(`user/topUsers/`, {
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

// Define the todos slice
const topUserSlice = createSlice({
  name: 'topUsers',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchTopUsers.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchTopUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.topUsers = action.payload;
      })
      .addCase(fetchTopUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default topUserSlice.reducer;
