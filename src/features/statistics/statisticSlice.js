import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async (languageCode) => {
    const apiUrl = `https://innab.coder.az/api/${languageCode}/get_headerdatas`;
    const response = await axios.get(apiUrl);
    return response.data.data;
  }
);

const statisticSlice = createSlice({
  name: "statistics",
  initialState: {
    statistics: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default statisticSlice.reducer;
