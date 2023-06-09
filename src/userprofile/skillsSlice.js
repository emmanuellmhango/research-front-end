import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const skillsSlice = createSlice({
    name: 'skills',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSkills.fulfilled, (state, action) => {
          return action.payload;
        });
    },
});

export default skillsSlice.reducer;

export const fetchSkills = createAsyncThunk(
    'skills/fetchSkills',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/skills`);
      return response.data;
    }
);
