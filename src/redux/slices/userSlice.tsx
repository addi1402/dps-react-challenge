import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import User, { UserState } from '@/types/User';

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

const calculateOldest = (users: User[]) => {
  const oldestPerCity: Record<string, Date> = {};
  users.forEach((user) => {
    const city = user.address.city;
    const birthDate = new Date(user.birthDate);
    if (!oldestPerCity[city] || birthDate < oldestPerCity[city]) {
      oldestPerCity[city] = birthDate;
    }
  });
  return users.map((user) => ({
    ...user,
    isOldest:
      new Date(user.birthDate).getTime() ===
      oldestPerCity[user.address.city].getTime(),
  }));
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
      if (!err.response) {
        return rejectWithValue(
          'No internet connection. Please check your network and try again.'
        );
      } else {
        return rejectWithValue(
          `Failed to fetch users: ${err.response?.data?.message || err.message}`
        );
      }
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
      const filteredUsers = state.userData.filter((user) => {
        const cityMatch =
          !state.currentFilters.city ||
          state.currentFilters.city === 'All Cities' ||
          user.address.city === state.currentFilters.city;

        const nameMatch =
          !state.currentFilters.name ||
          user.firstName
            .toLowerCase()
            .includes(state.currentFilters.name.toLowerCase()) ||
          user.lastName
            .toLowerCase()
            .includes(state.currentFilters.name.toLowerCase());

        return cityMatch && nameMatch;
      });

      // state.searchResults = state.highlight
      //   ? calculateOldest(filteredUsers)
      //   : filteredUsers;
      if (state.highlight) {
        const oldestUsers = calculateOldest(state.userData);
        state.searchResults = filteredUsers.map((user) => ({
          ...user,
          isOldest:
            oldestUsers.find((u) => u.id === user.id)?.isOldest || false,
        }));
      } else {
        state.searchResults = filteredUsers;
      }
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
      if (state.highlight) {
        const oldestUsers = calculateOldest(state.userData);
        state.searchResults = state.searchResults.map((user) => ({
          ...user,
          isOldest:
            oldestUsers.find((u) => u.id === user.id)?.isOldest || false,
        }));
      } else {
        state.searchResults = state.searchResults.map((user) => ({
          ...user,
          isOldest: false,
        }));
      }
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
        state.searchResults = state.highlight
          ? calculateOldest(action.payload)
          : action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload ?? 'An error occurred';
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export const { cityFilter, nameFilter, toggleHighlight } = userSlice.actions;
