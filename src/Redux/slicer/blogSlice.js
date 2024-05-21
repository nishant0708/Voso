import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import toast from 'react-hot-toast';
const initialState = {
  blogs: [],
  services: [],
  service: {},
  blog: {},
  status: 'idle',
  isLoading: false,
  error: null,
};

// Define the asynchronous thunk for fetching blog details
export const fetchBlogs = createAsyncThunk('fetchBlogs', async ({ userId }) => {
  try {
    const response = await AxiosInstance.post(`blog/getBlog`, {
      params: {
        id: userId,
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
});
// Define the asynchronous thunk for fetching Services
export const fetchServices = createAsyncThunk(
  'fetchServices',
  async ({ userId }) => {
    try {
      const response = await AxiosInstance.post(`service/getService`, {
        params: {
          id: userId,
        },
      });

      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
);

// Define the asynchronous thunk for fetching service by ID
export const fetchServiceById = createAsyncThunk(
  'fetchServiceById',
  async ({ serviceId }) => {
    try {
      const response = await AxiosInstance.post(`service/getServiceById`, {
        params: {
          id: serviceId,
        },
      });

      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
);

// Define the asynchronous thunk for fetching blog by ID

export const fetchBlogById = createAsyncThunk(
  'fetchBlogById',
  async ({ blogId }) => {
    try {
      const response = await AxiosInstance.post(`blog/getBlogById`, {
        params: {
          id: blogId,
        },
      });

      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
);

// Define the asynchronous thunk for Updating Service BY id

export const updateServiceById = createAsyncThunk(
  'updateServiceById',
  async (data) => {
    try {
      const formData = new FormData();
      formData.append('service_name', data.serviceName);
      formData.append('id', data.serviceId);
      formData.append('service_price', data.servicePrice);
      formData.append('service_description', data.serviceDescription);
      formData.append('service_image', data.serviceImage);
      formData.append('service_url', data.serviceUrl);

      const response = await AxiosInstance.post(
        `service/updateService`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if(response?.data?.success)
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      throw error;
    }
  },
);

// Define the asynchronous thunk for updating Blog

export const updateBlogById = createAsyncThunk(
  'updateBlogById',
  async (data) => {
    try {
      const formData = new FormData();
      formData.append('bannerImage', data.bannerImg);
      formData.append('id', data.blogId);
      formData.append('title', data.title);
      formData.append('content', data.content);

      const response = await AxiosInstance.post(`blog/updateBlog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response?.data?.success){
        toast.success(response.data.message);
        return response.data.data;
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  },
);

// Async thunk to toggle Service Feature status
export const toggleServiceFeature = createAsyncThunk(
  'toggleServiceFeature',
  async ({ serviceId, userId, isActive }) => {
    try {
      const response = await AxiosInstance.post(
        'service/assignFeaturedService',
        {
          serviceId: serviceId,
          is_featured: !isActive,
          userId: userId,
        },
      );
      if (response?.data?.success) {
        toast.error(response?.data?.message);
        return response.data; // Assuming the response contains relevant data
      }
    } catch (error) {
      throw error;
    }
  },
);

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
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.service = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateServiceById.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(updateServiceById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.service = action.payload;
      })
      .addCase(updateServiceById.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateBlogById.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(updateBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.blog = action.payload;
      })
      .addCase(updateBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(toggleServiceFeature.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(toggleServiceFeature.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(toggleServiceFeature.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
