import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  userData: User[];
  searchResults: User[];
  loading: boolean;
  error: string | null;
  currentFilters: {
    city: string;
    name: string;
  };
  highlight: boolean;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  image: string;
  address: {
    city: string;
    state: string;
  };
  age: number;
  isOldest?: boolean;
}

const initialState: UserState = {
  userData: [],
  searchResults: [],
  loading: false,
  error: null,
  currentFilters: {
    city: '',
    name: '',
  },
  highlight: false,
};

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://dummyjson.com/users?limit=0');
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

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    applyFilters: (state) => {
      state.searchResults = state.userData.filter((user) => {
        const cityMatch =
          state.currentFilters.city === '' ||
          state.currentFilters.city === 'All Cities' ||
          user.address.city === state.currentFilters.city;

        const nameMatch =
          state.currentFilters.name === '' ||
          user.firstName
            .toLowerCase()
            .includes(state.currentFilters.name.toLowerCase()) ||
          user.lastName
            .toLowerCase()
            .includes(state.currentFilters.name.toLowerCase());

        return cityMatch && nameMatch;
      });
    },
    cityFilter: (state, action: PayloadAction<string>) => {
      state.currentFilters.city = action.payload;
      userSlice.caseReducers.applyFilters(state);
    },
    nameFilter: (state, action: PayloadAction<string>) => {
      state.currentFilters.name = action.payload;
      userSlice.caseReducers.applyFilters(state);
    },
    toggleHighlight: (state) => {
      state.highlight = !state.highlight;
    },
    calculateOldestPerCity: (state) => {
      const oldestPerCity: Record<string, number> = {};
      state.searchResults.forEach((user) => {
        const city = user.address.city;
        if (!oldestPerCity[city] || user.age > oldestPerCity[city]) {
          oldestPerCity[city] = user.age;
        }
      });
      state.searchResults = state.searchResults.map((user) => ({
        ...user,
        isOldest: user.age === oldestPerCity[user.address.city],
      }));
    },
  },
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
export const {
  cityFilter,
  nameFilter,
  toggleHighlight,
  calculateOldestPerCity,
} = userSlice.actions;
