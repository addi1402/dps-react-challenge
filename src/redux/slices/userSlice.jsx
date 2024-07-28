import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        `Failed to fetch users: ${err.response?.data?.message || err.message}`
      );
    } else {
      throw new Error(`Failed to fetch users: ${err.message}`);
    }
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userData: [],
    searchResults: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload;
        state.searchResults = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
  reducers: {},
});

export default userSlice.reducer;
