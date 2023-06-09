import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const experienceSlice = createSlice({
    name: 'experience',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchExperience.fulfilled, (state, action) => {
          return action.payload;
        });
    },
});

export default experienceSlice.reducer;

export const fetchExperience = createAsyncThunk(
    'experience/fetchExperience',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/experiences`);
      return response.data;
    }
);
