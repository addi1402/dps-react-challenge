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

    // cityFilter: (state, action: PayloadAction<string>) => {
    //   if (action.payload === '' || action.payload === 'All Cities') {
    //     state.searchResults = state.userData;
    //   } else {
    //     state.searchResults = state.userData.filter(
    //       (user) => user.address.city === action.payload
    //     );
    //   }
    // },
    // nameFilter: (state, action: PayloadAction<string>) => {
    //   if (action.payload === '') {
    //     // Reapply the current city filter instead of resetting to all data
    //     const currentCity =
    //       state.searchResults.length > 0
    //         ? state.searchResults[0].address.city
    //         : '';

    //     if (currentCity && currentCity !== 'All Cities') {
    //       state.searchResults = state.userData.filter(
    //         (user) => user.address.city === currentCity
    //       );
    //     } else {
    //       state.searchResults = state.userData;
    //     }
    //   } else {
    //     const searchTerm = action.payload.toLowerCase();
    //     state.searchResults = state.searchResults.filter(
    //       (user) =>
    //         user.firstName.toLowerCase().includes(searchTerm) ||
    //         user.lastName.toLowerCase().includes(searchTerm)
    //     );
    //   }
    // },
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
export const { cityFilter, nameFilter } = userSlice.actions;
