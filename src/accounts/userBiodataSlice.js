import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const biodataSlice = createSlice({
    name: 'biodata',
    initialState: [],
    reducers: {
      logout: (state) => {
        return [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBiodata.fulfilled, (state, action) => {
          return action.payload;
        });
    },
});

export default biodataSlice.reducer;

export const fetchBiodata = createAsyncThunk(
    'biodata/fetchBiodata',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/biodata`);
      return response.data;
    }
);
