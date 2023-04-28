import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProfile.fulfilled, (state, action) => {
          return action.payload;
        });
    },
});

export default profileSlice.reducer;

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/profiles`);
      return response.data;
    }
);
