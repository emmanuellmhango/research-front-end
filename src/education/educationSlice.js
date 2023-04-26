import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const educationSlice = createSlice({
    name: 'education',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchEducation.fulfilled, (state, action) => {
          return action.payload;
        });
    },
});

export default educationSlice.reducer;

export const fetchEducation = createAsyncThunk(
    'education/fetchEducation',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/educations`);
      return response.data;
    }
);
