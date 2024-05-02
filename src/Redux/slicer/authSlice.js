import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginViaPassword = createAsyncThunk(
  'auth/loginViaPassword',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.vosovyapar.com/api/u1/user/loginViaPassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const responseData = await response.json();
        return rejectWithValue(responseData.message);
      } else {
        const data = await response.json();
        const accessToken = data.accessToken;
        localStorage.setItem('userData', JSON.stringify(data.vosoVyaparUser));
        localStorage.setItem('accessToken', accessToken);
        return data.vosoVyaparUser;
      }
    } catch (error) {
      //console.error("Error:", error);
      return rejectWithValue(
        'An error occurred while signing in. Please try again later.',
      );
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    isLoading: false,
    isLoggedIn: false,
  },
  reducers: {
    // Other reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginViaPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginViaPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginViaPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        window.alert(action.payload);
      });
  },
});

export default authSlice.reducer;
