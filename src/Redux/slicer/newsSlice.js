import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from '../../utils/intercept';
import toast from 'react-hot-toast';

//create news api

export const createNewsApi = createAsyncThunk(
  'createNewsApi',
  async (formData) => {
    try {
      const response = await AxiosInstance.post('news/createNews', formData);
      if (response.data?.success) {
        toast.success(response?.data.message);
        return response.data;
      }
    } catch (error) {
      toast.error(error?.response.data.message);
      throw error;
    }
  },
);
//fetching all news Data Api
export const getNewsApi = createAsyncThunk(
  'getNewsApi',
  async ({ page, limit }) => {
    try {
      const response = await AxiosInstance.get(
        `news/getAllNews?page=${page}&limit=${limit}`,
      );
      if (response.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      toast.error(error?.response.data.message);
      throw error;
    }
  },
);

//get a particular news

export const getNewsByIdApi = createAsyncThunk('getNewsByIdApi', async (id) => {
  try {
    const response = await AxiosInstance.get(`news/getnewsById/${id}`);
    if (response.data?.success) {
      return response.data.data;
    }
  } catch (error) {
    toast.error(error?.response.data.message);
    throw error;
  }
});

// to delete news
export const deleteNewsByIdApi = createAsyncThunk(
  'deleteNewsByIdApi',
  async (id) => {
    try {
      const response = await AxiosInstance.delete(`news/delete/${id}`);
      if (response.data?.success) {
        toast.success(response.data?.message);
        return { id };
      }
    } catch (error) {
      toast.error(error?.response.data.message);
      throw error;
    }
  },
);
//news update api

export const updateNewsApi = createAsyncThunk(
  'updateNewsApi',
  async ({ formData, id }) => {
    try {
      const response = await AxiosInstance.put(
        `news/updateNews/${id}`,
        formData,
      );
      if (response.data?.success) {
        toast.success(response?.data.message);
        return response.data;
      }
    } catch (error) {
      toast.error(error?.response.data.message);
      throw error;
    }
  },
);

const newSlice = createSlice({
  name: 'news',
  initialState: {
    isLoading: false,
    data: null,
    singleData: null,
    isError: false,
  },

  extraReducers: (builder) => {
    //create news data
    builder.addCase(createNewsApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createNewsApi.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createNewsApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    // get all data
    builder.addCase(getNewsApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getNewsApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getNewsApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // to get data by id
    builder.addCase(getNewsByIdApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getNewsByIdApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleData = action.payload;
    });
    builder.addCase(getNewsByIdApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    // to delete data
    builder.addCase(deleteNewsByIdApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(deleteNewsByIdApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.id) {
        state.data = state.data.filter(
          (item) => item._id !== action.payload.id,
        );
      }
    });

    builder.addCase(deleteNewsByIdApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    // to update data
    builder.addCase(updateNewsApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateNewsApi.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateNewsApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default newSlice.reducer;
