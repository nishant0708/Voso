import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

// Define the initial state
const initialState = {
  Month: [],
  isLoading: false,
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchMonth = createAsyncThunk('Month', async (e) => {
  try {
    const response = await AxiosInstance.post(`user/eachMonthUsersCount`, e);
    // //console.log('MONTHLY API Response:', response.data.data);
    return response.data.data;
  } catch (error) {
    //console.error('Error fetching todos:', error);
    throw error;
  }
});

// Define the todos slice
const MonthSlice = createSlice({
  name: 'Month',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchMonth.pending, (state) => {
        state.status = 'loading';
        state.isLoading = false;
      })
      .addCase(fetchMonth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.Month = action.payload;
      })
      .addCase(fetchMonth.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default MonthSlice.reducer;
