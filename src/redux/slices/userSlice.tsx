import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: {
    city: string;
    state: string;
  };
}

interface UserState {
  userData: User[];
  searchResults: User[];
  loading: boolean;
  error: string | null;
}

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        `Failed to fetch users: ${err.response?.data?.message || err.message}`
      );
    } else {
      return rejectWithValue(
        `Failed to fetch users: ${(err as Error).message}`
      );
    }
  }
});

const initialState: UserState = {
  userData: [],
  searchResults: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload;
        state.searchResults = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload ?? 'An error occurred';
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
