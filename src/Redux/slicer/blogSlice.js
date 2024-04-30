import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';

const initialState = {
  blogs: [],
  services: [],
  service: {},
  blog: {},
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

export const fetchServices = createAsyncThunk(
  'fetchServices',
  async ({ userId }) => {
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
  },
);

export const fetchServiceById = createAsyncThunk(
  'fetchServiceById',
  async ({ serviceId }) => {
    try {
      const response = await AxiosInstance.post(`service/getServiceById`, {
        params: {
          id: serviceId,
        },
      });
      // console.log('USER SERVICE ID API Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

export const fetchBlogById = createAsyncThunk(
  'fetchBlogById',
  async ({ blogId }) => {
    try {
      const response = await AxiosInstance.post(`blog/getBlogById`, {
        params: {
          id: blogId,
        },
      });
      // console.log('USER BLOG ID API Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

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
      // console.log('USER SERVICE ID UPDATE API Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

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
      // console.log('USER BLOG ID UPDATE API Response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching in USER API:', error);
      throw error;
    }
  },
);

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
      return response.data; // Assuming the response contains relevant data
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
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.service = action.payload; // Set fetched data to state.todos
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blog = action.payload; // Set fetched data to state.todos
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateServiceById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateServiceById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.service = action.payload;
      })
      .addCase(updateServiceById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blog = action.payload;
      })
      .addCase(updateBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(toggleServiceFeature.pending, (state) => {
        state.status = 'loading';
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
