import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  blogs: [],
  services: [],
  status: 'idle', // Possible statuses: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define the asynchronous thunk for fetching todos
export const fetchBlogs = createAsyncThunk('fetchBlogs', async ({ userId }) => {
  try {
    const response = await AxiosInstance.post(`blog/getBlog`, {
      params: {
        id: userId,
      },
    });
    // console.log('USER BLOG API Response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching in USER API:', error);
    throw error;
  }
});

export const fetchServices = createAsyncThunk('fetchServices', async ({ userId }) => {
    try {
      const response = await AxiosInstance.post(`service/getService`, {
        params: {
          id: userId,
        },
      });
      // console.log('USER SERVICE API Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  });

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // Additional reducers can go here for synchronous actions
  },
  extraReducers: (builder) => {
    // Add reducers for handling async actions' lifecycle
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload; // Set fetched data to state.todos
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload; // Set fetched data to state.todos
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
